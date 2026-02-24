export type ColumnType = 'backlog' | 'in_progress' | 'review' | 'done';

export interface Task {
  id: number;
  title: string;
  description: string;
  column: ColumnType;
}

export interface TaskInput {
  title: string;
  description: string;
  column: ColumnType;
}
