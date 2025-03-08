import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store';
import { addTask, toggleComplete, toggleImportant, deleteTask } from '../features/tasks/taskSlice';
import { Bell, RotateCcw, Calendar, Star, Plus, Trash2 } from 'lucide-react';

const TaskList = () => {
  const dispatch = useDispatch();
  const [newTask, setNewTask] = useState('');
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const filter = useSelector((state: RootState) => state.tasks.filter);

  const filteredTasks = tasks.filter(task => {
    switch (filter) {
      case 'today':
        return new Date(task.createdAt).toDateString() === new Date().toDateString();
      case 'important':
        return task.important;
      case 'completed':
        return task.completed;
      default:
        return true;
    }
  });

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim()) {
      dispatch(addTask({
        title: newTask,
        completed: false,
        important: false,
      }));
      setNewTask('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleAddTask} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm mb-6">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Add A Task"
              className="w-full bg-transparent border-none outline-none text-gray-700 dark:text-gray-200 placeholder-gray-400"
            />
          </div>
          <div className="flex items-center gap-3">
            <button type="button" className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
              <Bell size={20} />
            </button>
            <button type="button" className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
              <RotateCcw size={20} />
            </button>
            <button type="button" className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
              <Calendar size={20} />
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              ADD TASK
            </button>
          </div>
        </div>
      </form>

      <div className="space-y-4">
        {filteredTasks.map(task => (
          <div
            key={task.id}
            className={`bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm flex items-center gap-4 ${
              task.completed ? 'opacity-50' : ''
            }`}
          >
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => dispatch(toggleComplete(task.id))}
              className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500"
            />
            <span className={`flex-1 ${task.completed ? 'line-through text-gray-400' : 'text-gray-700 dark:text-gray-200'}`}>
              {task.title}
            </span>
            <button
              onClick={() => dispatch(toggleImportant(task.id))}
              className={`p-2 ${
                task.important ? 'text-yellow-500' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-200'
              }`}
            >
              <Star size={20} />
            </button>
            <button
              onClick={() => dispatch(deleteTask(task.id))}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              <Trash2 size={20} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;