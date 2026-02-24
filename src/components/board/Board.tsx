'use client';

import { useState } from 'react';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { TaskInput } from '@/types';
import { useTasks, useCreateTask, useUpdateTask } from '@/hooks/useTasks';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { setDraggedTask } from '@/store/tasksSlice';
import { Task, ColumnType } from '@/types';
import Column from '../column/Column';
import TaskModal from '../modal/TaskModal';
import BoardHeader from './BoardHeader';

const COLUMNS: ColumnType[] = ['backlog', 'in_progress', 'review', 'done'];

export default function Board() {
  const dispatch = useAppDispatch();
  const searchQuery = useAppSelector((state) => state.tasks.searchQuery);
  const draggedTask = useAppSelector((state) => state.tasks.draggedTask);

  // Fetch tasks with React Query
  const { data: tasks = [], isLoading } = useTasks(searchQuery);
  const { mutate: createTask } = useCreateTask();
  const { mutate: updateTask } = useUpdateTask();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // Prevent accidental drags - require 8px movement
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const task = tasks.find((t) => t.id === event.active.id);
    if (task) {
      dispatch(setDraggedTask(task));
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    dispatch(setDraggedTask(null));

    if (!over) return;

    const taskId = active.id as number;
    const newColumn = over.id as ColumnType;

    const task = tasks.find((t) => t.id === taskId);
    if (task && task.column !== newColumn) {
      updateTask({
        id: taskId,
        data: { column: newColumn },
      });
    }
  };

  const handleNewTask = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleSaveTask = (data: TaskInput) => {
    if (editingTask) {
      updateTask({
        id: editingTask.id,
        data,
      });
    } else {
      createTask(data);
    }
    setIsModalOpen(false);
  };

  const getTasksByColumn = (column: ColumnType) => {
    return tasks.filter((task) => task.column === column);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      <BoardHeader onNewTask={handleNewTask} />

      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-4 overflow-x-auto pb-4">
          {COLUMNS.map((column) => (
            <Column
              key={column}
              id={column}
              tasks={getTasksByColumn(column)}
              onEditTask={handleEditTask}
            />
          ))}
        </div>

        <DragOverlay>
          {draggedTask && (
            <div className="bg-white p-4 rounded-lg shadow-lg border-2 border-blue-500 opacity-80 cursor-grabbing">
              <h3 className="font-medium text-gray-800 text-sm">
                {draggedTask.title}
              </h3>
              <p className="text-gray-500 text-xs mt-2">
                {draggedTask.description}
              </p>
            </div>
          )}
        </DragOverlay>
      </DndContext>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTask}
        task={editingTask}
      />
    </div>
  );
}
