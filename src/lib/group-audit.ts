import { getAuditMaxRemovals } from '@/config/env';
import { classifyParticipants } from '@/domain/audit';
import { getPhoneComparisonKey } from '@/domain/phone';
import { fetchParticipants, removePhones } from '@/lib/bot/client';
import type { BotRemovalResult } from '@/types/bot';

export interface GroupAuditResult {
  totalParticipantsChecked: number;
  unauthorizedFound: number;
  unauthorizedPhones: string[];
  adminExemptedCount: number;
  groupErrors: { groupId: string; error: string }[];
  kickResults: BotRemovalResult[];
  deferredToLifecycleRemovalCount: number;
  skippedReason?: string;
}

/**
 * Compares real WhatsApp group participants against the set of phones with
 * currently valid access, and (optionally) removes anyone who isn't a valid
 * customer and isn't an admin-protected number.
 *
 * Callers must supply validAccessPhones/adminPhones themselves (rather than
 * this function fetching them) so callers that already fetched that data
 * (e.g. the check-access cron) don't pay for a duplicate Supabase query.
 */
export async function runGroupAudit(options: {
  executeRemoval: boolean;
  validAccessPhones: string[];
  adminPhones: string[];
  /**
   * Phones currently handled by the normal expiration/refund flow. Their
   * removal must be persisted before the final access-ended e-mail is sent.
   */
  deferRemovalPhones?: string[];
}): Promise<GroupAuditResult> {
  const participants = await fetchParticipants();

  if (participants.allPhones.length === 0 && participants.errors.length > 0) {
    return {
      totalParticipantsChecked: 0,
      unauthorizedFound: 0,
      unauthorizedPhones: [],
      adminExemptedCount: 0,
      groupErrors: participants.errors,
      kickResults: [],
      deferredToLifecycleRemovalCount: 0,
      skippedReason: 'all_configured_groups_failed',
    };
  }

  const classification = classifyParticipants(
    participants.allPhones,
    options.validAccessPhones,
    options.adminPhones,
  );
  const deferredRemovalKeys = new Set(
    (options.deferRemovalPhones ?? []).map((phone) => getPhoneComparisonKey(phone)),
  );
  const deferredToLifecycleRemoval = classification.unauthorized.filter((phone) => (
    deferredRemovalKeys.has(getPhoneComparisonKey(phone))
  ));
  const unauthorized = classification.unauthorized.filter((phone) => (
    !deferredRemovalKeys.has(getPhoneComparisonKey(phone))
  ));

  const base: GroupAuditResult = {
    totalParticipantsChecked: participants.allPhones.length,
    unauthorizedFound: unauthorized.length,
    unauthorizedPhones: unauthorized,
    adminExemptedCount: classification.adminExempted.length,
    groupErrors: participants.errors,
    kickResults: [],
    deferredToLifecycleRemovalCount: deferredToLifecycleRemoval.length,
  };

  if (!options.executeRemoval || unauthorized.length === 0) {
    return base;
  }

  // Safety stop: if we somehow think nobody has valid access, but the group
  // still has non-admin members, something upstream is almost certainly
  // broken (e.g. a failed Supabase read). Refuse to mass-remove.
  if (
    options.validAccessPhones.length === 0
    && participants.allPhones.length > classification.adminExempted.length
  ) {
    return { ...base, skippedReason: 'safety_stop_empty_valid_access_set' };
  }

  const maxRemovals = getAuditMaxRemovals();
  if (unauthorized.length > maxRemovals) {
    return { ...base, skippedReason: `safety_stop_exceeds_audit_max_removals_${maxRemovals}` };
  }

  try {
    const removal = await removePhones(unauthorized);
    return { ...base, kickResults: removal.results };
  } catch {
    return { ...base, skippedReason: 'bot_removal_request_failed' };
  }
}
