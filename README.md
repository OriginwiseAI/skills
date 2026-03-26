# Originwise Skills

Public skills for KPainter and future Originwise agent integrations.

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
  Turn one prompt into controllable knowledge videos, slides, images, and web apps with KPainter.

## Plugin Packages

- `plugins/kpainter-openclaw`
  Preview OpenClaw `code-plugin` with KPainter catalog, account, create, list, detail, and status tools.
- `plugins/kpainter-openclaw-bundle`
  Draft OpenClaw `bundle-plugin` scaffold, not published as a real bundle yet.

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
