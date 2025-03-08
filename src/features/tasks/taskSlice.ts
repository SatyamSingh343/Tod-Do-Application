import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  important: boolean;
  createdAt: string;
  assignedTo?: string;
}

interface TaskState {
  tasks: Task[];
  filter: 'all' | 'today' | 'important' | 'planned' | 'assigned';
}

const initialState: TaskState = {
  tasks: [],
  filter: 'all',
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Omit<Task, 'id' | 'createdAt'>>) => {
      state.tasks.push({
        ...action.payload,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
      });
    },
    toggleComplete: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find(t => t.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    toggleImportant: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find(t => t.id === action.payload);
      if (task) {
        task.important = !task.important;
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(t => t.id !== action.payload);
    },
    setFilter: (state, action: PayloadAction<TaskState['filter']>) => {
      state.filter = action.payload;
    },
  },
});

export const { addTask, toggleComplete, toggleImportant, deleteTask, setFilter } = taskSlice.actions;
export default taskSlice.reducer;