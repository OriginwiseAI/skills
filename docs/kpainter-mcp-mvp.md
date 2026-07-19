# KPainter MCP Public Contract

Last updated: 2026-07-19

## Goal

Expose the Public OpenAPI as a thin MCP adapter. MCP must not reimplement product validation, pricing, generation, or provider state.

## Public tools

- `kp_me`: validate the user API key
- `kp_get_catalog`: read products, generation models, voices, styles, and limits
- `kp_create_creation`: create any catalog-supported product
- `kp_list_creations`: list results owned by the API key
- `kp_get_creation`: read final URLs, artifacts, scenes, and editable actions
- `kp_get_job_status`: poll a create or edit job
- `kp_edit_creation`: run a scene edit or Omni AI Video iteration

## Products

Use only catalog-returned Public API types:

- `explainer_video`: Explainer Video
- `read_aloud_video`: Read Aloud Video
- `vector_animation`: Vector Animation
- `image`: AI Image; select Nano Banana 2 or GPT Image 2 through image parameters
- `ai_video`: AI Video; select Gemini Omni Flash or Veo through video parameters
- `slides`: AI PPT
- `interactive_lesson`: AI App

Do not infer the product name from the technical enum. Do not create model-specific content types.

## AI Video

The MCP create tool maps its flat model arguments into Public OpenAPI `video_generation`.

- Gemini Omni Flash supports text-to-video and `iterate` follow-up edits.
- Veo 3.1 Fast and Standard support text-to-video but not conversational editing.
- First frame, last frame, and attachments stay unavailable until the Public Files API is exposed in Catalog.
- MCP clients never send `previous_interaction_id`.

## Authentication

Forward the user's key to `https://api.kpainter.ai/openapi/v1` using `X-KGP-Api-Key`. The adapter may also send `Authorization: Bearer` for host compatibility, but it must not log or persist the complete key outside the configured connection.

## Call order

1. `kp_me`
2. `kp_get_catalog`
3. `kp_create_creation`
4. poll `kp_get_job_status`
5. `kp_get_creation`
6. if supported, `kp_edit_creation`, poll, and read the creation again

Always return URLs from the official detail response. Never construct storage URLs or expose internal `extra_config`, source records, or provider cursors.
