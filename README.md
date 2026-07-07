# gym-o-matic

A workout tracker for building and managing exercises and routines.

Built with [Next.js](https://nextjs.org/), [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS](https://tailwindcss.com/), [Better Auth](https://www.better-auth.com/), [Drizzle ORM](https://orm.drizzle.team/), and [Turso](https://turso.tech/).

## Features

- **User authentication** — email/password and Google OAuth via Better Auth.
- **Exercise library** — browse, add, edit, and search exercises.
- **Routine builder** — create multi-step routines and link exercises.
- **Favorites** — save routines to your personal list.
- **Public profiles** — view a user's shared routines at `/[username]`.
- **Dashboard** — manage your own exercises and routines.

## Tech stack

| Layer        | Technology                         |
| ------------ | ---------------------------------- |
| Framework    | Next.js 16 (App Router)            |
| UI           | React 19, Tailwind CSS 4           |
| Language     | TypeScript                         |
| Auth         | Better Auth                        |
| ORM          | Drizzle ORM                        |
| Database     | Turso (SQLite)                     |
| Validation   | Zod                                |
| Package mgrs | npm / Bun                          |

## Prerequisites

- Node.js 20+ or [Bun](https://bun.sh/)
- A [Turso](https://turso.tech/) database
- Google OAuth credentials (for Google sign-in)

## Installation

```bash
# Clone the repository
git clone <repo-url>
cd gym-o-matic

# Install dependencies
npm install
# or
bun install
```

## Environment variables

Create a `.env` file in the project root and add the following:

```env
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=your-secret-key

GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

ADMIN_EMAIL=your-admin-email

TURSO_DATABASE_URL=libsql://your-database.turso.io
TURSO_AUTH_TOKEN=your-turso-auth-token
```

> `.env` is already ignored by Git. Do not commit secrets to version control.

## Database setup

Push the schema to your Turso database:

```bash
npx drizzle-kit push
```

Migrations are written to `src/db/migrations`.

### Seed sample data

The repo includes seed data for exercises and routines:

```bash
npx tsx scripts/seed-data.ts
```

## Running the app

Start the development server:

```bash
npm run dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available scripts

| Script         | Description              |
| -------------- | ------------------------ |
| `npm run dev`  | Start Next.js dev server |
| `npm run build`| Build for production     |
| `npm run start`| Start production server  |
| `npm run lint` | Run ESLint               |

## Project structure

```
gym-o-matic/
├── src/
│   ├── app/              # Next.js App Router pages
│   ├── components/       # React components
│   ├── db/               # Drizzle schema and migrations
│   ├── data/             # Seed data
│   ├── lib/              # Utility functions
│   ├── auth.ts           # Better Auth configuration
│   └── db.ts             # Database client
├── scripts/              # Seed and helper scripts
├── drizzle.config.ts     # Drizzle Kit configuration
└── next.config.js        # Next.js configuration
```

## Authentication

Authentication is handled by [Better Auth](https://www.better-auth.com/).

- **Email/password** is enabled out of the box.
- **Google OAuth** requires valid `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`.

Make sure `BETTER_AUTH_URL` matches the public URL of your deployment.

## Deployment

Deploy to any platform that supports Next.js (Vercel, Node server, Docker, etc.).

Before deploying, ensure all environment variables from `.env` are set in your hosting environment and that `BETTER_AUTH_URL` points to your production domain.

## License

[MIT](LICENSE)
