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

Current published state:

- `kpainter-openclaw@0.1.0` has been accepted by ClawHub as a `code-plugin`
- the first release is currently a preview runtime with KPainter API tools
- initial security/verification scan state may remain `pending` right after publish

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
  "type": "module",
  "openclaw": {
    "extensions": ["./src/index.js"],
    "compat": {
      "pluginApi": "^1.2.0"
    },
    "build": {
      "openclawVersion": "2026.3.22"
    },
    "configSchema": {
      "type": "object"
    }
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/OriginwiseAI/skills.git",
    "directory": "plugins/kpainter-openclaw"
  }
}
```

Example `openclaw.plugin.json`:

```json
{
  "id": "kpainter-openclaw",
  "name": "KPainter OpenClaw",
  "configSchema": {
    "type": "object"
  }
}
```

Minimum publish metadata now needed in practice:

- `openclaw.extensions`
- `openclaw.compat.pluginApi`
- `openclaw.build.openclawVersion`
- config schema metadata

Current KPainter runtime scope:

- `kpainter_get_create_catalog`
- `kpainter_get_me`
- `kpainter_get_credit_balance`
- `kpainter_create_knowledge`
- `kpainter_list_knowledge`
- `kpainter_get_knowledge`
- `kpainter_get_job_status`
- `kpainter_get_knowledge_status`

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
- ClawHub backend now also extracts `openclaw.extensions`, compatibility metadata, build metadata, and config schema from the package payload
- for KPainter, send both `Authorization: Bearer <key>` and `X-KGP-Api-Key: <key>` until the public API auth surface is fully unified

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
2. Publish `kpainter-openclaw` as a preview `code-plugin` only after validating it on the target OpenClaw version
3. Publish a separate `bundle-plugin` only if KPainter needs host-specific bundle packaging or bundle-only distribution
4. Keep `kpainter-openclaw-bundle` as a scaffold until there is a real bundle artifact or host-target story

Important current caution:

- external OpenClaw plugins are moving quickly right now
- recent upstream regressions have affected `plugin-sdk` resolution and plugin-registered tools
- treat the first KPainter plugin releases as preview-quality until runtime verification passes on a clean OpenClaw install
