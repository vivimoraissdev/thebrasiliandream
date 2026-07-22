import { z } from 'zod';

export const CaktoEnvelopeSchema = z.object({
  secret: z.string().min(1),
  event: z.string().min(1),
});

export const CaktoWebhookSchema = CaktoEnvelopeSchema.extend({
  data: z.object({
    customer: z.object({
      name: z.string().optional(),
      email: z.email(),
      phone: z.string().min(1),
    }),
    product: z.object({
      id: z.string().uuid(),
    }),
    status: z.string().optional(),
    paidAt: z.string().nullable().optional(),
    refundedAt: z.string().nullable().optional(),
    chargedbackAt: z.string().nullable().optional(),
    refund_reason: z.string().nullable().optional(),
  }),
});

export type CaktoWebhook = z.infer<typeof CaktoWebhookSchema>;
