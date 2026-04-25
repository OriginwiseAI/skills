# KPainter OpenClaw

OpenClaw `code-plugin` package for KPainter.

## What it does

This package adds a minimal set of KPainter API tools to OpenClaw so an agent
can:

- fetch the create catalog
- inspect the current account and credits
- create explainer videos, slides, images, and interactive lessons
- list creations and poll job or knowledge status

## Files

- `package.json`
- `openclaw.plugin.json`
- `src/index.js`

## Config

Configure the plugin under `plugins.entries["kpainter-openclaw"].config`:

```json
{
  "apiBaseUrl": "https://kpainter.ai/kp-app-api/v1",
  "apiKey": "<your_kpainter_api_key>",
  "requestTimeoutMs": 30000
}
```

Notes:

- `apiBaseUrl` defaults to the public production API
- `apiKey` is required for account, credits, create, list, detail, and status tools
- the catalog tool can run without an API key
- the runtime sends both `Authorization: Bearer <key>` and `X-KGP-Api-Key: <key>` for compatibility with KPainter's public API surfaces

## Exposed tools

- `kpainter_get_create_catalog`
- `kpainter_get_me`
- `kpainter_get_credit_balance`
- `kpainter_create_knowledge`
- `kpainter_list_knowledge`
- `kpainter_get_knowledge`
- `kpainter_get_job_status`
- `kpainter_get_knowledge_status`

## Validation

Before publishing:

```bash
cd plugins/kpainter-openclaw
node --check src/index.js
npm pack --dry-run
```

## Suggested publish command

```bash
  clawhub package publish ./plugins/kpainter-openclaw \
  --family code-plugin \
  --name kpainter-openclaw \
  --display-name "KPainter OpenClaw" \
  --version 0.1.5 \
  --source-repo OriginwiseAI/skills \
  --source-commit <git-sha> \
  --source-ref refs/heads/main \
  --source-path plugins/kpainter-openclaw \
  --changelog "Shorten marketplace summaries and keep GPT-Image-2 as a trailing note"
```

## Current caveats

- This package is now a real runtime, but it has not been runtime-tested against a fresh OpenClaw install in this repo.
- Recent upstream OpenClaw issues have affected external plugin loading and tool registration. Re-test on the target OpenClaw version before recommending broad production use.
