'use client';

import { useDraggable } from '@dnd-kit/core';
import { Task } from '@/types';
import { Trash2, Edit } from 'lucide-react';
import { useDeleteTask } from '@/hooks/useTasks';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
}

export default function TaskCard({ task, onEdit }: TaskCardProps) {
  // Setup drag and drop for the task card
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: task.id,
    data: task,
  });

  const { mutate: deleteTask } = useDeleteTask();

  // Apply transform during drag
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this task?')) {
      deleteTask(task.id);
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`
        bg-white p-4 rounded-lg shadow-sm border border-gray-200
        cursor-grab active:cursor-grabbing mb-3 transition-all
        ${isDragging ? 'opacity-50 shadow-lg rotate-2' : 'hover:shadow-md'}
      `}
    >
      <div className="flex justify-between items-start gap-2">
        <h3 className="font-medium text-gray-800 text-sm flex-1">
          {task.title}
        </h3>
        <div className="flex gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(task);
            }}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
            title="Edit task"
          >
            <Edit size={14} className="text-gray-500" />
          </button>
          <button
            onClick={handleDelete}
            className="p-1 hover:bg-red-50 rounded transition-colors"
            title="Delete task"
          >
            <Trash2 size={14} className="text-gray-500 hover:text-red-500" />
          </button>
        </div>
      </div>
      <p className="text-gray-500 text-xs mt-2 line-clamp-2">
        {task.description}
      </p>
    </div>
  );
}
