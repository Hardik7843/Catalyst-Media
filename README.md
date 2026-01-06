# Catalyst Media

A small, fast movie browser built with Next.js that uses The Movie Database (TMDB) API — with a mock-data fallback when an API key is not provided. It includes features like trending/popular lists, search, movie details, credits, similar movies, and pagination.

**Tech stack**

- Next.js
- React
- TypeScript
- Tailwind CSS

**Contents**

- `src/app` — application routes and pages
- `src/lib` — TMDB API client, mock data and helpers
- `src/components` — UI components (cards, grid, pagination, header, etc.)

**Quick links**

- Development server: `pnpm dev`
- Build: `pnpm build`
- Start (production): `pnpm start`

**Note on mock data**: If a TMDB API key is not configured, the app will automatically fall back to mock data for local development and demonstration. You can also enable mock mode explicitly via `NEXT_PUBLIC_USE_MOCK_DATA=true`.

**Prerequisites**

- Node.js 18+ (LTS recommended)
- `pnpm` (recommended package manager). Install with:

```bash
npm install -g pnpm
```

## Getting started (local)

1. Clone the repo and change into the project directory

```bash
git clone <repo-url>
cd Catalyst-Media
```

2. Install dependencies

```bash
pnpm install
```

3. Create environment variables

Copy or create a `.env.local` file in the project root and add your TMDB API key:

```env
# .env.local
TMDB_API_KEY=your_tmdb_api_key_here
TMDB_READ_ACCESS_TOKEN='access_token'
NEXT_PUBLIC_API_URL=http://localhost:3000
# Optional: force mock data (true/false)
NEXT_PUBLIC_USE_MOCK_DATA=false
```

If `TMDB_API_KEY` is missing or empty the app will use mock data automatically.

4. Run the development server

```bash
pnpm dev
```

Open http://localhost:3000 in your browser.

## Build & run (production)

```bash
pnpm build
pnpm start
```

## Linting

Run ESLint:

```bash
pnpm lint
```

## Project structure (high level)

- `src/app` — Next.js app routes and pages. API route wrappers are under `src/app/api/movies/*`.
- `src/lib/tmdb.ts` — TMDB client, image helpers and mock-data fallback.
- `src/lib/mock-data.ts` — local mock responses used when no API key is present.
- `src/components` — presentational and UI components used across pages.

## Environment variables reference

- `TMDB_API_KEY` — (required for real TMDB data) your TMDB API key.
- `TMDB_READ_ACCESS_TOKEN` — TMDB read access token for API authentication.
- `NEXT_PUBLIC_API_URL` — base URL for API endpoints (default: http://localhost:3000).
- `NEXT_PUBLIC_USE_MOCK_DATA` — optional; set to `true` to force mock data.

## Troubleshooting

- If you see mock data even with `TMDB_API_KEY` set, ensure the `.env.local` file is in the project root and restart the dev server.
- Check the terminal for warnings from `src/lib/tmdb.ts` — the app logs a warning when the API key is missing.

## Contributing

Contributions, bug reports and improvements are welcome. Open an issue or a pull request.

## License

This project does not include a license file. Add one if you intend to publish or open-source the project.

---

If you'd like, I can also add example `.env.local` templates, CI scripts, or a short contribution guide next.
