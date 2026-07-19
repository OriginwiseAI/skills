# KPainter OpenClaw

Preview OpenClaw `code-plugin` that connects agents to KPainter's Public API to create precise, clearly structured explainer videos and interactive lessons, then monitor and refine the results.

## What it does

This package adds a minimal set of KPainter API tools to OpenClaw so an agent
can:

- fetch the Public OpenAPI catalog, including generation models
- validate the current API key
- create explainer videos, read aloud videos, vector animations, AI images, AI videos, AI PPTs, and AI apps
- list creations, poll jobs, read results, and run supported edits

## Files

- `package.json`
- `openclaw.plugin.json`
- `src/index.js`

## Config

Configure the plugin under `plugins.entries["kpainter-openclaw"].config`:

```json
{
  "apiBaseUrl": "https://api.kpainter.ai/openapi/v1",
  "apiKey": "<your_kpainter_api_key>",
  "requestTimeoutMs": 30000
}
```

Notes:

- `apiBaseUrl` defaults to the public production API
- `apiKey` is required for catalog, create, list, detail, status, and edit tools
- the runtime sends both `Authorization: Bearer <key>` and `X-KGP-Api-Key: <key>` for compatibility with KPainter's public API surfaces

## Exposed tools

- `kpainter_get_catalog`
- `kpainter_get_me`
- `kpainter_create_creation`
- `kpainter_list_creations`
- `kpainter_get_creation`
- `kpainter_get_job_status`
- `kpainter_edit_creation`

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
  --version 0.2.0 \
  --source-repo OriginwiseAI/skills \
  --source-commit <git-sha> \
  --source-ref refs/heads/main \
  --source-path plugins/kpainter-openclaw \
  --changelog "Use Public OpenAPI, add model catalogs, and expose AI Video with Omni iteration"
```

## Validation status

- An isolated install on OpenClaw `2026.4.15` loaded the plugin, its config schema, and all seven tools successfully.
- The package remains a preview because this release check did not use a real user API key to run a paid end-to-end generation.
