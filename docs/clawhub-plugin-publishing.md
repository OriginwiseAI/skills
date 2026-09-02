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

Current published state before the next release:

- `kpainter-openclaw@0.3.0` is live on ClawHub as a `code-plugin`
- `kpainter-openclaw-bundle@0.2.0` is live on ClawHub as a `bundle-plugin`
- the code plugin is a preview runtime with KPainter API tools
- the historical bundle release is a metadata-only host-target pack; the next bundle release uses the Agent Plugins content layout
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

Current KPainter runtime scope keeps the installed OpenClaw names stable:

- `kpainter_capabilities`
- `kpainter_upload_file`
- `kpainter_create`
- `kpainter_list`
- `kpainter_get`
- `kpainter_message`
- `kpainter_act`
- `kpainter_outputs`

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
- the code plugin calls `https://api.kpainter.ai/openapi/v1` and sends only `Authorization: Bearer <key>`

## Agent Plugins `bundle-plugin` skeleton

```text
kpainter-openclaw-bundle/
  package.json
  plugin.json
  skills/
    kpainter/
      SKILL.md
  README.md
```

Example `package.json`:

```json
{
  "name": "kpainter-openclaw-bundle",
  "displayName": "KPainter OpenClaw Bundle",
  "version": "0.3.0"
}
```

Example `plugin.json`:

```json
{
  "$schema": "https://agent-plugins.org/schemas/1.0.0/plugin.schema.json",
  "name": "kpainter-openclaw-bundle",
  "version": "0.3.0",
  "description": "Portable KPainter Skill bundle for Agent Plugins-compatible hosts."
}
```

Example publish command:

```bash
clawhub package publish ./kpainter-openclaw-bundle \
  --family bundle-plugin \
  --name kpainter-openclaw-bundle \
  --display-name "KPainter OpenClaw Bundle" \
  --version 0.3.0 \
  --bundle-format agent \
  --changelog "Migrate to a portable Agent Plugins bundle carrying the canonical KPainter Skill"
```

Notes:

- Agent Plugins bundles use root `plugin.json`; `openclaw.bundle.json` is not a current OpenClaw bundle contract
- do not add `openclaw.plugin.json` to this bundle: native OpenClaw manifests take precedence over bundle markers
- bundle plugins do not need a native runtime entrypoint when they contain recognized content such as `skills/`

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
3. Publish `kpainter-openclaw-bundle` as a portable Agent Plugins bundle that carries the canonical Skill
4. Keep a future code runtime in the separate `kpainter-openclaw` code-plugin package rather than creating a third package

Important current caution:

- external OpenClaw plugins are moving quickly, so keep KPainter releases labeled preview
- Historical `kpainter-openclaw@0.3.0` passed an isolated install/load check on OpenClaw `2026.4.15`; that seven-tool evidence does not validate the current eight-tool, three-product KPainter OpenAPI source, which requires a fresh isolated load check before publication
- this check did not use a real user API key for a paid end-to-end generation, so it is not yet a production-readiness claim
