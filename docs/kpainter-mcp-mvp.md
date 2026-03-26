# KPainter MCP MVP

Last updated: 2026-03-26

## Goal

Ship a small MCP server that lets MCP clients connect a user's KPainter API key, create KPainter outputs, poll progress, and read result links.

## Why This Should Be A Server-Side Project

- MCP is a service-facing integration surface, not a browser-side feature.
- User API keys should be handled in a controlled server or MCP runtime, not in frontend code.
- KPainter already has a usable OpenAPI surface, so the MCP server can act as a thin adapter instead of reimplementing business logic.

## Recommended Packaging

- Repo name: `OriginwiseAI/kpainter-mcp`
- Runtime: server-side Node.js or Python
- Transport priority:
  1. `streamableHttp`
  2. `sse` compatibility if a target client still prefers it

## MVP Scope

### In Scope

- validate a user API key
- read catalog metadata when needed
- create new outputs
- poll job status
- fetch final creation details and result URLs

### Out Of Scope For V1

- scene-level editing
- file upload pipelines
- advanced account management
- billing or credit purchase flows
- multi-user admin dashboards

## Proposed Tools

### `kpainter_validate_key`

Purpose:
validate that the provided user API key can access KPainter

Maps to:
- `GET /me`

### `kpainter_get_catalog`

Purpose:
read supported types, ratios, page counts, durations, styles, voices, and languages before creation

Maps to:
- `GET /catalog`

### `kpainter_create_knowledge_video`

Purpose:
create `knowledge_video`

Maps to:
- `POST /creations`

Core inputs:
- `prompt`
- `language`
- `aspect_ratio`
- `duration_seconds`
- optional `voice_id`
- optional `style_id`

### `kpainter_create_slides_video`

Purpose:
create `slides_video`

Maps to:
- `POST /creations`

Core inputs:
- `prompt`
- `language`
- `aspect_ratio`
- `scene_count`
- optional `voice_id`
- optional `style_id`

### `kpainter_create_vector_animation`

Purpose:
create `vector_animation`

Maps to:
- `POST /creations`

Core inputs:
- `prompt`
- `language`
- `aspect_ratio`
- optional `style_id`

### `kpainter_create_slide_deck`

Purpose:
create `slide_deck`

Maps to:
- `POST /creations`

Core inputs:
- `prompt`
- `language`
- `aspect_ratio`
- `scene_count`

### `kpainter_create_image`

Purpose:
create `image`

Maps to:
- `POST /creations`

Core inputs:
- `prompt`
- `language`
- `aspect_ratio`

### `kpainter_create_web_app`

Purpose:
create `web_app`

Maps to:
- `POST /creations`

Core inputs:
- `prompt`
- `language`

### `kpainter_get_job_status`

Purpose:
read progress for a running job

Maps to:
- `GET /creations/jobs/{job_id}`

### `kpainter_get_creation`

Purpose:
read final details, result URLs, artifacts, and scenes for a creation

Maps to:
- `GET /creations/{creation_id}`

## Auth Model

- Primary model: the user brings their own KPainter API key
- MCP server stores the key only as needed for the current client session or MCP auth mechanism
- MCP server forwards requests to `https://api.kpainter.ai/openapi/v1`
- All create and read calls use the user key in `X-KGP-Api-Key`

## Recommended Call Order

1. `kpainter_validate_key`
2. `kpainter_get_catalog`
3. one of the `kpainter_create_*` tools
4. `kpainter_get_job_status`
5. `kpainter_get_creation`

## Result-Handling Rules

- Prefer `main_url` from the creation detail response for the primary result
- Return `artifacts` when present
- Return `scenes` only when a client benefits from scene-level inspection
- Do not invent export URLs outside the official detail response

## Release Order

1. internal MVP
2. Official MCP Registry
3. Smithery
4. Tencent Cloud ADP MCP plugin listing

## Backend Dependencies To Confirm

- `/me`, `/catalog`, `/creations`, `/creations/jobs/{job_id}`, and `/creations/{creation_id}` are stable enough for public MCP wrapping
- rate limits and timeout expectations for MCP clients
- whether any creation types need stricter server-side validation before external MCP exposure
