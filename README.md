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

## Tech Stack

- **Framework**: Next.js 16
- **State Management**: Redux Toolkit
- **Data Fetching & Caching**: React Query
- **Drag & Drop**: @dnd-kit
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Mock API**: json-server

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository and navigate to the project:

```bash
cd kanban-board
```

2. Install dependencies:

```bash
npm install
```

3. Start the mock API server (in a separate terminal):

```bash
npm run mock-server
```

The API will be available at `http://localhost:4000`

4. Start the development server:

```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
src/
├── app/              # Next.js app directory
├── components/       # React components
│   ├── board/       # Board layout and header
│   ├── column/      # Column component
│   ├── modal/       # Task modal
│   └── task/        # Task card
├── hooks/           # Custom hooks
│   └── useTasks.ts  # React Query hooks
├── lib/             # Utility functions
├── store/           # Redux store
│   ├── tasksSlice.ts
│   └── hooks.ts
├── services/        # API services
│   └── api.ts
└── types/           # TypeScript types
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run mock-server` - Start json-server mock API
- `npm run lint` - Run ESLint

## How It Works

### State Management

- **Redux Toolkit** manages UI state (search query, dragged task)
- **React Query** handles server state (tasks) with automatic caching and refetching

### Data Flow

1. Tasks are fetched from the mock API via React Query
2. Search filters tasks in memory using Redux state
3. Drag and drop updates task column via React Query mutation
4. React Query automatically refetches and updates the cache

### Mock API

The project uses `json-server` with a local `server/db.json` file. You can modify the initial tasks by editing this file.

## Building for Production

```bash
npm run build
npm run start
```
