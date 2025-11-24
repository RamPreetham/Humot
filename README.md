# AI Agentic Platform – Sample Site

This is a small full‑stack Next.js 14 project styled to match the futuristic AI Agentic screenshots you shared.

It includes:

- Hero, Services, About, and Contact pages.
- Individual page for each service.
- Cursor‑based glow lighting effect.
- Contact form that:
  - Stores submissions in a SQLite database via Prisma.
  - Sends an email using Nodemailer (configure SMTP in `.env`).
- Simple API routes to manage services and company updates.

## Getting Started

1. **Install dependencies**

```bash
npm install
```

2. **Create your `.env`**

Copy `.env.example` to `.env` and fill in values:

```bash
cp .env.example .env
```

For local dev you can leave SMTP details blank if you don&apos;t want email sending.

3. **Set up the database**

```bash
npx prisma migrate dev --name init
npm run seed
```

4. **Run the dev server**

```bash
npm run dev
```

Then open http://localhost:3000 in your browser.

## Project Structure

- `app/` – App router pages and API routes.
- `components/` – Reusable UI components (hero, cursor glow).
- `prisma/` – Prisma schema and seed script.
- `lib/prisma.ts` – Prisma client singleton.

You can replace the placeholder images referenced in `/public/images/*.jpg` with your own assets to match your brand.
