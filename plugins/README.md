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

1. `kpainter-openclaw` now contains a real minimal runtime and has been published to ClawHub as preview release `0.1.0`.
2. `kpainter-openclaw-bundle` is now a real bundle-family metadata pack and has been published to ClawHub as preview release `0.1.0`.

Before publishing any plugin release:

1. Recheck package name, runtime id, and host targets.
2. Validate the package locally with `node --check` and `npm pack --dry-run`.
3. Use the ClawHub publishing notes in `../docs/clawhub-plugin-publishing.md`.
