# KPainter OpenClaw Bundle

Portable `bundle-plugin` that delivers the KPainter Skill in the Agent Plugins
standard layout.

## What it is

This package is a content bundle, not an in-process OpenClaw runtime. It ships
the canonical KPainter Skill so compatible hosts can load its instructions
without installing executable plugin code.

For the account-scoped eight-tool OpenClaw runtime, install the separate
`kpainter-openclaw` code plugin.

## Files

- `package.json`
- `plugin.json` — Agent Plugins manifest
- `skills/kpainter/SKILL.md` — canonical KPainter Skill

## Current intent

The bundle provides the KPainter Skill for Agent Plugins-compatible hosts. It
does not create, proxy, or execute KPainter requests by itself.

## Validation

Before publishing:

```bash
cd plugins/kpainter-openclaw-bundle
jq . package.json >/dev/null
jq . plugin.json >/dev/null
npm pack --dry-run
```

## Suggested publish command

```bash
clawhub package publish ./plugins/kpainter-openclaw-bundle \
  --family bundle-plugin \
  --name kpainter-openclaw-bundle \
  --display-name "KPainter OpenClaw Bundle" \
  --version 0.3.0 \
  --bundle-format agent \
  --changelog "Migrate to a portable Agent Plugins bundle carrying the canonical KPainter Skill"
```

## Current caveats

- This package intentionally contains no executable runtime code.
- Keep `skills/kpainter/SKILL.md` byte-identical to the canonical
  `../../skills/kpainter/SKILL.md` before publishing.
