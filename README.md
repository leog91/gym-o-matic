# gym-o-matic

A workout tracker for building and managing exercises and routines.

Built with [Next.js](https://nextjs.org/), [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS](https://tailwindcss.com/), [Better Auth](https://www.better-auth.com/), [Drizzle ORM](https://orm.drizzle.team/), and [Turso](https://turso.tech/).

## Features

- **User authentication** — email/password and Google OAuth via Better Auth.
- **Exercise library** — browse, add, edit, and search exercises.
- **Routine builder** — create multi-step routines with optional sets, reps, weights, rest, pyramid sets, supersets, and circuits.
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
| Package manager | Bun (default), npm fallback      |

## Prerequisites

- [Bun](https://bun.sh/) 1.3+
- Node.js 20+ only when using npm as a fallback
- A [Turso](https://turso.tech/) database
- Google OAuth credentials (for Google sign-in)

## Installation

```bash
# Clone the repository
git clone <repo-url>
cd gym-o-matic

# Install dependencies (default)
bun install

# npm fallback
npm install
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

## Running the app

Start the development server with Bun:

```bash
bun dev
```

Use `npm run dev` only when Bun is unavailable.

Open [http://localhost:3000](http://localhost:3000).

## Available scripts

| Script         | Description              |
| -------------- | ------------------------ |
| `bun dev`      | Start Next.js dev server |
| `bun run build`| Build for production     |
| `bun start`    | Start production server  |
| `bun run lint` | Run ESLint on application code |

The equivalent `npm run <script>` commands remain supported when needed.

## Project structure

```
gym-o-matic/
├── src/
│   ├── app/              # Next.js App Router pages
│   ├── components/       # React components
│   ├── db/               # Drizzle schema and migrations
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
