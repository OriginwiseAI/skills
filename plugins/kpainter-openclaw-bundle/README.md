# KPainter OpenClaw Bundle

Draft ClawHub `bundle-plugin` package for KPainter.

## Status

This is a scaffold only.

It exists to define a separate bundle package name, host target shape, and
publish command. The `dist/` folder currently contains placeholder notes and
should be replaced with real bundle artifacts before any real public release.

## Files

- `package.json`
- `openclaw.bundle.json`
- `dist/README.md`

## Suggested publish command

```bash
clawhub package publish ./plugins/kpainter-openclaw-bundle \
  --family bundle-plugin \
  --name kpainter-openclaw-bundle \
  --display-name "KPainter OpenClaw Bundle" \
  --version 0.1.0 \
  --bundle-format openclaw-bundle \
  --host-targets desktop,mobile \
  --changelog "Initial draft bundle-plugin release"
```

## TODO Before Publishing

- replace placeholder bundle files with real artifacts
- confirm the final bundle id
- confirm supported host targets
- confirm the release version
