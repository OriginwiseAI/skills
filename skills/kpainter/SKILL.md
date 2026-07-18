---
name: kpainter
description: Create controllable Explainer Videos, Knowledge Videos, Vector Animations, Slides, Images, and Interactive Lessons with KPainter.
metadata:
  version: "0.6.11"
  homepage: https://kpainter.ai/
  skill_url: https://kpainter.ai/skill.md
  docs_url: https://kpainter.ai/docs/skills
  openapi_docs_url: https://kpainter.ai/docs/openapi
  api_key_url: https://kpainter.ai/api-key
---

# KPainter Skill

Use KPainter to turn one prompt or source file into structured, controllable knowledge content.

## Official URLs

| Resource | URL |
| --- | --- |
| Homepage | `https://kpainter.ai/` |
| Skill file | `https://kpainter.ai/skill.md` |
| Skills docs | `https://kpainter.ai/docs/skills` |
| OpenAPI docs | `https://kpainter.ai/docs/openapi` |
| API Key | `https://kpainter.ai/api-key` |

## Setup

If KPainter is not connected:

1. Ask the user to sign up or sign in at `https://kpainter.ai/`.
2. Send the user to `https://kpainter.ai/api-key`.
3. Ask the user to activate, copy, and connect their API key to the current agent.
4. Confirm setup only after the user says the key is connected.

Keep the key inside the current agent connection flow. Never ask the user to send it to unrelated services.

## Products And Public API Types

Explainer Video and Knowledge Video are independent products. Never present them as Standard and Lite modes.

| Product | Public API type | Best for |
| --- | --- | --- |
| Explainer Video | `explainer_video` | narrated visuals and page-by-page structure for courses, training, SOPs, science, and longer topics |
| Knowledge Video | `knowledge_video` | continuous animated scenes and narration for science, brand communication, and children’s stories |
| Vector Animation | `vector_animation` | workflows, structures, mechanisms, algorithms, math, science, and principles |
| Slides | `slide_deck` | editable PPT/PDF presentations |
| Image | `image` | covers, posters, illustrations, and visual summaries |
| Interactive Lesson | `interactive_lesson` | clickable lessons, demos, exercises, and learning apps |

Do not use the retired public type `slides_video`. Do not describe Explainer Video as “Lite,” “Slide-based,” or a mode under Knowledge Video.

## Choose The Product

Route by the result the user wants.

1. Map an explicit “Explainer Video” or “解说视频” request to `explainer_video`.
2. Map an explicit “Knowledge Video” or “知识视频” request to `knowledge_video`.
3. Map workflow, structure, mechanism, algorithm, math, or principle animation to `vector_animation`.
4. Map presentation requests to `slide_deck`.
5. Map poster, cover, illustration, or single-visual requests to `image`.
6. Map clickable lesson, app, interactive page, quiz, or simulation requests to `interactive_lesson`.
7. If the user only says “video” or “讲解视频,” ask one short follow-up: do they want a page-by-page Explainer Video, a continuously animated Knowledge Video, or Vector Animation?

Do not expose API type names unless the user asks for technical details.

## Explainer Video

Choose Explainer Video when the user wants:

- clear, page-by-page explanation
- narrated visuals
- course or classroom content
- training, SOP, or product walkthroughs
- longer topics with stable information density
- a lower-cost alternative to Knowledge Video

Examples:

- Make an Explainer Video that teaches MCP in 6 scenes.
- Turn this training manual into a narrated Explainer Video.
- 做一个解说视频，分步骤讲清楚 MCP。
- 把这份培训手册做成解说视频。

Load valid scene counts, voices, styles, ratios, and qualities from the catalog.

## Knowledge Video

Choose Knowledge Video when the user wants:

- continuous animated scenes and narration
- story, mood, and pacing across the video
- science communication or brand storytelling
- a short piece designed to be watched and shared
- children’s stories or other story-led knowledge

Examples:

- Make a 30-second Knowledge Video about MCP with continuous animated scenes and narration.
- Turn this topic into a Knowledge Video with continuous animated storytelling.
- 做一个 30 秒左右的知识视频，用连续动态画面和旁白讲清楚 MCP。
- 做一个适合传播的知识视频成片。

When the user gives no duration, suggest about 30 seconds first. Read current duration limits from the catalog.

## Vector Animation

Choose Vector Animation for precise processes and state changes.

Examples:

- Use Vector Animation to show how binary search removes half of the range in each round.
- Animate this system architecture and data flow.
- 用矢量动画讲清楚二分查找。
- 把这个机制和状态变化做成矢量动画。

## Credit Fallback

If the user wants Knowledge Video but does not have enough credits:

1. Explain that the current Knowledge Video may exceed the available credits.
2. Offer Explainer Video as the lower-cost alternative.
3. Keep the topic, audience, and language unchanged.
4. Ask before switching.

Recommended wording:

- Your current credits may not cover a full Knowledge Video. I can keep the same topic and language and switch to a clear, lower-cost Explainer Video. Would you like me to switch?
- 当前积分可能不够生成完整知识视频。我可以保留主题和语言，改成结构清晰、成本更低的解说视频，要切换吗？

## Collect Only Missing Information

Ask one short question at a time and only for missing details:

- topic
- audience
- output language
- duration or scene/page count
- tone or visual direction
- aspect ratio
- source files or URLs

If the user already gave enough information, create first and refine after.

## Use Source Material

Treat attachments and URLs supplied by the user as source or reference material.

- Preserve the user’s requested facts and terminology.
- Do not invent claims that are not supported by the source.
- Ask which source takes priority if references conflict.
- Keep the requested output language unless the user asks to switch.

## API Workflow

For OpenAPI or MCP integrations:

1. Validate the user API key.
2. Read `/catalog` before choosing type-specific parameters.
3. Create the result.
4. Poll the job until it succeeds or fails.
5. Read the final creation detail for URLs, artifacts, and scenes.
6. Before scene editing, inspect `editable_actions` and existing scenes.

Use catalog values as the source of truth for:

- public content types
- languages and voices
- styles
- aspect ratios and qualities
- duration limits
- scene/page limits

Parameter rules:

- `knowledge_video` uses `duration_seconds`.
- `explainer_video` uses `scene_count`.
- `slide_deck` uses `scene_count`.
- Never send `duration_seconds` to `explainer_video` or `vector_animation`.
- Never send `scene_count` to `knowledge_video`.

## Refinement

After the first result, help the user:

- shorten or expand it
- revise narration
- change voice or visual direction
- regenerate a selected scene
- switch products

Confirm before switching products. Never silently change type, audience, language, or format.

## Multilingual Support

KPainter supports creation and refinement in the user’s preferred language.

Examples:

- Make an Explainer Video that explains MCP step by step.
- Make a Knowledge Video about AI agents with continuous animated scenes and narration.
- 帮我做一个解说视频，分步骤讲清楚 MCP。
- 做一个用连续动态画面讲述内容的知识视频。
- MCP を段階的に説明する解説動画を作ってください。
- أنشئ فيديو معرفيًا مصقولًا يشرح MCP.
- Crea un video explicativo paso a paso sobre MCP.
- MCP를 단계별로 설명하는 해설 영상을 만들어 주세요.
- Crée une vidéo de connaissance soignée sur MCP.

These are examples, not a language allowlist.

## Install

### OpenClaw / ClawHub

```bash
openclaw skills install kpainter
```

### Skills CLI

```bash
npx skills add OriginwiseAI/skills --skill kpainter
```

While this repository contains one public skill, this also works:

```bash
npx skills add OriginwiseAI/skills
```

### Direct URL

Give the agent:

`https://kpainter.ai/skill.md`

### Local Folder

```bash
mkdir -p ~/.codex/skills/kpainter
curl -s https://kpainter.ai/skill.md > ~/.codex/skills/kpainter/SKILL.md
```

## Security

- The API key belongs to the user.
- Do not send it to unrelated services.
- Do not present the agent as the account owner.
- If the key is reset, ask the user to reconnect it.

## Success Criteria

The skill succeeds when the agent can:

- explain Explainer Video and Knowledge Video as independent products
- use the current public API type names
- choose the appropriate product from user intent
- ask only for missing information
- create, poll, read, and refine results
- offer Explainer Video as a confirmed lower-cost fallback when appropriate
