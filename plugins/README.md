# KPainter ClawHub Plugin Drafts

These folders are draft OpenClaw plugin packages for ClawHub publishing.

They are intentionally separate from the public `skills/` directory:

- `skills/` contains publishable `SKILL.md` skills
- `plugins/` contains draft package-based plugin scaffolds

Current draft packages:

- `kpainter-openclaw`
  First real `code-plugin` preview for KPainter API tools
- `kpainter-openclaw-bundle`
  Draft `bundle-plugin`

These folders are intentionally separate from `skills/` so ClawHub package work
does not leak into the installable `SKILL.md` surface.

Publishing status:

1. `kpainter-openclaw` now contains a real minimal runtime and has been published to ClawHub as preview release `0.1.0`.
2. `kpainter-openclaw-bundle` is now a real bundle-family metadata pack and is ready for first preview publish.

Before publishing any plugin release:

1. Recheck package name, runtime id, and host targets.
2. Validate the package locally with `node --check` and `npm pack --dry-run`.
3. Use the ClawHub publishing notes in `../docs/clawhub-plugin-publishing.md`.
