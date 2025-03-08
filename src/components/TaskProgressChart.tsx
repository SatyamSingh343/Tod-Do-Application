import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

const TaskProgressChart = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const percentage = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;

  // SVG parameters
  const size = 160;
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative w-40 h-40">
      <svg className="transform -rotate-90 w-full h-full">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          className="stroke-green-100 dark:stroke-gray-700"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          className="stroke-green-600 dark:stroke-green-500"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="none"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-sm">
        <div className="flex items-baseline">
          <span className="text-2xl font-bold text-gray-800 dark:text-gray-200">{completedTasks}</span>
          <span className="text-gray-500 dark:text-gray-400">/{totalTasks}</span>
        </div>
        <div className="text-gray-500 dark:text-gray-400 text-xs mt-1">Tasks</div>
      </div>
    </div>
  );
};

export default TaskProgressChart;