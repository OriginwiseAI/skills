---
summary: "How to package and publish KPainter as OpenClaw plugins on ClawHub, including family constraints and VirusTotal pending behavior."
read_when:
  - Planning OpenClaw plugin publishing for KPainter
  - Deciding between code-plugin and bundle-plugin
  - Reviewing VirusTotal pending status after publish
---

# KPainter ClawHub Plugin Publishing

## What `Publish Plugin` means

ClawHub `Publish Plugin` is not another name for the existing `kpainter` skill.

It publishes an OpenClaw package in one of two families:

- `code-plugin`
- `bundle-plugin`

The existing `kpainter` listing remains a `skill`.

## Can KPainter publish both?

Yes, but not under one shared package name.

Practical rules:

- `kpainter` can keep existing as a `skill`
- KPainter can also publish a `code-plugin`
- KPainter can also publish a `bundle-plugin`
- one package name can belong to only one family
- once a package name is created as `code-plugin` or `bundle-plugin`, that family cannot be changed later

Recommended naming:

- `kpainter-openclaw`
- `kpainter-openclaw-bundle`

Do not try to publish the same package name once as `code-plugin` and again as `bundle-plugin`.

This repo now keeps matching draft scaffolds under:

- `plugins/kpainter-openclaw`
- `plugins/kpainter-openclaw-bundle`

## When to use each family

### `code-plugin`

Use this when the package executes code inside OpenClaw and exposes a real plugin runtime id.

Current ClawHub publish requirements:

- `package.json`
- `openclaw.plugin.json`
- `source repo`
- `source commit`

### `bundle-plugin`

Use this when the package is a bundle or metadata pack for one or more hosts and does not need the full code-plugin contract.

Current ClawHub publish requirements:

- `openclaw.bundle.json`, or
- explicit `hostTargets`

## Minimal `code-plugin` skeleton

```text
kpainter-openclaw/
  package.json
  openclaw.plugin.json
  src/
    index.js
  README.md
```

Example `package.json`:

```json
{
  "name": "kpainter-openclaw",
  "displayName": "KPainter OpenClaw",
  "version": "0.1.0",
  "repository": {
    "type": "git",
    "url": "https://github.com/OriginwiseAI/kpainter-openclaw.git"
  }
}
```

Example `openclaw.plugin.json`:

```json
{
  "id": "kpainter.openclaw",
  "name": "KPainter OpenClaw"
}
```

Example placeholder runtime file:

```js
export const kpainterPluginPlaceholder = true;
```

Example publish command:

```bash
clawhub package publish ./kpainter-openclaw \
  --family code-plugin \
  --name kpainter-openclaw \
  --display-name "KPainter OpenClaw" \
  --version 0.1.0 \
  --source-repo OriginwiseAI/kpainter-openclaw \
  --source-commit <git-sha> \
  --source-ref refs/tags/v0.1.0 \
  --changelog "Initial code-plugin release"
```

Notes:

- `code-plugin` versions must be valid semver
- ClawHub will reject the publish if `openclaw.plugin.json` is missing
- ClawHub will reject the publish if `source-repo` or `source-commit` is missing

## Minimal `bundle-plugin` skeleton

```text
kpainter-openclaw-bundle/
  package.json
  openclaw.bundle.json
  dist/
    plugin.wasm
  README.md
```

Example `package.json`:

```json
{
  "name": "kpainter-openclaw-bundle",
  "displayName": "KPainter OpenClaw Bundle",
  "version": "0.1.0",
  "openclaw": {
    "bundleFormat": "openclaw-bundle",
    "hostTargets": ["desktop", "mobile"]
  }
}
```

Example `openclaw.bundle.json`:

```json
{
  "id": "kpainter.bundle"
}
```

Example publish command:

```bash
clawhub package publish ./kpainter-openclaw-bundle \
  --family bundle-plugin \
  --name kpainter-openclaw-bundle \
  --display-name "KPainter OpenClaw Bundle" \
  --version 0.1.0 \
  --bundle-format openclaw-bundle \
  --host-targets desktop,mobile \
  --changelog "Initial bundle release"
```

Notes:

- bundle plugins do not need the code-plugin source repo requirement
- bundle plugins still need a clear host target story
- if `openclaw.bundle.json` is omitted, `--host-targets` is still required

## VirusTotal `Pending`

`VirusTotal Pending` is expected immediately after publish.

Observed ClawHub behavior:

- package releases are published first
- static scan runs immediately
- VirusTotal upload and polling continue asynchronously
- plugin releases stay private until security checks and verification complete

Implications:

- seeing `Pending` right after publish is normal
- it does not mean the package is malicious
- if a result stays pending for a long time, the more likely problem is queue lag or VT-side delay, not necessarily the package contents

## KPainter recommendation

The lowest-risk order for KPainter is:

1. Keep `kpainter` as the current public `skill`
2. Build a real `code-plugin` only when there is executable OpenClaw runtime behavior to ship
3. Publish a separate `bundle-plugin` only if KPainter needs host-specific bundle packaging

If KPainter only wants wider agent distribution first, do not rush the plugin track before the MCP track has a concrete runtime design.
