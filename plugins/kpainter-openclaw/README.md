# KPainter OpenClaw

OpenClaw `code-plugin` that connects agents to KPainter OpenAPI to create Explainer Videos, AI Images, and AI Apps, then monitor supported results.

## What it does

This package adds a minimal set of KPainter API tools to OpenClaw so an agent
can:

- read current video, image, app, and file capabilities
- upload source files
- create Explainer Videos, AI Images, and AI Apps
- list creations, read status, send video follow-ups, continue paused work, and read outputs

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
- `apiKey` is required for account-scoped tools
- the runtime sends `Authorization: Bearer <key>`

## Exposed tools

- `kpainter_capabilities`
- `kpainter_upload_file`
- `kpainter_create`
- `kpainter_list`
- `kpainter_get`
- `kpainter_message`
- `kpainter_act`
- `kpainter_outputs`

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
  --version 1.0.0 \
  --source-repo OriginwiseAI/skills \
  --source-commit <git-sha> \
  --source-ref refs/heads/main \
  --source-path plugins/kpainter-openclaw \
  --changelog "Align OpenClaw with KPainter OpenAPI video, image, and app creations"
```

## Validation status

- Contract tests validate all eight tools and the three-product schema.
- The package remains a preview because this release check did not use a real user API key to run a paid end-to-end generation.
