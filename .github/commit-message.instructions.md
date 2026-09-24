# Commit Message Rules

Always generate commit messages using Conventional Commits.

Do not output explanations, comments, or any text other than the commit message.

---

## Format

Header:
<type>(<scope>): <description>

Body:
<blank line>

<body>

---

## Allowed Types

- feat
- fix
- docs
- style
- refactor
- test
- chore
- ci
- perf
- build

Type selection priority:

feat > fix > perf > refactor > test > docs > build > ci > chore

Choose the highest-impact type that represents the primary purpose of the change.

---

## Mandatory Rules

- Use lowercase only (a-z).
- Use Portuguese language.
- Use imperative mood in the header (e.g., "adiciona", "corrige", "remove", "atualiza", "melhora", "implementa", "simplifica").
- Scope is always mandatory.
- Maximum 72 characters in the header whenever possible.
- Do not end the header with a period.
- Always separate header and body with a blank line.
- Always include a body.
- Do not use emojis.
- Do not use markdown formatting.
- Do not use bullet points in the body.
- The body must explain:
  1. why the change was necessary
  2. what business or technical problem is solved
  3. any important impact

Avoid implementation details.

Never generate:

feat: adiciona componente

Always generate:

feat(api): adiciona componente

---

## Allowed Characters

Only the following characters are allowed:

- lowercase letters (a-z)
- numbers (0-9)
- space
- colon (:)
- parentheses ()
- hyphen (-)
- hash (#)

---

## Scope Rules

Use the most specific scope possible.

Examples:

- auth
- api
- user
- payment
- notification
- database
- frontend
- backend
- infra

---

## Commit Cohesion Analysis

Before generating a commit message, analyze the changes:

- Ensure the commit represents a single logical responsibility.
- Ensure all modified files belong to the same purpose.

If multiple unrelated responsibilities are detected:

- Do NOT generate a final commit message immediately.
- Warn that the changes contain multiple responsibilities.
- Suggest how to split into smaller, atomic commits.
- Provide one proposed commit message per suggested split.

When multiple unrelated changes are detected, prefer splitting commits by:

- business feature
- bug fix
- refactor
- documentation
- tests
- infrastructure

---

### Examples of unrelated changes

- feature implementation + formatting changes
- bug fix + dependency updates
- refactor + new feature
- database migration + UI changes
- infrastructure change + business logic change

Only generate a commit message when the change is atomic.

---

## Breaking Changes

For incompatible changes, append:

BREAKING CHANGE: <description>

Example:

feat(api): altera contrato de resposta

padroniza respostas da api para suportar novas integracoes

BREAKING CHANGE: campo customer substituido por data

---

## Output Rules

- Output only the commit message.
- Do not add labels like "commit:", "suggestion:", or explanations outside the body.

---

## Good Examples

feat(auth): adiciona validacao de senha

adiciona validacao de senha para reforcar os criterios de autenticacao e reduzir tentativas de acesso com credenciais fracas

fix(api): corrige tratamento de erros no login

corrige respostas inconsistentes durante falhas de autenticacao para melhorar confiabilidade da api

refactor(core): simplifica logica de autenticacao

reduz complexidade do fluxo de autenticacao para facilitar manutencao e evolucao futura

---

## Forbidden Examples

feat: adiciona validacao de senha
Reason: scope is mandatory

Feat(Auth): adiciona validacao de senha
Reason: uppercase not allowed

feat(auth): adicionando validacao de senha
Reason: gerund form not allowed

feat(auth): adiciona validacao de senha.
Reason: header must not end with period

Forbidden descriptions:

- ajustes
- melhorias
- correcao
- atualizacoes
- mudancas diversas
- update
- fix bug
- wip
- temp

Descriptions must clearly communicate the purpose of the change.

---

## Issue Linking Rule

All commits MUST reference a GitHub Issue or Project card.

- Every commit must include at least one issue reference.
- Use format: #<issue-number>
- If the commit closes a task, use: closes #<issue-number>
- If multiple issues are affected, list all of them.

## Behavior

Before generating a commit message:

- Identify if a GitHub issue number is present in the branch name or diff context.
- If issue tracking is required by the repository and no issue number is available:
  - Ask for the issue number.
  - Otherwise generate the commit message without the issue reference.

## Examples

feat(auth): adiciona validacao de senha closes #42

fix(api): corrige erro no login #15

refactor(core): simplifica fluxo de autenticacao closes #8 #9

## Branch Rule

If no issue number is explicitly provided in the commit message context,
extract the issue number from the branch name.
