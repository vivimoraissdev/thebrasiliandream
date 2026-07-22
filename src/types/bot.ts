import { z } from 'zod';

export const BotHealthSchema = z.object({
  status: z.string(),
  connected: z.boolean(),
  connectionState: z.string().optional(),
});

export const BotRemovalResultSchema = z.object({
  phone: z.string(),
  success: z.boolean(),
  removedFrom: z.array(z.string()),
  failedFrom: z.array(z.string()),
  error: z.string().optional(),
});

export const BotRemoveResponseSchema = z.object({
  results: z.array(BotRemovalResultSchema),
});

export const BotParticipantErrorSchema = z.object({
  groupId: z.string(),
  error: z.string(),
});

export const BotParticipantsResponseSchema = z.object({
  allPhones: z.array(z.string()),
  groups: z.array(z.object({
    groupId: z.string(),
    subject: z.string(),
    phones: z.array(z.string()),
  })).optional().default([]),
  errors: z.array(BotParticipantErrorSchema).optional().default([]),
});

export type BotRemoveResponse = z.infer<typeof BotRemoveResponseSchema>;
export type BotParticipantsResponse = z.infer<typeof BotParticipantsResponseSchema>;
