# Validate The Brazilian Dream

Validate the current repository without implementing fixes or changing external state.

1. Read `AGENTS.md` and inspect `git status`.
2. Run `npm run typecheck`.
3. Run `npm test`.
4. Run `npm run build`.
5. Run `git diff --check` and inspect generated or unexpected diffs.
6. Confirm local links in changed Markdown files resolve.
7. Summarize each command, its exit status, failures, and any skipped check.

Do not discard changes, commit, push, deploy, invoke production routes, or reveal environment values.
