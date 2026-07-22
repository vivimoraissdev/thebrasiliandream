import { getAdminNumbers } from '@/config/admin.config';
import { getAuditMaxRemovals, requireEnv } from '@/config/env';
import { fetchValidAccessCustomers } from '@/data/customers';
import { classifyParticipants } from '@/domain/audit';
import { fetchParticipants, removePhones } from '@/lib/bot/client';
import { hasValidBearerToken } from '@/utils/security';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 300;

async function runAudit(request: Request, executeRemoval: boolean): Promise<Response> {
  try {
    if (!hasValidBearerToken(request, requireEnv('ADMIN_AUDIT_SECRET'))) {
      return Response.json({ error: 'unauthorized' }, { status: 401 });
    }

    let participants;
    try {
      participants = await fetchParticipants();
    } catch {
      return Response.json({ error: 'unable to read bot participants' }, { status: 502 });
    }

    if (participants.allPhones.length === 0 && participants.errors.length > 0) {
      return Response.json({
        error: 'all configured groups failed to return participants',
        groupErrors: participants.errors,
      }, { status: 502 });
    }

    const validCustomers = await fetchValidAccessCustomers(new Date());
    const classification = classifyParticipants(
      participants.allPhones,
      validCustomers.map((customer) => customer.phone),
      getAdminNumbers(),
    );

    const baseSummary = {
      mode: executeRemoval ? 'execute' : 'dry_run',
      totalParticipantsChecked: participants.allPhones.length,
      unauthorizedFound: classification.unauthorized.length,
      unauthorizedPhones: classification.unauthorized,
      adminExemptedCount: classification.adminExempted.length,
      groupErrors: participants.errors,
    };

    if (!executeRemoval || classification.unauthorized.length === 0) {
      return Response.json({ ...baseSummary, kickResults: [] });
    }

    if (validCustomers.length === 0 && participants.allPhones.length > classification.adminExempted.length) {
      return Response.json({
        ...baseSummary,
        error: 'safety stop: valid access set is empty',
        kickResults: [],
      }, { status: 409 });
    }

    const maxRemovals = getAuditMaxRemovals();
    if (classification.unauthorized.length > maxRemovals) {
      return Response.json({
        ...baseSummary,
        error: `safety stop: unauthorized count exceeds AUDIT_MAX_REMOVALS (${maxRemovals})`,
        kickResults: [],
      }, { status: 409 });
    }

    try {
      const removal = await removePhones(classification.unauthorized);
      return Response.json({ ...baseSummary, kickResults: removal.results });
    } catch {
      return Response.json({
        ...baseSummary,
        error: 'bot removal request failed',
        kickResults: [],
      }, { status: 502 });
    }
  } catch (error) {
    console.error('admin_group_audit_failed', {
      error: error instanceof Error ? error.name : 'UnknownError',
    });
    return Response.json({ error: 'internal error' }, { status: 500 });
  }
}

export async function GET(request: Request): Promise<Response> {
  return runAudit(request, false);
}

export async function POST(request: Request): Promise<Response> {
  return runAudit(request, true);
}
