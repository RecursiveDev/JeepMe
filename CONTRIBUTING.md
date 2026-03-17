# Contributing to JeepMe

Thanks for your interest in contributing to **JeepMe**.

This project is a Next.js + TypeScript web app for finding jeepney routes across Metro Cebu, Philippines.

## Code of Conduct

By participating, you agree to follow our [Code of Conduct](CODE_OF_CONDUCT.md).

## Quick links

- Live demo: https://recursivedev.github.io/JeepMe
- Issues: https://github.com/RecursiveDev/JeepMe/issues
- Agentic AI guidance: `AGENTS.md`

## Development setup

### Prerequisites

- Node.js 20+
- npm

### Install and run

```bash
npm install
npm run dev
```

Before opening a PR:

```bash
npm run lint
npm run build
```

If your changes affect GitHub Pages/static export:

```bash
npm run build:static
```

## Branching & PRs

### Branch naming

Use a short prefix:

- `docs/...` for documentation-only changes
- `scaffold/...` for repo structure and meta files
- `feat/...` for new features
- `fix/...` for bug fixes

Examples:

- `feat/add-route-filter`
- `fix/osrm-timeout-handling`
- `scaffold/update-actions-workflows`

### Commit messages

Conventional Commits are recommended:

- `feat: add route ranking by direction`
- `fix: handle missing geocoding results`
- `chore: update workflows`

> Note: Do **not** mention AI tools/agents in commit messages or add AI co-author lines.

### Pull request checklist

- [ ] Scope is focused and matches the PR title
- [ ] I ran `npm run lint`
- [ ] I ran `npm run build`
- [ ] If Pages/export behavior changed, I ran `npm run build:static`
- [ ] I avoided introducing new runtime dependencies (unless explicitly agreed)

## Reporting issues

Open an issue: https://github.com/RecursiveDev/JeepMe/issues

Please include:

- what you expected
- what happened
- steps to reproduce (if applicable)
- environment details (OS / browser / device)

## Security

Please read our [Security Policy](SECURITY.md).
