# Security Policy

JeepMe is early-stage software. Please treat the current codebase as **pre-release**.

## Supported versions

At this time there are no formal releases. Security fixes (when applicable) will be made on the default branch.

## Reporting a vulnerability

We handle security reports **within this repository**.

- Open an issue: https://github.com/RecursiveDev/JeepMe/issues
- **Do not include secrets** (API keys, tokens) or detailed exploit payloads in a public issue.
- If the issue is sensitive, open the issue with a minimal description and request a private follow-up.

### What to include

Please include:

- a clear description of the issue and potential impact
- steps to reproduce (high-level)
- affected component(s) (UI, routing engine, OSRM integration, etc.)
- any logs/screenshots that help explain the issue

## Security best practices

- Do not commit API keys, tokens, or secrets.
- Use `.env` files locally and keep them out of git.
- Prefer least-privilege credentials.
