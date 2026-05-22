export interface Task {
  checked: boolean;
  id: string;
  name: string;
}

export interface TaskResponse {
  task: Task;
}

export interface TasksResponse {
  tasks: Task[];
}

export interface CreateTaskPayload {
  name: string;
}

export interface UpdateTaskPayload {
  checked?: boolean;
  name?: string;
}

export type TaskSyncStatus = 'pending' | 'synced';
export type TaskMutationType = 'create' | 'delete' | 'update';

export interface TaskItem extends Task {
  syncStatus: TaskSyncStatus;
  updatedAt: number;
}

export interface TaskMutation {
  createdAt: number;
  id: string;
  payload?: CreateTaskPayload | UpdateTaskPayload;
  taskId: string;
  type: TaskMutationType;
}

export interface TasksCacheSnapshot {
  items: TaskItem[];
  queue: TaskMutation[];
}
