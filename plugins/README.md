# KPainter OpenClaw Packages

These folders are the canonical OpenClaw packages for KPainter's ClawHub distribution.

They are intentionally separate from the public `skills/` directory:

- `skills/` contains publishable `SKILL.md` skills
- `plugins/` contains package-based OpenClaw distributions

Current packages:

- `kpainter-openclaw`
  Preview `code-plugin` runtime for KPainter Public API tools
- `kpainter-openclaw-bundle`
  Metadata-only `bundle-plugin` linking the Skill and code plugin for desktop and mobile hosts

These folders are intentionally separate from `skills/` so ClawHub package work
does not leak into the installable `SKILL.md` surface.

Publishing status:

1. `kpainter-openclaw@0.1.5` is the current ClawHub code-plugin release; local source `0.2.0` adds the Public OpenAPI contract and AI Video support.
2. `kpainter-openclaw-bundle@0.1.5` is the current ClawHub bundle-plugin release; local source `0.2.0` aligns the metadata-only package family with the updated Skill and code plugin.

Before publishing any plugin release:

1. Recheck package name, runtime id, and host targets.
2. Validate the package locally with `node --check` and `npm pack --dry-run`.
3. Use the ClawHub publishing notes in `../docs/clawhub-plugin-publishing.md`.
