'use client';

import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Task, ColumnType } from '@/types';
import TaskCard from '../task/TaskCard';
import { COLUMN_TITLES, COLUMN_COLORS } from '@/lib/utils';

interface ColumnProps {
  id: ColumnType;
  tasks: Task[];
  onEditTask: (task: Task) => void;
}

export default function Column({ id, tasks, onEditTask }: ColumnProps) {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <div className={`
      flex-1 min-w-[280px] max-w-[320px]
      ${COLUMN_COLORS[id]} border-2 rounded-xl p-4
      flex flex-col h-full
    `}>
      <div className="mb-4">
        <h2 className="font-semibold text-gray-700 flex items-center gap-2">
          <span className="text-lg">{COLUMN_TITLES[id]}</span>
          <span className="bg-white/50 px-2 py-0.5 rounded-full text-xs font-medium">
            {tasks.length}
          </span>
        </h2>
      </div>

      <div ref={setNodeRef} className="flex-1 overflow-y-auto">
        <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} onEdit={onEditTask} />
          ))}
          {tasks.length === 0 && (
            <div className="text-center py-8 text-gray-400 text-sm">
              No tasks yet
            </div>
          )}
        </SortableContext>
      </div>
    </div>
  );
}
