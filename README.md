# Originwise Skills

KPainter explains any topic with precision, turning PDFs, PPTs, web links, and other documents into precise, clearly structured explainer videos and interactive lessons, then bringing those workflows into agents and products through Skills, OpenAPI, and MCP.

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
  Turn PDFs, PPTs, web links, and other documents into precise, clearly structured explainer videos and interactive lessons, then monitor or refine the results.

## Current Positioning

- Hero message: `Explain any topic with precision`
- Core product promise: Turn PDFs, PPTs, web links, and other documents into precise, clearly structured explainer videos and interactive lessons.
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
  Preview OpenClaw runtime for KPainter's Public API: create precise, clearly structured explainer videos and interactive lessons, then monitor and refine the results. Version `0.3.0` exposes the seven current public product types and keeps strict Vector Animation routing.
- `plugins/kpainter-openclaw-bundle`
  Metadata-only OpenClaw bundle linking the KPainter Skill and code plugin for desktop and mobile hosts. Source is prepared at `0.2.0`; its ClawHub release remains separate until republished.

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
resources/
  source-to-video-templates/
    README.md
    sop-training-video-review-checklist.md
    source-to-video-handoff-sheet.md
    decision-point-storyboard.md
```

## Product Links

- Homepage: `https://kpainter.ai/`
- Skills docs: `https://kpainter.ai/docs/skills`
- OpenAPI docs: `https://kpainter.ai/docs/openapi`
- API key: `https://kpainter.ai/api-key`

## Reusable Resources

### Source-to-Video Templates

Copyable, source-led worksheets for training, operations, and technical-document explanations:

- [SOP-to-training-video review checklist](resources/source-to-video-templates/sop-training-video-review-checklist.md)
- [Source-to-video handoff sheet](resources/source-to-video-templates/source-to-video-handoff-sheet.md)
- [Decision-point storyboard](resources/source-to-video-templates/decision-point-storyboard.md)

These templates are the canonical organization-owned copy, released under [CC BY 4.0](resources/source-to-video-templates/LICENSE). They help teams preserve source ownership, decision points, review boundaries, and update triggers; they do not replace a controlled procedure or domain review.

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
