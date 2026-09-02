# Originwise Skills Repo Guide

## Scope

- This repository is the canonical source for all public KPainter / Originwise skills.
- Skill content should be maintained here first, then mirrored to other repos or websites only if needed.
- The current public website mirror target is `kgp-web/public/skill.md`.
- Repository-level planning docs for marketplace listings, distribution channels, and MCP rollout may live under `docs/`; keep agent-facing instructions in `skills/<name>/SKILL.md` and keep reusable listing assets under `assets/`.
- Chinese-first marketplace copy for Tencent SkillHub or similar domestic skill directories should live in `docs/tencent-skillhub-listing.md`; keep the shared cross-market copy in `docs/marketplace-asset-pack.md`.

## Naming

- The GitHub repository is `OriginwiseAI/skills`.
- The current public skill slug and `SKILL.md` frontmatter `name` are `kpainter`.
- Public website URLs, docs URLs, and API key URLs must continue to use `https://kpainter.ai/`.

## Publishing Rules

- Keep public marketplace-facing metadata English-first.
- Multilingual support should be described as support for the user's preferred language or any language. Do not imply a limited allowlist unless the product actually has one.
- Multilingual examples are allowed, but examples must not be framed as an exhaustive list of supported languages.
- Public `SKILL.md` examples should keep at least a small multilingual spread beyond English and Chinese when space allows; Japanese, Arabic, Spanish, Korean, and French are current examples, but still only as examples rather than a support boundary.
- The current public OpenClaw / ClawHub slug is `kpainter`; keep install docs aligned with `openclaw skills install kpainter`.
- While this repo contains only one public skill, README can use `npx skills add OriginwiseAI/skills` as the quick install command.
- Also include the explicit install form `npx skills add OriginwiseAI/skills --skill kpainter`.
- If the repo later contains multiple public skills, update README to distinguish:
  - default install behavior
  - explicit all install with `--all`
  - explicit single-skill install with `--skill <name>`

## Skill Structure

- Store installable skills under `skills/<skill-name>/SKILL.md`.
- Keep `SKILL.md` concise and agent-facing.
- Put repository-level human guidance in `README.md`, not inside the skill folder.
- Put marketplace copy, rollout plans, and channel checklists in `docs/`, not in the skill folder.
- Store public, copyable source-to-video worksheets under `resources/<resource-pack>/`; each pack needs its own attribution and license file, plus a README entry that identifies it as the canonical public copy.
- Draft ClawHub plugin package scaffolds may live under `plugins/<package-name>/`; keep them clearly separated from installable `skills/` content and document their publish commands in repo docs.

## Product Language

- The external brand is KPainter OpenAPI, with canonical base `/openapi/v1` and `video`, `image`, and `app` through one `creations` resource. Public Skills, MCP, OpenClaw, marketplace material, and website mirrors use `snake_case`, must not double the `/v1` prefix, and must not reintroduce project/proposal/job/quote/provider terms or retired type aliases.
- Preserve the canonical Skill's complete user-intent routing, natural-language trigger examples, attachment and URL behavior, asynchronous progress, refinement, recovery, multilingual, security, and success guidance when narrowing the product set. Do not replace the installable Skill or marketplace copy with a terse internal-contract summary; remove unavailable products while retaining the established user-facing structure and examples.

- The public agent catalog has exactly three products: `video`, `image`, and `app`.
- Every public write uses `/openapi/v1/creations`; input files are uploaded first and referenced by `file_id`.
- Explainer and training requests route to `video`. Picture-book video, standalone AI Video, AI Presentation, and vector animation are not currently public OpenAPI products and must not be silently mapped. Treat PDF/PPT/PPTX, webpages, and images as input sources rather than product selectors; only Video may claim URL Context support.
- MCP uses the unified capability/upload/create/list/get/message/action/output tool set; it has no public project, proposal, job, or production-confirmation workflow.
- Video creation and accepted edits automatically continue after planning when the quote fits the user's balance and budget ceiling. Only an advertised paused action requires further user authorization.

## Error Log
- 2026-09-01 KPainter OpenAPI supersedes the older public-product notes below: the current public set is only `video|image|app`, with no public AI Presentation, picture-book video, standalone AI Video, or legacy product aliases. OpenClaw keeps its installed `kpainter_*` tool names but mirrors the same `snake_case` schema and `/openapi/v1` base.
- 2026-09-02 ClawHub validates native manifests against current OpenClaw fields: declare tool ownership under `contracts.tools`, never a legacy top-level `tools`; every native code plugin must declare `package.json#openclaw.compat.pluginApi`. The local validator accepts an Agent Plugins bundle rooted at `plugin.json`, but the live bundle release endpoint currently also rejects a package without `openclaw.plugin.json`; retain the Agent Plugins content layout and add a compatibility manifest with an empty `contracts.tools` list, matching `openclaw.compat.pluginApi`, build, and config metadata in `package.json`. Publish a new semver version after either migration.
- 2026-07-19 网页更新发布必须使用 `name=<package>`，这样才会显示 Changelog；bundle 同时显式带 `family=bundle-plugin`，否则页面会默认成 Code plugin。发布前核对 Package type、版本、包内说明、Changelog 和源码 SHA。

- 2026-07-19 OpenClaw `--profile <name> plugins install <local-path>` may record the profile config while copying the extension into the default `~/.openclaw/extensions`, after which the profile reports a stale entry and cannot discover the plugin. For a genuinely isolated plugin load test, set both `OPENCLAW_STATE_DIR` and `OPENCLAW_CONFIG_PATH` to the same temporary test directory for install, inspect, and doctor. The expected local-path provenance warning is not a load failure; still verify status, version, config schema, and all seven tool names.

- 2026-07-19 `npm pack --dry-run --prefix <plugin-dir>` 在当前 npm 版本仍会从仓库根寻找 `package.json`，导致 `ENOENT`。验证 ClawHub 包时要把工作目录直接切到各插件目录后运行 `npm pack --dry-run`，并分别核对 tarball 文件清单、版本和 package family。

- 2026-08-29 AI Presentation 暂时从公开 Agent 目录、网站镜像和公开文档隐藏；保留实现与历史兼容，但不得宣传或路由新的 AI Presentation 请求。Knowledge Video 走 Scene Film project 链路，AI Image / AI App 走 creation 链路；更新后确保 `kgp-web/public/skill.md` 与 canonical `SKILL.md` 字节一致。
- 2026-08-20 `kpainter-openclaw@0.4.0` 已在隔离的 OpenClaw `2026.4.15` 状态目录完成安装和加载；host 识别全部 15 个工具且 doctor 无 KPainter 加载错误。局部路径 provenance warning 是预期提醒，不代表失败；付费 API canary 仍需单独授权。


- 2026-07-19 ClawHub 线上详情页确认 `kpainter-openclaw` 与 `kpainter-openclaw-bundle` 在发布 `0.2.0` 前的实际当前版本都是 `0.1.5`；仓库里写 `0.1.0` 的内容只能视为首发历史，不能继续当作当前市场版本。发布新版本前以详情页 `Current version` 为准，并用高于它的 semver。

- 2026-07-19 `kpainter-openclaw@0.2.0` 已在隔离的 OpenClaw `2026.4.15` 状态目录完成安装/加载检查，config schema 与 7 个工具全部被识别；`plugins doctor` 仅出现隔离本地路径缺少 provenance 的信任提醒，没有插件加载错误。该结果允许以 preview runtime 发布，但因未使用真实用户 API Key 跑付费生成，不能升级为 production-ready 声明。

- 2026-07-19 ClawHub 的 Skill、code-plugin 与 bundle-plugin 不能复用同一条七产品长列表说明。Skill 应沿用官网定位 `Explain any topic with precision`，具体写清 PDF、PPT、网页链接和其他文档到 `precise, clearly structured explainer videos and interactive lessons`，中文对应“表达精准、结构清晰的解说视频和互动课程”；code-plugin 必须明确是连接 Public API 的 preview runtime，且在 Public Files API 上线前不能宣称直接上传这些附件；bundle-plugin 必须明确是 metadata-only 的桌面/移动端分发关联包，不能暗示其执行生成。市场短说明、package/manifest description、README 首段和 bundle manifest summary 要同步。

- 2026-07-19 ClawHub 的已登录发布页需要通过浏览器上传整个 `skills/kpainter` 文件夹；若 Chrome 扩展未开启 “Allow access to file URLs”，无论传目录还是单个 `SKILL.md`，`fileChooser.setFiles` 都会返回 `Not allowed`。此时不要重复发布或改 Skill 包格式，应让用户在 `chrome://extensions` 的 ChatGPT Chrome Extension 详情中开启该权限，再回到同一发布页重试。GitHub Import 只显示已授权账号可见的仓库；组织仓库未授权时继续使用文件夹上传。

- 2026-07-19 Public AI Video is part of the Skill/OpenAPI contract. Keep one stable `ai_video` type and select `gemini-omni-flash`, `veo-3.1-fast`, or `veo-3.1-standard` through `video_generation`; do not create model-specific types. The public surface currently exposes text-to-video only, and Catalog must report first frame, last frame, and attachments as unavailable until a Public Files API exists. Only Omni supports `iterate`; never expose `previous_interaction_id`.

- 2026-07-18 Public Skill, plugin, bundle, marketplace, and website-mirror copy must use `AI PPT`, `AI Image`, and `AI App`. Standalone `AI Video` remains a main-site-only capability until the Public OpenAPI catalog exposes it; never imply that the Skill can create it.

- 2026-07-18 `kpainter@0.6.13` renames the page-by-page product to `Read Aloud Video / 绘本视频` while retaining `explainer_video` as its stable API enum. This supersedes `Knowledge Storybook / 知识绘本`; synchronize the canonical Skill, website mirror, docs, marketplace copy, plugin metadata, and catalog display name.

- 2026-07-18 `kpainter@0.6.12` introduced the now-superseded page-by-page label. The current `0.6.14` contract is `Explainer Video / 解说视频 -> knowledge_video` for continuous animated scenes and `Read Aloud Video / 绘本视频 -> explainer_video` for narrated page-by-page visuals. Never infer the product from the API identifier.

- 2026-07-18 `kpainter@0.6.11` 与 `0.6.12` 的旧称谓规则已由 `0.6.13` 覆盖；当前连续动态产品叫 Explainer Video，逐页图文产品叫 Read Aloud Video，仍不得使用“polished/stronger/better/more complete”等等级比较语言。
- 2026-07-18 两个视频产品仍是独立产品：公开 Skill/API 保持 `explainer_video -> static-video`、`knowledge_video -> unify-video` 的技术映射，但展示名按最新规则使用 Read Aloud Video 与 Explainer Video；不得恢复 Standard/Lite、Slide-based 或 `slides_video`。更新时同步 canonical Skill、网站镜像、市场文案和包版本。
- 2026-04-25 ClawHub / OpenClaw 的 skill、plugin、bundle summary 不只是“别把 `GPT-Image-2` 塞进功能并列列表里”，还要控制第一句整体长度；dashboard 卡片会很早截断。当前建议第一句使用 `KPainter creates explainer videos, read aloud videos, slides, images, and interactive lessons.`
- 2026-04-25 ClawHub / OpenClaw 这类公开 skill 与 plugin 展示面如果要把 `knowledge_video` 改成 `explainer_video`，不能只改网站镜像或单一文档；至少要同时更新 skill frontmatter `description`、`SKILL.md` 里的公开结果类型命名、code-plugin/bundle-plugin 的 package description，以及各自发布命令里的版本号，否则 dashboard 上三项会出现“skill 已改名、plugin 仍写 knowledge video、bundle 还是旧版本”的割裂状态。
- 2026-04-25 如果再把公开结果类型 `web_app` 改成 `interactive_lesson`，要和 `explainer_video` 一样把“正式枚举”和“自然语言触发词”分开处理：对外技术名统一写 `interactive_lesson`，但 skill 用户语料仍应兼容 `web app / learning app / interactive page` 这些旧说法，避免只改枚举后自然语言触发能力变差。
- `npx skills add <owner>/<repo>` depends on the remote repository being publicly cloneable. If the Git host returns `403` for anonymous clone, remote installation fails even when the repo exists.
- A repo with no valid `SKILL.md` returns `No valid skills found. Skills require a SKILL.md with name and description.`
- 2026-03-26 `kpainter` has been published to ClawHub under owner `bbgasj`; keep the slug stable and publish forward with new semver versions instead of creating a second public slug. The source prepared for the Explainer/Knowledge split is `0.6.10`.
- 2026-03-26 Tencent SkillHub has been identified as a domestic skill-style distribution surface adjacent to ClawHub, but a public self-serve submission flow has not yet been confirmed in this repo; keep a ready-to-submit Chinese listing pack and treat onboarding as potentially manual until proven otherwise.
- 2026-03-26 ClawHub skill listing summary is driven by the published `SKILL.md` payload, especially the frontmatter `description`, and may be visually followed by the opening paragraph. Treat those two fields as the canonical marketplace summary source; do not lead them with setup wording like account or API-key connection steps.
- 2026-03-26 ClawHub plugin packages are family-locked by package name: a name first published as `code-plugin` cannot later be republished as `bundle-plugin`, so KPainter should use separate package names for separate plugin families.
- 2026-03-26 ClawHub `VirusTotal Pending` is an asynchronous scan state, not an immediate malware verdict; plugin releases stay private until verification completes, while skill downloads may remain temporarily blocked until VT finishes.
- 2026-03-26 KPainter draft ClawHub plugin scaffolds now live under `plugins/kpainter-openclaw` and `plugins/kpainter-openclaw-bundle`; treat them as release skeletons only, not finished integrations.
- 2026-03-26 ClawHub code-plugin backend validation is stricter than the initial CLI form implies: besides `package.json`, `openclaw.plugin.json`, `source repo`, and `source commit`, the package metadata should also include `openclaw.extensions`, `openclaw.compat.pluginApi`, `openclaw.build.openclawVersion`, and a config schema.
- 2026-03-26 `plugins/kpainter-openclaw` is now a real preview runtime that calls KPainter account/catalog/create/status APIs. Until KPainter's public API auth surface is fully unified, keep the plugin sending both `Authorization: Bearer <key>` and `X-KGP-Api-Key: <key>` for compatibility.
- 2026-03-26 External OpenClaw plugins are currently a moving target upstream: recent regressions have hit `plugin-sdk` resolution and plugin-registered tools. Re-test `kpainter-openclaw` on the exact target OpenClaw version before broad public rollout, and avoid assuming a plugin that packs successfully will also load correctly at runtime.
- 2026-03-26 `kpainter-openclaw@0.1.0` has now been published to ClawHub under owner `bbgasj` as a `code-plugin` with runtime id `kpainter-openclaw`; the initial package scan/verification state is expected to show `pending` immediately after publish.
- 2026-03-26 `plugins/kpainter-openclaw-bundle` has been upgraded from pure scaffold to a real bundle-family metadata pack: it declares `openclaw-bundle` format, `desktop/mobile` host targets, and related KPainter package links, but it still does not execute code or ship host-specific binaries.
- 2026-03-26 `kpainter-openclaw-bundle@0.1.0` has now been published to ClawHub under owner `bbgasj` as a `bundle-plugin` with runtime id `kpainter-openclaw-bundle`; unlike the code-plugin release, its verification tier is currently structural because it is a metadata pack rather than source-linked executable code.
