# KPainter Distribution Roadmap

Last updated: 2026-03-26

## Current State

- Canonical public skill repo: `OriginwiseAI/skills`
- Public skill slug: `kpainter`
- Public site mirror: `https://kpainter.ai/skill.md`
- ClawHub release: `kpainter@0.6.1`
- Repo-based install path: `npx skills add OriginwiseAI/skills`

## Asset Types

### Skill

Best for ecosystems that read `SKILL.md` directly or index repository-based skills.

### MCP Server

Best for ecosystems that discover tools through MCP registries and MCP-compatible clients.

### Platform Plugin

Best for Dify, Coze, Tencent ADP plugin ecosystems, and other proprietary app stores.

### Agent / Store App

Best for GPT Store, Microsoft 365 Agent Store, and other channel-specific storefronts that require a separately packaged assistant product.

## Channel Priority

### P0: Freeze Identity And Listing Materials

- Keep `kpainter` as the skill slug.
- Keep `kpainter.ai` as the public domain.
- Keep public type naming aligned to `knowledge_video / slides_video / vector_animation`.
- Finish the marketplace asset pack in `docs/marketplace-asset-pack.md`.

### P1: Finish The Skill Track

- `ClawHub / OpenClaw`
  Status: live
- `skills.sh`
  Status: live through repo install
- `Tencent SkillHub`
  Status: target now
  Notes: this is the closest domestic market to the current `SKILL.md` asset, so it should be treated as a skill-distribution task rather than an MCP task

### P1: Start The MCP Track

- Create `kpainter-mcp` as a separate repo or service
- First release targets:
  - Official MCP Registry
  - Smithery
  - Tencent Cloud ADP / MCP plugin surfaces

### P2: Platform Plugin Adaptations

- Dify plugin
- Coze plugin / agent packaging

These are worth doing, but they require platform-specific manifests, auth handling, and review processes.

### P3: Channel Products

- GPT Store
- Microsoft 365 Agent Store
- GitHub Copilot CLI marketplace

Do not start these in parallel with the MCP build unless KPainter decides to fund standalone channel products.

## Recommended Execution Order

1. Freeze current skill naming and type naming.
2. Finish marketplace listing assets.
3. Push `kpainter` into Tencent SkillHub if submission or curation access is available.
4. Build `kpainter-mcp` MVP.
5. Publish MCP to the Official MCP Registry and Smithery.
6. Package Tencent Cloud ADP plugin variants.
7. Only then branch into Dify and Coze.

## Open Questions

- Does Tencent SkillHub provide self-serve submission, or does it require curation / manual onboarding?
- Should Tencent domestic listing materials use `KPainter` only, or `KPainter / 知识画家` together?
- Should the first Tencent ADP listing use OpenAPI plugin mode first, MCP plugin mode first, or both?

## Manual Work Likely Needed

- Tencent account or contact path for SkillHub submission if public self-serve onboarding is not exposed
- Final marketplace visuals
- Decision on whether to open a dedicated public repo for `kpainter-mcp`
