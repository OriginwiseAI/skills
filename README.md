# Originwise Skills

KPainter helps users explain any topic with Explainer Videos, Knowledge Videos, Vector Animations, Slides, Images, and Interactive Lessons, then bring those workflows into agents and products through Skills, OpenAPI, and MCP.

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
  Create controllable Explainer Videos, Knowledge Videos, Vector Animations, Slides, Images, and Interactive Lessons.

## Current Positioning

- Hero message: `Create explainer videos, knowledge videos, slides, images, and interactive lessons`
- Core product promise: Turn topics, lessons, and documents into structured learning content.
- Integration promise: Browse Skills, OpenAPI, and MCP docs to bring explainer videos, knowledge videos, slides, images, and interactive lessons into your agent or product.

## Core Formats

- `Explainer Video`
  Use narrated visuals, captions, and step-by-step structure for courses, training, science, and longer topics.
- `Knowledge Video`
  Turn one topic into a polished, dynamic, story-led knowledge piece with stronger watchability and sharing value.
- `Slides`
  Organize content into presentation-ready slides for courseware, training, webinars, proposals, and page-by-page editing.
- `Interactive Lessons`
  Turn knowledge into interactive demos, guided exploration, practice, quizzes, and hands-on learning experiences.
- `Image`
  Generate covers, posters, and visual summaries when one strong visual result is the fastest path. Latest image support now includes GPT-Image-2.

## Plugin Packages

- `plugins/kpainter-openclaw`
  Preview OpenClaw `code-plugin` with KPainter catalog, account, create, list, detail, and status tools. Source is prepared at `0.1.6`; latest ClawHub release is `0.1.5`.
- `plugins/kpainter-openclaw-bundle`
  Preview OpenClaw `bundle-plugin` metadata pack for KPainter host-target distribution. Source is prepared at `0.1.6`; latest ClawHub release is `0.1.5`.

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

## Planning Docs

- Marketplace asset pack: `docs/marketplace-asset-pack.md`
- ClawHub plugin publishing guide: `docs/clawhub-plugin-publishing.md`
- Distribution roadmap: `docs/distribution-roadmap.md`
- MCP MVP spec: `docs/kpainter-mcp-mvp.md`
- Tencent SkillHub listing pack: `docs/tencent-skillhub-listing.md`
- Tencent SkillHub outreach template: `docs/tencent-skillhub-outreach.md`
