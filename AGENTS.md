# The Brazilian Dream repository instructions

## Repository responsibility

This repository owns the public landing page and the server-side access-automation backend deployed to Vercel. The companion `whatsapp-bot-brasiliandream` repository owns WhatsApp connectivity and group mutations.

Use `README.md` for setup and architecture. Use `docs/whatsapp-automation-backend.md` for the operational flow, database migration, security, and deployment sequence.

## Stack and layout

- Next.js 16, React 19, TypeScript, and Tailwind CSS 4.
- Supabase service-role access is isolated in server-side utilities and data modules.
- Resend handles transactional e-mails and operational alerts.
- Route handlers live under `src/app/api`.
- Pure business rules belong in `src/domain` or `src/config` and should have Vitest coverage.
- External integrations belong under `src/lib`; persistence belongs under `src/data`.

## Non-negotiable behavior

- An e-book-only purchase does not grant group access and must not create an effective community-access record.
- Send the final access-ended e-mail only after the customer is confirmed as removed. A failed removal remains retryable and must not trigger the final e-mail.
- Keep Cakto webhook processing authenticated, validated, idempotent, and safe under concurrent deliveries.
- Keep cron and administrative routes protected by their configured Bearer secrets.
- Abort removal processing when the bot is disconnected.
- Preserve administrator exclusions and the audit safety limits.
- Never expose `SUPABASE_SERVICE_ROLE_KEY`, Cakto, Resend, bot, cron, or audit secrets through `NEXT_PUBLIC_` variables or client components.
- Return sanitized errors; do not log secret values or sensitive payloads unnecessarily.

## Companion bot contract

- `BOT_SERVER_URL` must use HTTPS in production.
- `BOT_SECRET` must match the bot's Bearer token.
- `ADMIN_NUMBERS` must identify the same protected administrators on both services.
- `GET /health` reports whether removal work may proceed.
- `GET /participants` returns `allPhones`, per-group membership, and per-group errors.
- `POST /remove` accepts a batch of phones and returns a result for every requested phone.

When changing one of these contracts, review the companion repository's implementation, types, `.env.example`, tests, and README. Do not silently make a one-sided incompatible change.

## Editing conventions

- Keep server-only code out of client bundles.
- Validate external input at the route boundary.
- Prefer pure, testable domain functions for dates, phones, product access, and audit decisions.
- Preserve UTC date semantics and optimistic-concurrency behavior.
- Update `.env.example` and documentation whenever an environment contract changes; never add real values.
- Keep the landing page accessible and responsive when changing UI components.
- Preserve unrelated user changes in the worktree.

## Agent orchestration

- Use one writing agent in this repository at a time.
- Parallel delegation is appropriate for independent read-only exploration, review, or validation, not for concurrent edits to the same files.
- The coordinating agent owns any cross-repository contract decision and the final review.
- Do not modify the bot repository unless the task explicitly affects its owned behavior or shared contract.

## Validation and completion

For code changes, run:

```bash
npm run typecheck
npm test
npm run build
```

For documentation-only changes, run `git diff --check` and verify local Markdown links. Before completion, inspect the final diff and report any check that could not be run. Do not commit, push, or deploy unless explicitly requested.
