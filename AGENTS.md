# Originwise Skills Repo Guide

## Scope

- This repository is the canonical source for all public KPainter / Originwise skills.
- Skill content should be maintained here first, then mirrored to other repos or websites only if needed.
- The current public website mirror target is `kgp-web/public/skill.md`.
- Repository-level planning docs for marketplace listings, distribution channels, and MCP rollout may live under `docs/`; keep agent-facing instructions in `skills/<name>/SKILL.md` and keep reusable listing assets under `assets/`.
- Chinese-first marketplace copy for Tencent SkillHub or similar domestic skill directories should live in `docs/tencent-skillhub-listing.md`; keep the shared cross-market copy in `docs/marketplace-asset-pack.md`.

## Naming

- The GitHub repository is `OriginwiseAI/skills`.
- The current public skill slug and `SKILL.md` frontmatter `name` are `kpainter`.
- Public website URLs, docs URLs, and API key URLs must continue to use `https://kpainter.ai/`.

## Publishing Rules

- Keep public marketplace-facing metadata English-first.
- Multilingual support should be described as support for the user's preferred language or any language. Do not imply a limited allowlist unless the product actually has one.
- Multilingual examples are allowed, but examples must not be framed as an exhaustive list of supported languages.
- Public `SKILL.md` examples should keep at least a small multilingual spread beyond English and Chinese when space allows; Japanese, Arabic, Spanish, Korean, and French are current examples, but still only as examples rather than a support boundary.
- The current public OpenClaw / ClawHub slug is `kpainter`; keep install docs aligned with `openclaw skills install kpainter`.
- While this repo contains only one public skill, README can use `npx skills add OriginwiseAI/skills` as the quick install command.
- Also include the explicit install form `npx skills add OriginwiseAI/skills --skill kpainter`.
- If the repo later contains multiple public skills, update README to distinguish:
  - default install behavior
  - explicit all install with `--all`
  - explicit single-skill install with `--skill <name>`

## Skill Structure

- Store installable skills under `skills/<skill-name>/SKILL.md`.
- Keep `SKILL.md` concise and agent-facing.
- Put repository-level human guidance in `README.md`, not inside the skill folder.
- Put marketplace copy, rollout plans, and channel checklists in `docs/`, not in the skill folder.
- Draft ClawHub plugin package scaffolds may live under `plugins/<package-name>/`; keep them clearly separated from installable `skills/` content and document their publish commands in repo docs.

## Product Language

- KPainter creates `Knowledge Video`, `Knowledge Video (Slides)`, `Vector Animation`, `Slides`, `Image`, and `Web App`.
- Bare `video` is too broad; the skill should ask one short follow-up when the user does not clarify `Knowledge Video`, `Knowledge Video (Slides)`, or `Vector Animation`.
- Use current external type names when technical names are required: `knowledge_video`, `slides_video`, `vector_animation`, `slide_deck`, `image`, `web_app`.

## Error Log

- `npx skills add <owner>/<repo>` depends on the remote repository being publicly cloneable. If the Git host returns `403` for anonymous clone, remote installation fails even when the repo exists.
- A repo with no valid `SKILL.md` returns `No valid skills found. Skills require a SKILL.md with name and description.`
- 2026-03-26 `kpainter` has been published to ClawHub under owner `bbgasj`; keep the slug stable and publish forward with new semver versions (currently `0.6.3`) instead of creating a second public slug unless there is a deliberate migration plan.
- 2026-03-26 Tencent SkillHub has been identified as a domestic skill-style distribution surface adjacent to ClawHub, but a public self-serve submission flow has not yet been confirmed in this repo; keep a ready-to-submit Chinese listing pack and treat onboarding as potentially manual until proven otherwise.
- 2026-03-26 ClawHub skill listing summary is driven by the published `SKILL.md` payload, especially the frontmatter `description`, and may be visually followed by the opening paragraph. Treat those two fields as the canonical marketplace summary source; do not lead them with setup wording like account or API-key connection steps.
- 2026-03-26 ClawHub plugin packages are family-locked by package name: a name first published as `code-plugin` cannot later be republished as `bundle-plugin`, so KPainter should use separate package names for separate plugin families.
- 2026-03-26 ClawHub `VirusTotal Pending` is an asynchronous scan state, not an immediate malware verdict; plugin releases stay private until verification completes, while skill downloads may remain temporarily blocked until VT finishes.
- 2026-03-26 KPainter draft ClawHub plugin scaffolds now live under `plugins/kpainter-openclaw` and `plugins/kpainter-openclaw-bundle`; treat them as release skeletons only, not finished integrations.
- 2026-03-26 ClawHub code-plugin backend validation is stricter than the initial CLI form implies: besides `package.json`, `openclaw.plugin.json`, `source repo`, and `source commit`, the package metadata should also include `openclaw.extensions`, `openclaw.compat.pluginApi`, `openclaw.build.openclawVersion`, and a config schema.
- 2026-03-26 `plugins/kpainter-openclaw` is now a real preview runtime that calls KPainter account/catalog/create/status APIs. Until KPainter's public API auth surface is fully unified, keep the plugin sending both `Authorization: Bearer <key>` and `X-KGP-Api-Key: <key>` for compatibility.
- 2026-03-26 External OpenClaw plugins are currently a moving target upstream: recent regressions have hit `plugin-sdk` resolution and plugin-registered tools. Re-test `kpainter-openclaw` on the exact target OpenClaw version before broad public rollout, and avoid assuming a plugin that packs successfully will also load correctly at runtime.
- 2026-03-26 `kpainter-openclaw@0.1.0` has now been published to ClawHub under owner `bbgasj` as a `code-plugin` with runtime id `kpainter-openclaw`; the initial package scan/verification state is expected to show `pending` immediately after publish.
- 2026-03-26 `plugins/kpainter-openclaw-bundle` has been upgraded from pure scaffold to a real bundle-family metadata pack: it declares `openclaw-bundle` format, `desktop/mobile` host targets, and related KPainter package links, but it still does not execute code or ship host-specific binaries.
