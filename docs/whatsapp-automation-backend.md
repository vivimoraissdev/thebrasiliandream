# WhatsApp automation backend

This Next.js backend receives Cakto webhooks, stores effective WhatsApp community access in Supabase, sends lifecycle e-mails through Resend, and calls the companion WhatsApp bot.

## Product access rules

| Product | Group access |
|---|---:|
| Comunidade Imersão | 4 months |
| Combo Completo | 1 month |
| Extensão de Comunidade | +4 months |
| Ebook | No group access |

Ebook events are acknowledged but are not written to `customers`. The table represents effective community access, not every commercial purchase.

## Environment variables

Configure all values from `.env.example` in Vercel. `BOT_SECRET` must match the companion bot. `ADMIN_NUMBERS` is a comma-separated list of international numbers and is used as a fail-safe by both services.

`RESEND_FROM_EMAIL` must use a verified Resend domain. `BOT_SERVER_URL` must use HTTPS in production.

## Database migration

Run `supabase/migrations/20260722000000_create_whatsapp_automation.sql` in the Supabase SQL Editor or through the Supabase CLI.

After applying it, verify in **Table Editor → customers → RLS** and **Table Editor → webhook_events → RLS** that:

1. RLS is enabled.
2. There are zero public policies.
3. The tables cannot be read with an anonymous key.

The service-role key is server-only and must never use a `NEXT_PUBLIC_` prefix.

## API routes

### `POST /api/webhooks/cakto`

- Authenticates the top-level Cakto secret.
- Validates known events and product IDs.
- Ignores ebook and unknown product access safely.
- Deduplicates webhook deliveries using a stable event fingerprint.
- Uses optimistic concurrency so simultaneous combo/order-bump events cannot overwrite an extension.
- Returns generic database errors only.

### `GET /api/cron/check-access`

Protected by `Authorization: Bearer $CRON_SECRET`.

Execution order:

1. Verify bot heartbeat; alert and abort if disconnected.
2. Send seven-day warnings.
3. Remove every expired/refunded/chargebacked access that has not been removed yet.
4. Mark successful removals as `removed`.
5. Send final e-mails only to records already marked `removed`.

Failed final e-mails remain eligible on later runs. Failed removals remain eligible because the query selects all expirations before the current UTC day, not only yesterday.

### `GET /api/admin/audit-group`

Protected dry-run. It reads live participants and reports unauthorized numbers without removing anyone.

### `POST /api/admin/audit-group`

Protected execution mode. It applies the same audit and sends a single batch removal request. The route stops when the valid-access set is unexpectedly empty or the number of removals exceeds `AUDIT_MAX_REMOVALS`.

## Vercel Cron

`vercel.json` schedules the job once daily at 12:00 UTC. Vercel activates cron jobs only for production deployments; preview deployments from `staging` must invoke the protected route manually for validation.

Make sure no redirect middleware applies to `/api/cron/*`.

## Deployment order

1. Deploy the updated bot and verify `/health` and authenticated `/participants`.
2. Apply the Supabase migration and verify RLS.
3. Configure Vercel and Resend environment variables.
4. Deploy the Next.js application.
5. Send controlled Cakto events and verify webhook idempotency.
6. Run the cron route manually with the Bearer token.
7. Run the audit with `GET` before using `POST`.
