# Kanban Board

A modern task management application with drag-and-drop functionality, built with Next.js, Redux Toolkit, and React Query.

## Features

- 4-column Kanban board (Backlog, In Progress, Review, Done)
- Create, edit, and delete tasks
- Drag and drop tasks between columns
- Real-time search to filter tasks by title or description
- Data caching with React Query
- State management with Redux Toolkit
- Responsive design with Tailwind CSS
- **Works out of the box on Vercel (no backend needed!)**

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **State Management**: Redux Toolkit
- **Data Fetching & Caching**: React Query
- **Drag & Drop**: @dnd-kit
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **API**: Next.js API Routes (production) / json-server (development)

## Quick Start

### Option 1: Run Everything Together (Recommended)

```bash
npm install
npm run dev:all
```

This starts both the Next.js dev server (port 3000) and mock API (port 4000) simultaneously.

### Option 2: Development with API Routes

```bash
npm install
npm run dev
```

The app now has built-in API routes, so it works without json-server!

### Option 3: Run Separately

**Terminal 1 - Mock API:**
```bash
npm run mock-server
```

**Terminal 2 - Next.js:**
```bash
npm run dev
```

Then open `http://localhost:3000` in your browser.

## Deploy to Vercel

The easiest way to deploy:

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and click "Import Project"
3. Select your repository
4. Click "Deploy"

That's it! The app will work immediately with built-in API routes.

**Note:** The in-memory data store will reset when Vercel's serverless functions spin down. For persistent data in production, you'd need to connect a real database (PostgreSQL, MongoDB, etc.) or use a service like Supabase, PlanetScale, or Vercel Postgres.

## Project Structure

```
src/
├── app/
│   ├── api/           # Next.js API routes (for production)
│   │   └── tasks/     # Task CRUD endpoints
│   ├── layout.tsx     # Root layout with providers
│   └── page.tsx       # Home page
├── components/        # React components
│   ├── board/        # Board layout and header
│   ├── column/       # Column component
│   ├── modal/        # Task modal
│   └── task/         # Task card
├── hooks/            # Custom hooks
│   └── useTasks.ts   # React Query hooks
├── lib/              # Utility functions & data store
├── store/            # Redux store
│   ├── tasksSlice.ts
│   └── hooks.ts
├── services/         # API services
│   └── api.ts
└── types/            # TypeScript types
```

## Available Scripts

- `npm run dev` - Start development server (uses API routes)
- `npm run dev:all` - Start Next.js + json-server together
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run mock-server` - Start json-server only
- `npm run lint` - Run ESLint

## How It Works

### Architecture

**Development:**
- Uses `json-server` for a mock REST API at `http://localhost:4000`
- Or use built-in Next.js API routes at `/api/tasks`

**Production:**
- Uses Next.js API routes (serverless functions)
- Data stored in memory (resets on redeployment)

### State Management

- **Redux Toolkit** manages UI state (search query, dragged task)
- **React Query** handles server state (tasks) with automatic caching

### Data Flow

1. Tasks fetched from API via React Query
2. Search filters tasks in memory using Redux state
3. Drag and drop updates task column via React Query mutation
4. React Query automatically refetches and updates the cache

## Adding a Real Database (Optional)

For production, you can easily swap the in-memory store for a real database:

1. **Vercel Postgres** - Easiest if you're on Vercel
2. **Supabase** - Free tier, includes auth
3. **MongoDB Atlas** - Free tier available
4. **PlanetScale** - MySQL-compatible, free tier

Just update `src/lib/data.ts` to use your database client instead of the in-memory store.
