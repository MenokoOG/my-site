# Lawrence Jefferson II — Personal Site

Professional portfolio and personal website. Built with **Next.js** (App Router), **TypeScript**, and **Tailwind CSS**.

## What’s included

- **About** — Bio, skills, location
- **Career journey** — Experience, education, certifications
- **Digital twin chat** — Ask career questions via OpenRouter (`mistralai/mistral-small-3.1-24b-instruct:free`) with automatic fallback to `openai/gpt-oss-120b:free` on free-tier throttling
- **Links** — LinkedIn, GitHub, personal site, portfolio (coming soon)

## Environment variables

Create or update `.env` in the project root:

```bash
OPENROUTER_API_KEY=your_openrouter_api_key
# Optional for OpenRouter request metadata
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command         | Description                  |
| --------------- | ---------------------------- |
| `npm run dev`   | Start dev server (Turbopack) |
| `npm run build` | Production build             |
| `npm run start` | Run production build         |
| `npm run lint`  | Run ESLint                   |

## Updating your links

- **GitHub:** Currently set to `https://github.com/MenokoOG`. Edit in `src/components/Links.tsx` and `src/components/Footer.tsx` if needed.
- **Other links:** Update the `LINKS` array in `src/components/Links.tsx` and the footer links in `src/components/Footer.tsx`.

## License

Private. All rights reserved.
