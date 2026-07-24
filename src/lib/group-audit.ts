import { getAuditMaxRemovals } from '@/config/env';
import { classifyParticipants } from '@/domain/audit';
import { fetchParticipants, removePhones } from '@/lib/bot/client';
import type { BotRemovalResult } from '@/types/bot';

export interface GroupAuditResult {
  totalParticipantsChecked: number;
  unauthorizedFound: number;
  unauthorizedPhones: string[];
  adminExemptedCount: number;
  groupErrors: { groupId: string; error: string }[];
  kickResults: BotRemovalResult[];
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
}): Promise<GroupAuditResult> {
  const participants = await fetchParticipants();

  if (participants.errors.length > 0) {
    return {
      totalParticipantsChecked: participants.allPhones.length,
      unauthorizedFound: 0,
      unauthorizedPhones: [],
      adminExemptedCount: 0,
      groupErrors: participants.errors,
      kickResults: [],
      skippedReason: 'configured_group_read_failed',
    };
  }

  const classification = classifyParticipants(
    participants.allPhones,
    options.validAccessPhones,
    options.adminPhones,
  );

  const base: GroupAuditResult = {
    totalParticipantsChecked: participants.allPhones.length,
    unauthorizedFound: classification.unauthorized.length,
    unauthorizedPhones: classification.unauthorized,
    adminExemptedCount: classification.adminExempted.length,
    groupErrors: participants.errors,
    kickResults: [],
  };

  if (!options.executeRemoval || classification.unauthorized.length === 0) {
    return base;
  }

  const maxRemovals = getAuditMaxRemovals();
  if (classification.unauthorized.length > maxRemovals) {
    return { ...base, skippedReason: `safety_stop_exceeds_audit_max_removals_${maxRemovals}` };
  }

  try {
    const removal = await removePhones(classification.unauthorized);
    return { ...base, kickResults: removal.results };
  } catch {
    return { ...base, skippedReason: 'bot_removal_request_failed' };
  }
}
