import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TaskItem, TasksCacheSnapshot } from '../../types/tasks';

interface TasksState extends TasksCacheSnapshot {
  hasHydratedCache: boolean;
  isLoading: boolean;
  isSyncing: boolean;
  lastError: string | null;
}

const initialState: TasksState = {
  hasHydratedCache: false,
  isLoading: true,
  isSyncing: false,
  items: [],
  lastError: null,
  queue: [],
};

const tasksSlice = createSlice({
  initialState,
  name: 'tasks',
  reducers: {
    clearTasks: () => initialState,
    hydrateTasks: (state, action: PayloadAction<TasksCacheSnapshot>) => {
      state.hasHydratedCache = true;
      state.isLoading = false;
      state.items = action.payload.items;
      state.queue = action.payload.queue;
    },
    replaceTasksState: (state, action: PayloadAction<TasksCacheSnapshot>) => {
      state.items = action.payload.items;
      state.queue = action.payload.queue;
    },
    setTasksError: (state, action: PayloadAction<string | null>) => {
      state.lastError = action.payload;
    },
    setTasksLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setTasksSyncing: (state, action: PayloadAction<boolean>) => {
      state.isSyncing = action.payload;
    },
    setTasksFromServer: (state, action: PayloadAction<TaskItem[]>) => {
      state.items = action.payload;
    },
  },
});

export const { clearTasks, hydrateTasks, replaceTasksState, setTasksError, setTasksFromServer, setTasksLoading, setTasksSyncing } =
  tasksSlice.actions;

export default tasksSlice.reducer;
