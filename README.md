# The Brazilian Dream

The Brazilian Dream landing page and sales automation backend. The application is deployed on Vercel and integrates with Cakto, Supabase, Resend, and the `whatsapp-bot-brasiliandream` service.

## Responsibilities

- Display the landing page and direct visitors to checkout.
- Receive and validate Cakto webhooks.
- Persist the effective community access period in Supabase.
- Send transactional emails and operational alerts through Resend.
- Run the daily notification, expiration, and removal routine.
- Audit group participants through the bot API.

## Access rules

| Product | Group access |
|---|---:|
| Immersion Community | 4 months |
| Complete Bundle | 1 month |
| Community Extension | +4 months |
| E-book | No access |

Purchasing the e-book by itself does not grant community access. The final access-ended email is sent only after the participant's removal has been confirmed.

## Stack

- Next.js 16 and React 19
- TypeScript
- Tailwind CSS 4
- Supabase
- Resend
- Vitest
- Vercel and Vercel Cron

## Local development

Requirements: Node.js 20 or later and npm.

```bash
npm install
copy .env.example .env.local
npm run dev
```

On macOS or Linux, replace the second command with `cp .env.example .env.local`.

Do not use the `NEXT_PUBLIC_` prefix for Supabase, Cakto, Resend, cron, or bot keys. These variables are server-only.

## Environment variables

Use [`.env.example`](./.env.example) as the contract. The variables are grouped by integration:

- Bot: `BOT_SERVER_URL` and `BOT_SECRET`.
- Protected routines: `CRON_SECRET`, `ADMIN_AUDIT_SECRET`, `ADMIN_NUMBERS`, and `AUDIT_MAX_REMOVALS`.
- Cakto: `CAKTO_WEBHOOK_SECRET`.
- Resend: `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, and `ADMIN_ALERT_EMAIL`.
- Supabase: `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`.

`BOT_SECRET` and `ADMIN_NUMBERS` must remain compatible with the bot configuration.

## Commands

| Command | Purpose |
|---|---|
| `npm run dev` | Start the local development server with hot reload. |
| `npm run typecheck` | Run TypeScript static type checking. |
| `npm test` | Run automated tests with Vitest. |
| `npm run build` | Create the production Next.js build. |
| `npm start` | Run the production build. |

Before completing changes, run:

```bash
npm run typecheck
npm test
npm run build
```

## Main structure

```text
src/
|-- app/                  # pages and HTTP routes
|-- components/           # landing page components
|-- config/               # environment, products, and administrative limits
|-- data/                 # Supabase access
|-- domain/               # pure business rules and tests
|-- lib/bot/              # bot HTTP client
|-- lib/email/            # email client and templates
`-- utils/                # security, concurrency, and Supabase utilities
supabase/migrations/      # database schema and policies
docs/                     # operational documentation
```

## Backend routes

| Method and route | Purpose |
|---|---|
| `POST /api/webhooks/cakto` | Validate and process Cakto events idempotently. |
| `GET /api/cron/check-access` | Send notifications, remove expired access, and send the final email. |
| `GET /api/admin/audit-group` | Generate a protected audit without removing participants. |
| `POST /api/admin/audit-group` | Perform protected removal after applying the safety limits. |

See [docs/whatsapp-automation-backend.md](./docs/whatsapp-automation-backend.md) for detailed rules, migration, security, and deployment order.

## Bot integration

This project is the business logic orchestrator. The bot is the WhatsApp adapter and exposes `GET /health`, `GET /participants`, and `POST /remove`.

The recommended deployment order is:

1. Deploy the bot and validate the connection.
2. Apply the Supabase migration.
3. Configure the Vercel and Resend variables.
4. Deploy this application.
5. Validate webhooks, cron, and auditing with controlled data.

## Agent orchestration

The repository includes version-controlled instructions for Codex and Antigravity:

- [`AGENTS.md`](./AGENTS.md): architecture, safety limits, business rules, and completion criteria for Codex.
- [`.agents/rules/repository.md`](./.agents/rules/repository.md): equivalent permanent rules for Antigravity.
- [`.agents/workflows/validate.md`](./.agents/workflows/validate.md): an on-demand workflow for type checking, tests, and builds.

Changes to the bot contract must be coordinated with `whatsapp-bot-brasiliandream`. Only one agent may write to this repository at each stage; independent exploration, review, and validation may be delegated in parallel.

## Integration branch

Integrated development across both projects takes place on the `staging` branch.
