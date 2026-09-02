# KPainter MCP Public Contract

Last updated: 2026-09-01

## Goal

Expose KPainter OpenAPI through a focused MCP adapter. MCP should make the same three products easy to use from an agent without inventing another lifecycle or another parameter schema.

## Public Products

| Product | type | Purpose |
| --- | --- | --- |
| Explainer Video | video | narrated explanations, training, courses, SOPs, reports, and product education |
| AI Image | image | covers, posters, illustrations, and visual concepts |
| AI App | app | interactive pages, simulations, quizzes, demos, and tools |

A source file does not choose the product. Picture-book video, standalone AI Video, AI Presentation, and Vector Animation are not currently public through MCP and must not be silently mapped to video.

## Public Tools

| Tool | Purpose |
| --- | --- |
| kp_capabilities | Read account, file, video, image, and app capabilities |
| kp_upload_file | Upload one base64-encoded source and receive a file_id |
| kp_create | Create video, image, or app |
| kp_list | List creations owned by the current account |
| kp_get | Read one creation's safe status, progress, ETA, credits, review, and actions |
| kp_message | Send a natural-language Explainer Video follow-up |
| kp_act | Perform one action currently advertised for a paused creation |
| kp_outputs | Read available delivery outputs |

The MCP service name is KPainter MCP. OpenClaw keeps its installed kpainter_* tool names for compatibility, while parameters and results follow the same schema.

## Authentication

Use the user's API key. Local stdio clients normally provide KGP_API_KEY in the server environment; trusted multi-user hosts may pass api_key per tool call.

Never log, persist in output, or return the complete key. Account signup, key management, subscription, and payment remain on the KPainter website.

## Creation Flow

1. Call kp_capabilities.
2. Upload sources with kp_upload_file.
3. Call kp_create with one matching video, image, or app object.
4. Poll kp_get until ready, failed, or paused.
5. Call kp_outputs after a usable delivery is available.
6. Use kp_message for supported Explainer Video changes.
7. Call kp_act only for an action returned by kp_get.

Do not create a second request merely because transport state is uncertain. Query the existing creation first.

## Request Schema

Common kp_create fields:

- type
- prompt
- instructions
- input_file_ids
- max_credits

Product settings:

- video: duration_seconds, aspect_ratio, language, voice_id, template_id, expression_style_id
- image: provider, model, aspect_ratio, output_quality, quality, style_id
- app: language

Fields and results use snake_case. Image provider and model are an atomic capabilities bundle. Video uses advertised duration targets and currently uses 16:9.

## Status and Recovery

kp_get returns a user-safe state including status, progress_pct, optional estimated_remaining_seconds, optional estimated_credits, successful actual_credits, has_usable_delivery, review, result_code, and available_actions.

A paused task may advertise resume_after_recharge, approve_overage, or retry. kp_act sends the selected action and an idempotency_key. Only the newest paused task is recoverable.

## Attachments and URLs

All three products accept uploaded files. kp_upload_file returns a file_id that can be placed in input_file_ids.

Only Explainer Video currently advertises URL Context. AI Image and AI App must not claim to read a webpage simply because a URL appears in the prompt.

## Transport

- stdio: kp-mcp --stdio
- Streamable HTTP: /mcp on the KPainter API host

Both transports expose the same eight tools.

## Output Safety

Return only documented, user-facing fields and output URLs. Do not expose raw errors, execution receipts, storage paths, hidden prompts, or implementation-specific identifiers.
