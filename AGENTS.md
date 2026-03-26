# Originwise Skills Repo Guide

## Scope

- This repository is the canonical source for all public KPainter / Originwise skills.
- Skill content should be maintained here first, then mirrored to other repos or websites only if needed.

## Naming

- The GitHub repository is `OriginwiseAI/skills`.
- The current public skill slug and `SKILL.md` frontmatter `name` are `kpainter`.
- Public website URLs, docs URLs, and API key URLs must continue to use `https://kpainter.ai/`.

## Publishing Rules

- Keep public marketplace-facing metadata English-first.
- Multilingual support should be described as support for the user's preferred language or any language. Do not imply a limited allowlist unless the product actually has one.
- Multilingual examples are allowed, but examples must not be framed as an exhaustive list of supported languages.
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

## Product Language

- KPainter creates `Knowledge Video`, `Knowledge Video (Slides)`, `Vector Animation`, `Slides`, `Image`, and `Web App`.
- Bare `video` is too broad; the skill should ask one short follow-up when the user does not clarify `Knowledge Video`, `Knowledge Video (Slides)`, or `Vector Animation`.
- Use current external type names when technical names are required: `knowledge_video`, `slides_video`, `vector_animation`, `slide_deck`, `image`, `web_app`.

## Error Log

- `npx skills add <owner>/<repo>` depends on the remote repository being publicly cloneable. If the Git host returns `403` for anonymous clone, remote installation fails even when the repo exists.
- A repo with no valid `SKILL.md` returns `No valid skills found. Skills require a SKILL.md with name and description.`
