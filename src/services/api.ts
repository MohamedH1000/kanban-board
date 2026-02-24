import axios from 'axios';
import { Task, TaskInput } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const tasksApi = {
  getAll: () => api.get<Task[]>('/tasks'),

  getById: (id: number) => api.get<Task>(`/tasks/${id}`),

  create: (data: TaskInput) => api.post<Task>('/tasks', data),

  update: (id: number, data: Partial<Task>) => api.patch<Task>(`/tasks/${id}`, data),

  delete: (id: number) => api.delete(`/tasks/${id}`),
};

export default api;
