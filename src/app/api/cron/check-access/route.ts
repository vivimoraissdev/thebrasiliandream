import { getAdminNumbers } from '@/config/admin.config';
import { requireEnv } from '@/config/env';
import {
  fetchEvictionCandidates,
  fetchRemovedEmailCandidates,
  fetchValidAccessCustomers,
  fetchWarningCandidates,
  markCustomersRemoved,
  markFinalEmailSent,
  markWarningSent,
} from '@/data/customers';
import { startOfUtcDay, utcDayWindow } from '@/domain/date';
import { getPhoneComparisonKey, getPhoneVariants, normalizePhone } from '@/domain/phone';
import { checkBotHealth, removePhones } from '@/lib/bot/client';
import { sendAuditFailureAlert, sendBotDownAlert, sendFinalEmail, sendWarningEmail } from '@/lib/email/client';
import { runGroupAudit } from '@/lib/group-audit';
import type { CustomerRecord } from '@/types/customer';
import { settleInBatches } from '@/utils/concurrency';
import { hasValidBearerToken } from '@/utils/security';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 300;

interface FailureSummary {
  phone?: string;
  customerId?: string;
  reason: string;
}

function buildVariantSet(phones: string[]): Set<string> {
  const variants = new Set<string>();
  for (const phone of phones) {
    getPhoneVariants(phone).forEach((variant) => variants.add(variant));
  }
  return variants;
}

async function sendWarnings(customers: CustomerRecord[]): Promise<{
  sent: number;
  failed: number;
}> {
  const results = await settleInBatches(customers, 10, async (customer) => {
    await sendWarningEmail(customer);
    await markWarningSent(customer.id);
  });

  return {
    sent: results.filter((result) => result.status === 'fulfilled').length,
    failed: results.filter((result) => result.status === 'rejected').length,
  };
}

async function sendPendingFinalEmails(): Promise<{ sent: number; failed: number }> {
  const customers = await fetchRemovedEmailCandidates();
  const results = await settleInBatches(customers, 10, async (customer) => {
    await sendFinalEmail(customer);
    await markFinalEmailSent(customer.id);
  });

  return {
    sent: results.filter((result) => result.status === 'fulfilled').length,
    failed: results.filter((result) => result.status === 'rejected').length,
  };
}

export async function GET(request: Request): Promise<Response> {
  try {
    if (!hasValidBearerToken(request, requireEnv('CRON_SECRET'))) {
      return Response.json({ error: 'unauthorized' }, { status: 401 });
    }

    const now = new Date();
    let heartbeatPassed = false;
    try {
      heartbeatPassed = await checkBotHealth();
    } catch {
      heartbeatPassed = false;
    }

    if (!heartbeatPassed) {
      let alertSent = false;
      try {
        await sendBotDownAlert(now);
        alertSent = true;
      } catch (error) {
        console.error('bot_down_alert_failed', {
          error: error instanceof Error ? error.name : 'UnknownError',
        });
      }

      return Response.json({
        status: 'aborted_bot_unavailable',
        heartbeatPassed: false,
        alertSent,
        warningsSent: 0,
        evictionsSucceeded: 0,
        evictionsFailed: [],
        finalEmailsSent: 0,
      }, { status: 503 });
    }

    const warningWindow = utcDayWindow(7, now);
    const warningCandidates = await fetchWarningCandidates(warningWindow.start, warningWindow.end);
    const warningSummary = await sendWarnings(warningCandidates);

    const evictionCandidates = await fetchEvictionCandidates(startOfUtcDay(now));
    const validAccessCustomers = await fetchValidAccessCustomers(now);
    const validVariants = buildVariantSet(validAccessCustomers.map((customer) => customer.phone));
    const adminVariants = buildVariantSet(getAdminNumbers());
    const candidatesByPhone = new Map<string, { phone: string; customers: CustomerRecord[] }>();
    const evictionFailures: FailureSummary[] = [];

    for (const customer of evictionCandidates) {
      let phone: string;
      try {
        phone = normalizePhone(customer.phone);
      } catch {
        evictionFailures.push({ customerId: customer.id, reason: 'invalid_phone' });
        continue;
      }

      const variants = getPhoneVariants(phone);
      if (variants.some((variant) => adminVariants.has(variant))) {
        evictionFailures.push({ phone, reason: 'protected_admin_number' });
        continue;
      }
      if (variants.some((variant) => validVariants.has(variant))) {
        evictionFailures.push({ phone, reason: 'other_valid_access_exists' });
        continue;
      }

      const key = getPhoneComparisonKey(phone);
      const existing = candidatesByPhone.get(key);
      if (existing) {
        existing.customers.push(customer);
      } else {
        candidatesByPhone.set(key, { phone, customers: [customer] });
      }
    }

    let evictionsSucceeded = 0;
    if (candidatesByPhone.size > 0) {
      try {
        const removalResponse = await removePhones(
          [...candidatesByPhone.values()].map((candidate) => candidate.phone),
        );
        const resultsByPhone = new Map(
          removalResponse.results.map((result) => [getPhoneComparisonKey(result.phone), result]),
        );

        for (const [key, candidate] of candidatesByPhone) {
          const result = resultsByPhone.get(key);
          if (!result?.success) {
            evictionFailures.push({
              phone: candidate.phone,
              reason: result?.error ?? 'missing_bot_result',
            });
            continue;
          }

          try {
            await markCustomersRemoved(candidate.customers.map((customer) => customer.id));
            evictionsSucceeded += candidate.customers.length;
          } catch {
            evictionFailures.push({ phone: candidate.phone, reason: 'database_status_update_failed' });
          }
        }
      } catch (error) {
        for (const candidate of candidatesByPhone.values()) {
          evictionFailures.push({
            phone: candidate.phone,
            reason: error instanceof Error ? error.name : 'bot_batch_failed',
          });
        }
      }
    }

    const finalEmailSummary = await sendPendingFinalEmails();

    let unauthorizedAudit: Awaited<ReturnType<typeof runGroupAudit>> | { skippedReason: string } = {
      skippedReason: 'not_run',
    };
    try {
      unauthorizedAudit = await runGroupAudit({
        executeRemoval: true,
        validAccessPhones: validAccessCustomers.map((customer) => customer.phone),
        adminPhones: getAdminNumbers(),
      });
    } catch (error) {
      console.error('unauthorized_participant_audit_failed', {
        error: error instanceof Error ? error.name : 'UnknownError',
      });
      unauthorizedAudit = { skippedReason: 'audit_threw_unexpectedly' };
    }

    const auditSkippedReason = unauthorizedAudit.skippedReason;
    if (auditSkippedReason && auditSkippedReason !== 'not_run') {
      try {
        await sendAuditFailureAlert(auditSkippedReason, now);
      } catch (error) {
        console.error('audit_failure_alert_failed', {
          error: error instanceof Error ? error.name : 'UnknownError',
        });
      }
    }

    return Response.json({
      status: 'completed',
      heartbeatPassed: true,
      warningsSent: warningSummary.sent,
      warningsFailed: warningSummary.failed,
      evictionsSucceeded,
      evictionsFailed: evictionFailures,
      finalEmailsSent: finalEmailSummary.sent,
      finalEmailsFailed: finalEmailSummary.failed,
      unauthorizedAudit,
    });
  } catch (error) {
    console.error('check_access_cron_failed', {
      error: error instanceof Error ? error.name : 'UnknownError',
    });
    try {
      await sendAuditFailureAlert(
        `cron_failed_${error instanceof Error ? error.name : 'UnknownError'}`,
      );
    } catch (alertError) {
      console.error('audit_failure_alert_failed', {
        error: alertError instanceof Error ? alertError.name : 'UnknownError',
      });
    }
    return Response.json({ error: 'internal error' }, { status: 500 });
  }
}
