# AGENTS.md

Guidance for **agentic AI** (and humans using AI assistants) contributing to **JeepMe**.

> Scope note: Keep diffs minimal and scoped. Avoid introducing new runtime dependencies unless explicitly requested.

---

## 1) What this repo is

JeepMe is a **Next.js web application** for finding jeepney routes across **Metro Cebu, Philippines**.

Core capabilities:
- Interactive map UI (pin origin/destination)
- Route matching based on proximity
- Fare estimation
- Route drawing with OSRM street snapping
- Geocoding/search via Nominatim (OpenStreetMap)

---

## 2) Source of truth (do not guess)

JeepMe intentionally keeps most domain logic in `src/lib/`. When making changes, verify behavior by reading the relevant code/data first.

Primary references:
- UI entry: `src/app/page.tsx`
- Route catalog page: `src/app/routes/page.tsx`
- Route matching engine: `src/lib/route-service.ts`
- Route dataset: `src/lib/routes-data.ts`
- Geocoding (Nominatim): `src/lib/geocoding-service.ts`
- OSRM snapping: `src/lib/osrm-service.ts`
- Geo helpers: `src/lib/geo-utils.ts`

If a claim isn’t supported by the codebase (or an official upstream doc for OSRM/Nominatim), treat it as **unknown**.

---

## 3) Repo layout

```text
C:/Repository/JeepMe/
├── src/                      # Application source
│   ├── app/                  # Next.js routes/layouts
│   ├── components/           # UI components
│   └── lib/                  # Domain logic + route data
├── public/                   # Static assets
├── .github/workflows/         # CI + GitHub Pages
└── README.md                 # Primary project overview
```

---

## 4) Contribution rules for AI agents

### 4.1 Do / Don't

**Do:**
- Read the relevant source files before changing behavior.
- Keep edits strictly within the requested scope.
- Prefer small, reviewable changes.
- Update related docs *in-place* (README/CONTRIBUTING/etc.) when you change behavior.

**Don't:**
- Do not introduce new runtime dependencies unless explicitly requested.
- Do not move files/directories as a "cleanup" unless asked.
- Do not add tests unless explicitly requested.

### 4.2 Verification

After meaningful code or config changes:

- Run `npm run lint`
- Run `npm run build`

If the change affects GitHub Pages/static export:

- Run `npm run build:static` and confirm `out/` is generated

### 4.3 Commit message guidelines

Do **not** mention AI tools/agents in commit messages.

- No references to tools like "Claude", "Cursor", "Copilot", etc.
- No co-authored-by lines referencing AI assistants.

Prefer Conventional Commits:
- `docs: ...`
- `chore: ...`
- `feat: ...`
- `fix: ...`
