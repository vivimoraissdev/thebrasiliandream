# The Brazilian Dream repository rules

This Next.js/Vercel repository owns the landing page, Cakto webhook processing, Supabase access state, Resend e-mails, cron processing, administrative audits, and community-access business rules.

Read `README.md`, `AGENTS.md`, and `docs/whatsapp-automation-backend.md` before implementing backend changes.

Always preserve these invariants:

- e-book-only purchases grant no WhatsApp group access;
- final access-ended e-mail is sent only after confirmed removal;
- webhook delivery is authenticated, validated, idempotent, and concurrency-safe;
- cron and administrative endpoints remain protected;
- server secrets never receive a `NEXT_PUBLIC_` prefix or enter client bundles;
- failures remain retryable and externally returned errors are sanitized.

The bot owns WhatsApp connectivity and group mutations. Coordinate changes to `BOT_SECRET`, `ADMIN_NUMBERS`, `/health`, `/participants`, or `/remove` with `whatsapp-bot-brasiliandream`.

Use one writing agent in this repository at a time. Run `npm run typecheck`, `npm test`, and `npm run build` after code changes. Do not commit, push, or deploy unless explicitly requested.
