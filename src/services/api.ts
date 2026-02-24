import axios from 'axios';
import { Task, TaskInput } from '@/types';

// Use Vercel API routes in production, json-server for local development
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL
  ? process.env.NEXT_PUBLIC_API_URL
  : typeof window === 'undefined'
    ? process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    : '';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const tasksApi = {
  getAll: () => api.get<Task[]>('/api/tasks'),

  getById: (id: number) => api.get<Task>(`/api/tasks/${id}`),

  create: (data: TaskInput) => api.post<Task>('/api/tasks', data),

  update: (id: number, data: Partial<Task>) => api.patch<Task>(`/api/tasks/${id}`, data),

  delete: (id: number) => api.delete(`/api/tasks/${id}`),
};

export default api;
