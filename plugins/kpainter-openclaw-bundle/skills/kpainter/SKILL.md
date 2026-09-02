---
name: kpainter
description: Create and refine KPainter explainer videos, AI images, and AI apps from natural-language requests, uploaded sources, or supported web links.
metadata:
  version: "1.0.0"
  homepage: https://kpainter.ai/
  skill_url: https://kpainter.ai/skill.md
  docs_url: https://kpainter.ai/docs/skills
  openapi_docs_url: https://kpainter.ai/docs/openapi
  api_key_url: https://kpainter.ai/api-key
---

# KPainter Skill

Use KPainter to create explainer videos, AI images, and interactive AI apps without leaving the current conversation. Accept source files when available, monitor asynchronous work, and help the user refine a completed result.

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

## Available Results

KPainter OpenAPI exposes three results through one `creations` resource:

| Product | Public type | Choose it for |
| --- | --- | --- |
| Explainer Video | `video` | narrated explanations, courses, training, reports, product education, and story-led knowledge |
| AI Image | `image` | posters, covers, illustrations, campaign visuals, and single-image concepts |
| AI App | `app` | interactive pages, simulations, quizzes, demos, and small tools |

Do not show these type names unless technical detail helps the user.

## Route Requests By Intended Result

Map the result the user wants, not the format of the source:

1. “Explainer video,” “解说视频,” “知识讲解,” “training video,” “course video,” or “turn this document into a video” → `video`.
2. “Image,” “poster,” “cover,” “illustration,” “图片,” “海报,” “封面,” or “插画” → `image`.
3. “App,” “interactive page,” “simulation,” “quiz,” “tool,” “应用,” “互动网页,” “模拟器,” “测验,” or “小工具” → `app`.
4. A PDF, PPT, spreadsheet, document, webpage, or image is an input source. It does not select the output type.
5. If the user says only “make something from this,” ask one short question about the intended result.
6. Picture-book video, standalone AI Video, AI Presentation, and Vector Animation are not currently available through KPainter OpenAPI. Say so clearly; do not silently convert them to `video`.
7. Never switch products because of credits, missing parameters, or a failed request without asking the user.

## Explainer Video

Choose Explainer Video when the user wants a complete narrated video that explains a topic or source.

Common requests:

- Make an explainer video for new employees from this onboarding PDF.
- Turn this webpage into a 1–3 minute English training video.
- Explain the Pythagorean theorem with clear visual steps and narration.
- 用这份 SOP 做一个面向一线员工的解说视频。
- 把这个网页整理成一条英文知识讲解视频。
- 做一个面向客户的产品功能介绍视频。

Useful details include the audience, language, target duration, voice, template, expression style, and facts that must remain exact. Read current duration presets, templates, styles, and voices from `kp_capabilities` or `GET /capabilities`; never guess IDs.

Only Explainer Video may use URL Context. A URL inside an image or app request is ordinary prompt text unless its contents are uploaded as a file.

## AI Image

Choose AI Image for one visual result.

Common requests:

- Create a 16:9 course cover about binary search.
- Make a vertical event poster using this reference image.
- 为这份研究报告做一张简洁的封面图。
- 根据附件里的品牌规范生成一张活动海报。

Read the complete model bundle from capabilities:

- `gemini + nano-banana-2`
- `azure_openai + gpt-image-2`

Use only aspect ratios and output qualities listed for the selected bundle. GPT Image also exposes its own `quality` setting; do not send that field to Gemini.

## AI App

Choose AI App when the user should click, change, answer, or explore something.

Common requests:

- Build an interactive quiz from this training handbook.
- Create a simulator that shows how compound interest changes over time.
- 做一个可以拖动参数观察抛物线变化的互动网页。
- 根据需求文档做一个可点击的产品原型。

Ask what the user should be able to do and what a successful interaction should show. AI App accepts uploaded files but does not claim to read a webpage URL.

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
- Upload supported local sources with `POST /files` or `kp_upload_file`, then pass the returned `file_id` in `input_file_ids`.
- Do not claim to have read an attachment unless upload succeeded.
- For an Explainer Video, a URL in the prompt may be used as source context. For AI Image and AI App, upload source material instead of claiming that KPainter read the webpage.
- Never copy another creation’s private attachments during a remix or follow-up.

## API Workflow

For OpenAPI or MCP integrations:

1. Validate the user API key.
2. Read `GET /capabilities` or call `kp_capabilities`.
3. Upload source files and keep the returned `file_id` values.
4. Create one `video`, `image`, or `app`.
5. Poll the same creation until it reaches `ready`, `failed`, or `paused`.
6. Read `outputs` only after a usable delivery is available.
7. Use `messages` for follow-up video requests.
8. Call an action only when that exact action appears in `available_actions`.

Use capabilities as the source of truth for:

- available products and input-file limits
- video duration presets, voices, templates, and expression styles
- image provider/model bundles, aspect ratios, output qualities, and native quality
- supported languages and URL behavior

Parameter rules:

- Public requests use `snake_case`.
- Common creation fields are `type`, `prompt`, `instructions`, `input_file_ids`, and `max_credits`.
- Put product settings inside exactly one matching object: `video`, `image`, or `app`.
- `video.aspect_ratio` is currently fixed at `16:9`; use only advertised duration targets.
- `image.provider` and `image.model` are one advertised bundle and must not be mixed across providers.
- Keep `idempotency_key` stable when retrying the same message or action after a network interruption.
- Never expose or request internal job, quote, provider receipt, storage path, or hidden prompt fields.

## Refinement

After the first result, help the user:

- shorten or expand it
- revise narration
- change voice or visual direction
- update a selected video scene or the complete video
- create a revised image or app request when conversational editing is not advertised

Confirm before switching products. Never silently change type, audience, language, or format.

## Multilingual Support

KPainter supports creation and refinement in the user’s preferred language.

Examples:

- Make an Explainer Video about AI agents with continuous animated scenes and narration.
- 帮我做一个解说视频，用连续动态画面讲清楚 MCP。
- MCP を段階的に説明する解説動画を作ってください。
- أنشئ فيديو معرفيًا مصقولًا يشرح MCP.
- Crea un video explicativo paso a paso sobre MCP.
- MCP를 단계별로 설명하는 해설 영상을 만들어 주세요.
- Crée une vidéo de connaissance soignée sur MCP.
- Crea una imagen de portada para este curso.
- この資料からインタラクティブなクイズを作ってください。

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
- Do not reveal internal job identifiers, provider receipts, quotes, prompts, storage paths, or raw service errors.
- Do not invent progress, ETA, credit use, or output URLs. Report only the fields returned by KPainter.
- Do not automatically repeat a request whose remote state is unknown.

## Success Criteria

The skill succeeds when the agent can:

- explain and route the three public products accurately
- use `video`, `image`, and `app` through one creations workflow
- treat PDFs, PPTs, webpages, and images as inputs rather than product types
- decline unavailable public products without silently remapping them
- ask only for missing information
- upload files, create, monitor, read outputs, and refine supported results
- choose video settings and AI Image model bundles from current capabilities
- recover only the newest paused task and only through an advertised action
- report safe status, ETA, estimated credits, actual credits, and failures without exposing internal execution details
