# KPainter OpenClaw

Draft ClawHub `code-plugin` package for KPainter.

## Status

This is a scaffold only.

It exists to reserve a clean package layout and publishing contract for a future
OpenClaw runtime integration. The current `src/index.js` is a placeholder and
should be replaced before any real public plugin release.

## Files

- `package.json`
- `openclaw.plugin.json`
- `src/index.js`

## Suggested publish command

```bash
clawhub package publish ./plugins/kpainter-openclaw \
  --family code-plugin \
  --name kpainter-openclaw \
  --display-name "KPainter OpenClaw" \
  --version 0.1.0 \
  --source-repo OriginwiseAI/skills \
  --source-commit <git-sha> \
  --source-ref refs/heads/main \
  --source-path plugins/kpainter-openclaw \
  --changelog "Initial draft code-plugin release"
```

## TODO Before Publishing

- implement real OpenClaw plugin runtime behavior
- confirm the final plugin id
- confirm the release version
- review source repo and source path metadata
