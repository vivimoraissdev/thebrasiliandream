# The Brazilian Dream

Landing page e backend de automação comercial do The Brazilian Dream. A aplicação é publicada na Vercel e integra Cakto, Supabase, Resend e o serviço `whatsapp-bot-brasiliandream`.

## Responsabilidades

- Exibir a landing page e encaminhar visitantes ao checkout.
- Receber e validar webhooks da Cakto.
- Persistir o período efetivo de acesso à comunidade no Supabase.
- Enviar e-mails transacionais e alertas operacionais pelo Resend.
- Executar a rotina diária de aviso, expiração e remoção.
- Auditar participantes dos grupos por meio da API do bot.

## Regras de acesso

| Produto | Acesso aos grupos |
|---|---:|
| Comunidade Imersão | 4 meses |
| Combo Completo | 1 mês |
| Extensão de Comunidade | +4 meses |
| E-book | Nenhum acesso |

A compra isolada do e-book não cria acesso à comunidade. O e-mail final de encerramento só é enviado depois que a remoção do participante tiver sido confirmada.

## Stack

- Next.js 16 e React 19
- TypeScript
- Tailwind CSS 4
- Supabase
- Resend
- Vitest
- Vercel e Vercel Cron

## Desenvolvimento local

Requisitos: Node.js 20 ou superior e npm.

```bash
npm install
copy .env.example .env.local
npm run dev
```

Em macOS ou Linux, substitua o segundo comando por `cp .env.example .env.local`.

Não use o prefixo `NEXT_PUBLIC_` nas chaves do Supabase, Cakto, Resend, cron ou bot. Essas variáveis são exclusivas do servidor.

## Variáveis de ambiente

Use [`.env.example`](./.env.example) como contrato. As variáveis estão agrupadas por integração:

- Bot: `BOT_SERVER_URL` e `BOT_SECRET`.
- Rotinas protegidas: `CRON_SECRET`, `ADMIN_AUDIT_SECRET`, `ADMIN_NUMBERS` e `AUDIT_MAX_REMOVALS`.
- Cakto: `CAKTO_WEBHOOK_SECRET`.
- Resend: `RESEND_API_KEY`, `RESEND_FROM_EMAIL` e `ADMIN_ALERT_EMAIL`.
- Supabase: `SUPABASE_URL` e `SUPABASE_SERVICE_ROLE_KEY`.

`BOT_SECRET` e `ADMIN_NUMBERS` devem permanecer compatíveis com a configuração do bot.

## Comandos

| Comando | Finalidade |
|---|---|
| `npm run dev` | Servidor local com recarregamento. |
| `npm run typecheck` | Verificação estática do TypeScript. |
| `npm test` | Testes automatizados com Vitest. |
| `npm run build` | Build de produção do Next.js. |
| `npm start` | Execução do build de produção. |

Antes de concluir alterações, execute:

```bash
npm run typecheck
npm test
npm run build
```

## Estrutura principal

```text
src/
|-- app/                  # páginas e rotas HTTP
|-- components/           # componentes da landing page
|-- config/               # ambiente, produtos e limites administrativos
|-- data/                 # acesso ao Supabase
|-- domain/               # regras puras e testes
|-- lib/bot/              # cliente HTTP do bot
|-- lib/email/            # cliente e templates de e-mail
`-- utils/                # segurança, concorrência e Supabase
supabase/migrations/      # schema e políticas do banco
docs/                     # documentação operacional
```

## Rotas de backend

| Método e rota | Finalidade |
|---|---|
| `POST /api/webhooks/cakto` | Validar e processar eventos da Cakto com idempotência. |
| `GET /api/cron/check-access` | Avisar, remover acessos expirados e enviar o e-mail final. |
| `GET /api/admin/audit-group` | Gerar auditoria protegida sem remover participantes. |
| `POST /api/admin/audit-group` | Executar remoção protegida após os limites de segurança. |

Consulte [docs/whatsapp-automation-backend.md](./docs/whatsapp-automation-backend.md) para regras detalhadas, migração, segurança e ordem de implantação.

## Integração com o bot

Este projeto é o orquestrador de negócio. O bot é o adaptador do WhatsApp e expõe `GET /health`, `GET /participants` e `POST /remove`.

A ordem recomendada de implantação é:

1. Implantar o bot e validar a conexão.
2. Aplicar a migração do Supabase.
3. Configurar as variáveis da Vercel e do Resend.
4. Implantar esta aplicação.
5. Validar webhooks, cron e auditoria com dados controlados.

## Orquestração de agentes

O repositório possui instruções versionadas para Codex e Antigravity:

- [`AGENTS.md`](./AGENTS.md): arquitetura, limites de segurança, regras comerciais e critérios de conclusão para o Codex.
- [`.agents/rules/repository.md`](./.agents/rules/repository.md): regras permanentes equivalentes para o Antigravity.
- [`.agents/workflows/validate.md`](./.agents/workflows/validate.md): workflow sob demanda para typecheck, testes e build.

Mudanças no contrato do bot devem ser coordenadas com `whatsapp-bot-brasiliandream`. Um único agente pode escrever neste repositório por etapa; explorações, revisões e validações independentes podem ser delegadas em paralelo.

## Branch de integração

O desenvolvimento integrado dos dois projetos ocorre na branch `staging`.
