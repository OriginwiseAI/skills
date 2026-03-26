# KPainter OpenClaw Bundle

OpenClaw `bundle-plugin` package for KPainter.

## What it is

This package is a lightweight bundle-family metadata pack for KPainter's
OpenClaw distribution surface.

It does not execute code. Instead, it declares:

- bundle-family package identity separate from the `kpainter` skill and the `kpainter-openclaw` code plugin
- host targets for `desktop` and `mobile`
- a small bundle manifest describing what this package is meant to accompany

This is useful when a downstream host or marketplace flow wants a bundle-only
artifact line without overloading the code-plugin package name.

## Files

- `package.json`
- `openclaw.bundle.json`
- `dist/bundle-manifest.json`
- `dist/README.md`

## Current intent

This bundle currently acts as a distribution metadata pack that points to the
real KPainter surfaces:

- skill: `kpainter`
- code plugin: `kpainter-openclaw`
- homepage: `https://kpainter.ai/`

## Validation

Before publishing:

```bash
cd plugins/kpainter-openclaw-bundle
jq . package.json >/dev/null
jq . openclaw.bundle.json >/dev/null
jq . dist/bundle-manifest.json >/dev/null
npm pack --dry-run
```

## Suggested publish command

```bash
clawhub package publish ./plugins/kpainter-openclaw-bundle \
  --family bundle-plugin \
  --name kpainter-openclaw-bundle \
  --display-name "KPainter OpenClaw Bundle" \
  --version 0.1.0 \
  --bundle-format openclaw-bundle \
  --host-targets desktop,mobile \
  --changelog "Initial preview bundle-plugin release"
```

## Current caveats

- This package is intentionally bundle-only metadata, not a runnable plugin.
- If KPainter later needs host-specific assets or a concrete bundle binary layout, publish a new version that adds those artifacts under the same package name.
