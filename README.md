# Originwise Skills

KPainter explains complex topics with videos, images, and interactive apps, then brings those workflows into agents and products through Skills, KPainter OpenAPI, and MCP.

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
  Create and refine Explainer Videos, AI Images, and AI Apps from natural-language requests and uploaded sources.

## Current Positioning

- Hero message: `Explain any topic with precision`
- Core product promise: Turn topics, PDFs, PPTs, webpages, and other sources into clear Explainer Videos, AI Images, and interactive AI Apps.
- Integration promise: Use one KPainter OpenAPI creations workflow through REST, MCP, or the KPainter Skill.

## Core Formats

- `Explainer Video`
  Create narrated courses, training, SOPs, research summaries, product education, and story-led explanations.
- `AI App`
  Turn knowledge into interactive demos, guided exploration, practice, quizzes, and hands-on learning experiences.
- `AI Image`
  Generate covers, posters, and visual summaries when one strong visual result is the fastest path. Latest image support now includes GPT-Image-2.

## Plugin Packages

- `plugins/kpainter-openclaw`
  OpenClaw runtime for the eight-tool KPainter MCP-compatible workflow. Version `1.0.0` exposes `video`, `image`, and `app`.
- `plugins/kpainter-openclaw-bundle`
  Portable Agent Plugins bundle carrying the canonical KPainter Skill. Source is prepared at `0.3.0`; its ClawHub release remains separate until republished.

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

## Related projects

- [KPainter source-to-video templates](https://github.com/OriginwiseAI/kpainter-source-to-video-templates) — copyable, CC BY 4.0 worksheets for training, operations, and technical-document explanations.
- [Awesome Technical Writing](https://github.com/OriginwiseAI/awesome-technical-writing) — a curated collection of technical-writing resources, maintained as its own project and attributed to its upstream source.

## Notes

- This repository is the canonical source for public skill content.
- The public site mirror at `https://kpainter.ai/skill.md` should be synced from `skills/kpainter/SKILL.md`, not edited separately.
- The current public OpenClaw / ClawHub slug is `kpainter`.
- Public metadata should stay English-first for broad marketplace compatibility.
- The skill supports the user's preferred language. Multilingual examples are examples, not a language allowlist.
- Public integrations use `video`, `image`, and `app` through `https://api.kpainter.ai/openapi/v1`.
- Treat PDFs, PPTs, webpages, and images as sources rather than product selectors.
- Picture-book video, standalone AI Video, AI Presentation, and Vector Animation are not currently exposed through KPainter OpenAPI and must not be silently remapped.

## Planning Docs

- Marketplace asset pack: `docs/marketplace-asset-pack.md`
- ClawHub plugin publishing guide: `docs/clawhub-plugin-publishing.md`
- Distribution roadmap: `docs/distribution-roadmap.md`
- MCP MVP spec: `docs/kpainter-mcp-mvp.md`
- Tencent SkillHub listing pack: `docs/tencent-skillhub-listing.md`
- Tencent SkillHub outreach template: `docs/tencent-skillhub-outreach.md`
