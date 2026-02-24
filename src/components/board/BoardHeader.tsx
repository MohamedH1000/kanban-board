'use client';

import { Search, Plus } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { setSearchQuery } from '@/store/tasksSlice';

interface BoardHeaderProps {
  onNewTask: () => void;
}

export default function BoardHeader({ onNewTask }: BoardHeaderProps) {
  const dispatch = useAppDispatch();
  const searchQuery = useAppSelector((state) => state.tasks.searchQuery);

  return (
    <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Project Board</h1>
        <p className="text-gray-500 text-sm mt-1">
          Track and manage your tasks
        </p>
      </div>

      <div className="flex gap-3 w-full sm:w-auto">
        <div className="relative flex-1 sm:flex-initial">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            placeholder="Search tasks..."
            className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <button
          onClick={onNewTask}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
        >
          <Plus size={18} />
          <span>New Task</span>
        </button>
      </div>
    </div>
  );
}
