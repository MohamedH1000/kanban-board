// Simple in-memory data store
// In production, you'd use a real database like PostgreSQL, MongoDB, etc.

export interface Task {
  id: number;
  title: string;
  description: string;
  column: 'backlog' | 'in_progress' | 'review' | 'done';
}

const initialTasks: Task[] = [
  { id: 1, title: 'Setup project structure', description: 'Initialize Next.js with required dependencies', column: 'done' },
  { id: 2, title: 'Design homepage layout', description: 'Include hero section and navigation', column: 'backlog' },
  { id: 3, title: 'Implement authentication', description: 'Add login and register functionality', column: 'in_progress' },
  { id: 4, title: 'Code review for API', description: 'Review REST endpoints and add tests', column: 'review' },
  { id: 5, title: 'Write unit tests', description: 'Add tests for components and hooks', column: 'backlog' },
  { id: 6, title: 'Deploy to staging', description: 'Setup CI/CD pipeline', column: 'backlog' },
  { id: 7, title: 'Fix responsive issues', description: 'Mobile layout needs adjustment', column: 'in_progress' },
  { id: 8, title: 'Update documentation', description: 'Add API docs and README', column: 'review' },
];

let tasks = [...initialTasks];
let nextId = 9;

export const dataStore = {
  getAll: () => tasks,

  getById: (id: number) => tasks.find(t => t.id === id),

  create: (task: Omit<Task, 'id'>) => {
    const newTask = { ...task, id: nextId++ };
    tasks.push(newTask);
    return newTask;
  },

  update: (id: number, updates: Partial<Task>) => {
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) return null;
    tasks[index] = { ...tasks[index], ...updates };
    return tasks[index];
  },

  delete: (id: number) => {
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) return false;
    tasks.splice(index, 1);
    return true;
  },

  reset: () => {
    tasks = [...initialTasks];
    nextId = 9;
  }
};
