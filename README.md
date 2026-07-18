# Originwise Skills

KPainter helps users explain and create with Explainer Videos, Read Aloud Videos, Vector Animations, AI Images, AI Videos, AI PPTs, and AI Apps, then bring those workflows into agents and products through Skills, OpenAPI, and MCP.

## Install

Quick install while this repository contains one public skill:

```bash
npx skills add OriginwiseAI/skills
```

Install the current skill explicitly:

```bash
npx skills add OriginwiseAI/skills --skill kpainter
```

Install all skills in this repository explicitly:

```bash
npx skills add OriginwiseAI/skills --all
```

Install from OpenClaw / ClawHub:

```bash
openclaw skills install kpainter
```

Legacy Bun compatibility:

```bash
bunx add-skill OriginwiseAI/skills
bunx add-skill OriginwiseAI/skills --skill kpainter
```

## Current Skill

- `kpainter`
  Create controllable Explainer Videos, Read Aloud Videos, Vector Animations, AI Images, AI Videos, AI PPTs, and AI Apps.

## Current Positioning

- Hero message: `Create explainer videos, read aloud videos, vector animations, AI images, AI videos, AI PPTs, and AI apps`
- Core product promise: Turn topics, lessons, and documents into structured learning content.
- Integration promise: Browse Skills, OpenAPI, and MCP docs to bring explainer videos, read aloud videos, vector animations, AI images, AI videos, AI PPTs, and AI apps into your agent or product.

## Core Formats

- `Explainer Video`
  Use continuous animated scenes and narration for science, brand communication, and children’s stories.
- `Read Aloud Video`
  Use narrated visuals and page-by-page structure for courses, training, science, and longer topics.
- `AI PPT`
  Organize content into presentation-ready slides for courseware, training, webinars, proposals, and page-by-page editing.
- `AI App`
  Turn knowledge into interactive demos, guided exploration, practice, quizzes, and hands-on learning experiences.
- `AI Image`
  Generate covers, posters, and visual summaries when one strong visual result is the fastest path. Latest image support now includes GPT-Image-2.
- `AI Video`
  Generate short videos with Gemini Omni Flash or Veo. Omni supports conversational iteration.

## Plugin Packages

- `plugins/kpainter-openclaw`
  Preview OpenClaw `code-plugin` using the Public OpenAPI for catalog, create, list, detail, status, and edit tools. Source is prepared at `0.2.0`; latest verified ClawHub release remains separate until republished.
- `plugins/kpainter-openclaw-bundle`
  Preview OpenClaw `bundle-plugin` metadata pack for KPainter host-target distribution. Source is prepared at `0.2.0`; its ClawHub release remains separate until republished.

## Repository Layout

```text
assets/
  brand/
  screenshots/
docs/
  clawhub-plugin-publishing.md
  distribution-roadmap.md
  kpainter-mcp-mvp.md
  marketplace-asset-pack.md
plugins/
  README.md
  kpainter-openclaw/
    package.json
    openclaw.plugin.json
    src/index.js
  kpainter-openclaw-bundle/
    package.json
    openclaw.bundle.json
    dist/README.md
skills/
  kpainter/
    SKILL.md
```

## Product Links

- Homepage: `https://kpainter.ai/`
- Skills docs: `https://kpainter.ai/docs/skills`
- OpenAPI docs: `https://kpainter.ai/docs/openapi`
- API key: `https://kpainter.ai/api-key`

## Notes

- This repository is the canonical source for public skill content.
- The public site mirror at `https://kpainter.ai/skill.md` should be synced from `skills/kpainter/SKILL.md`, not edited separately.
- The current public OpenClaw / ClawHub slug is `kpainter`.
- Public metadata should stay English-first for broad marketplace compatibility.
- The skill supports the user's preferred language. Multilingual examples are examples, not a language allowlist.
- Public AI Video uses `ai_video` with model-specific `video_generation`; read the catalog before selecting Omni or Veo.

## Planning Docs

- Marketplace asset pack: `docs/marketplace-asset-pack.md`
- ClawHub plugin publishing guide: `docs/clawhub-plugin-publishing.md`
- Distribution roadmap: `docs/distribution-roadmap.md`
- MCP MVP spec: `docs/kpainter-mcp-mvp.md`
- Tencent SkillHub listing pack: `docs/tencent-skillhub-listing.md`
- Tencent SkillHub outreach template: `docs/tencent-skillhub-outreach.md`
