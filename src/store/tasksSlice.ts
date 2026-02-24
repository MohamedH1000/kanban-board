import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task, ColumnType } from '@/types';

interface TasksState {
  searchQuery: string;
  draggedTask: Task | null;
}

const initialState: TasksState = {
  searchQuery: '',
  draggedTask: null,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setDraggedTask: (state, action: PayloadAction<Task | null>) => {
      state.draggedTask = action.payload;
    },
  },
});

export const { setSearchQuery, setDraggedTask } = tasksSlice.actions;
export default tasksSlice.reducer;
