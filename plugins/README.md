# KPainter OpenClaw Packages

These folders are the canonical OpenClaw packages for KPainter's ClawHub distribution.

They are intentionally separate from the public `skills/` directory:

- `skills/` contains publishable `SKILL.md` skills
- `plugins/` contains package-based OpenClaw distributions

Current packages:

- `kpainter-openclaw`
  `code-plugin` runtime for the three-product KPainter OpenAPI tools
- `kpainter-openclaw-bundle`
  Agent Plugins `bundle-plugin` carrying the canonical KPainter Skill

These folders are intentionally separate from `skills/` so ClawHub package work
does not leak into the installable `SKILL.md` surface.

Publishing status:

1. `kpainter-openclaw@0.3.0` is the current ClawHub code-plugin release. Local source `1.0.0` uses the three-product KPainter OpenAPI contract and must pass its package checks before republishing.
2. `kpainter-openclaw-bundle@0.2.0` is the current ClawHub bundle-plugin release. Local source `0.3.0` migrates it to a portable Agent Plugins bundle with the canonical Skill.

Before publishing any plugin release:

1. Recheck package name, runtime id, and host targets.
2. Validate the package locally with `node --check` and `npm pack --dry-run`.
3. Use the ClawHub publishing notes in `../docs/clawhub-plugin-publishing.md`.
