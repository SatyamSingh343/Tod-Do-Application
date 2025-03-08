import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store';
import { setFilter } from '../features/tasks/taskSlice';
import { toggleTheme } from '../features/theme/themeSlice';
import { 
  ListTodo, 
  Calendar, 
  Star, 
  Clock,
  UserSquare2,
  Plus,
  LogOut,
  Sun,
  Moon
} from 'lucide-react';
import TaskProgressChart from './TaskProgressChart';

const Sidebar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const currentFilter = useSelector((state: RootState) => state.tasks.filter);
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  const pendingTasks = tasks.filter(task => !task.completed).length;

  const menuItems = [
    { id: 'all', label: 'All Tasks', icon: ListTodo },
    { id: 'today', label: 'Today', icon: Calendar },
    { id: 'important', label: 'Important', icon: Star },
    { id: 'planned', label: 'Planned', icon: Clock },
    { id: 'assigned', label: 'Assigned to me', icon: UserSquare2 },
  ] as const;

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 p-6 flex flex-col h-full">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <img
            src={user?.avatar}
            alt="Profile"
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Hey,</p>
            <p className="font-semibold dark:text-white">{user?.name}</p>
          </div>
        </div>
        <button
          onClick={() => dispatch(toggleTheme())}
          className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      <nav className="flex-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => dispatch(setFilter(item.id))}
              className={`flex items-center gap-3 w-full p-3 rounded-lg mb-2 ${
                currentFilter === item.id
                ? 'bg-green-50 text-green-600 dark:bg-gray-700 dark:text-green-400'
                : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <button className="flex items-center gap-3 w-full p-3 rounded-lg mb-4 text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700">
        <Plus size={20} />
        <span>Add list</span>
      </button>

      <div className="border-t dark:border-gray-700 pt-4">
        <div className="bg-green-50 dark:bg-gray-700 rounded-lg p-4 mb-4">
          <h3 className="font-semibold mb-1 dark:text-white">Today Tasks</h3>
          <div className="flex flex-col items-center">
            <TaskProgressChart />
            <div className="flex items-center gap-1 mt-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">{pendingTasks} pending</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;