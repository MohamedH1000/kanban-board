import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const COLUMN_TITLES: Record<string, string> = {
  backlog: 'Backlog',
  in_progress: 'In Progress',
  review: 'Review',
  done: 'Done'
};

export const COLUMN_COLORS: Record<string, string> = {
  backlog: 'bg-slate-100 border-slate-200',
  in_progress: 'bg-blue-50 border-blue-200',
  review: 'bg-amber-50 border-amber-200',
  done: 'bg-green-50 border-green-200'
};
