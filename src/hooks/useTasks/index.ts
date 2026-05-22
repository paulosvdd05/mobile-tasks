import { useNetworkState } from 'expo-network';
import { useCallback, useEffect, useMemo, useRef } from 'react';

import { Prefs } from '../../repository';
import {
  clearTasks,
  hydrateTasks,
  replaceTasksState,
  setTasksError,
  setTasksFromServer,
  setTasksLoading,
  setTasksSyncing,
  useAppDispatch,
  useAppSelector,
} from '../../store';
import {
  CreateTaskPayload,
  Task,
  TaskItem,
  TaskMutation,
  TasksCacheSnapshot,
  TaskResponse,
  TasksResponse,
  UpdateTaskPayload,
} from '../../types/tasks';
import { getApiErrorMessage } from '../../utils';
import { useService } from '../useService';

const createLocalId = () => `local-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
const createMutationId = () => `mutation-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const hasPendingMutation = (queue: TaskMutation[], taskId: string) => queue.some(mutation => mutation.taskId === taskId);

const buildTaskItem = (task: Task, existing?: TaskItem, queue: TaskMutation[] = []): TaskItem => ({
  ...task,
  syncStatus: hasPendingMutation(queue, task.id) ? 'pending' : 'synced',
  updatedAt: existing?.updatedAt ?? Date.now(),
});

const enqueueTaskUpdate = (queue: TaskMutation[], taskId: string, payload: UpdateTaskPayload) => {
  const existingIndex = queue.findIndex(mutation => mutation.taskId === taskId && mutation.type === 'update');

  if (existingIndex >= 0) {
    return queue.map((mutation, index) =>
      index === existingIndex ? { ...mutation, payload: { ...mutation.payload, ...payload } } : mutation,
    );
  }

  const createIndex = queue.findIndex(mutation => mutation.taskId === taskId && mutation.type === 'create');
  const nextMutation: TaskMutation = {
    createdAt: Date.now(),
    id: createMutationId(),
    payload,
    taskId,
    type: 'update',
  };

  if (createIndex >= 0) {
    return [...queue.slice(0, createIndex + 1), nextMutation, ...queue.slice(createIndex + 1)];
  }

  return [...queue, nextMutation];
};

const enqueueTaskDelete = (queue: TaskMutation[], taskId: string) => {
  const hasUnsyncedCreate = queue.some(mutation => mutation.taskId === taskId && mutation.type === 'create');

  if (hasUnsyncedCreate) {
    return queue.filter(mutation => mutation.taskId !== taskId);
  }

  const filteredQueue = queue.filter(mutation => !(mutation.taskId === taskId && mutation.type === 'update'));

  if (filteredQueue.some(mutation => mutation.taskId === taskId && mutation.type === 'delete')) {
    return filteredQueue;
  }

  const nextMutation: TaskMutation = {
    createdAt: Date.now(),
    id: createMutationId(),
    taskId,
    type: 'delete',
  };

  return [
    ...filteredQueue,
    nextMutation,
  ];
};

export const useTasks = () => {
  const dispatch = useAppDispatch();
  const { api } = useService();
  const token = useAppSelector(state => state.session.token);
  const { hasHydratedCache, isLoading, isSyncing, items, lastError, queue } = useAppSelector(state => state.tasks);
  const networkState = useNetworkState();
  const isOnline = Boolean(networkState.isConnected && networkState.isInternetReachable !== false);

  const itemsRef = useRef(items);
  const queueRef = useRef(queue);
  const syncInFlightRef = useRef(false);

  useEffect(() => {
    itemsRef.current = items;
    queueRef.current = queue;
  }, [items, queue]);

  const replaceState = useCallback(
    (snapshot: TasksCacheSnapshot) => {
      itemsRef.current = snapshot.items;
      queueRef.current = snapshot.queue;
      dispatch(replaceTasksState(snapshot));
    },
    [dispatch],
  );

  const mutateState = useCallback(
    (transform: (snapshot: TasksCacheSnapshot) => TasksCacheSnapshot) => {
      const nextSnapshot = transform({
        items: itemsRef.current,
        queue: queueRef.current,
      });

      replaceState(nextSnapshot);
    },
    [replaceState],
  );

  const getTaskById = useCallback(
    async (taskId: string) => {
      const { data } = await api.get<TaskResponse>(`/tasks/${taskId}`);
      return data.task;
    },
    [api],
  );

  const fetchTasks = useCallback(async () => {
    const { data } = await api.get<TasksResponse>('/tasks');
    const existingById = new Map(itemsRef.current.map(task => [task.id, task]));
    const nextItems = data.tasks.map(task => buildTaskItem(task, existingById.get(task.id), queueRef.current));

    itemsRef.current = nextItems;
    dispatch(setTasksFromServer(nextItems));
  }, [api, dispatch]);

  const synchronizeTasks = useCallback(async () => {
    if (!token || !isOnline || syncInFlightRef.current) {
      if (!isOnline) {
        dispatch(setTasksLoading(false));
      }

      return;
    }

    syncInFlightRef.current = true;
    dispatch(setTasksError(null));
    dispatch(setTasksLoading(itemsRef.current.length === 0));
    dispatch(setTasksSyncing(true));

    try {
      while (queueRef.current.length > 0) {
        const currentMutation = queueRef.current[0];

        if (currentMutation.type === 'create') {
          const payload = currentMutation.payload as CreateTaskPayload;
          const { data } = await api.post<TaskResponse>('/tasks', { name: payload.name });
          const remoteTask = await getTaskById(data.task.id);
          const nextQueue = queueRef.current
            .filter(mutation => mutation.id !== currentMutation.id)
            .map(mutation => (mutation.taskId === currentMutation.taskId ? { ...mutation, taskId: remoteTask.id } : mutation));

          const nextItems = itemsRef.current.map(task =>
            task.id === currentMutation.taskId ? buildTaskItem(remoteTask, task, nextQueue) : task,
          );

          replaceState({
            items: nextItems,
            queue: nextQueue,
          });

          continue;
        }

        if (currentMutation.type === 'update') {
          const payload = currentMutation.payload as UpdateTaskPayload;
          const { data } = await api.patch<TaskResponse>(`/tasks/${currentMutation.taskId}`, payload);
          const remoteTask = await getTaskById(data.task.id);
          const nextQueue = queueRef.current.filter(mutation => mutation.id !== currentMutation.id);
          const nextItems = itemsRef.current.map(task =>
            task.id === currentMutation.taskId ? buildTaskItem(remoteTask, task, nextQueue) : task,
          );

          replaceState({
            items: nextItems,
            queue: nextQueue,
          });

          continue;
        }

        await api.delete(`/tasks/${currentMutation.taskId}`);

        replaceState({
          items: itemsRef.current.filter(task => task.id !== currentMutation.taskId),
          queue: queueRef.current.filter(mutation => mutation.id !== currentMutation.id),
        });
      }

      await fetchTasks();
    } catch (error) {
      const fallbackMessage =
        queueRef.current.length > 0 ? 'Nao foi possivel sincronizar as tarefas agora.' : 'Nao foi possivel carregar as tarefas agora.';

      dispatch(setTasksError(getApiErrorMessage(error, fallbackMessage)));
    } finally {
      syncInFlightRef.current = false;
      dispatch(setTasksLoading(false));
      dispatch(setTasksSyncing(false));
    }
  }, [api, dispatch, fetchTasks, getTaskById, isOnline, replaceState, token]);

  useEffect(() => {
    if (!token || hasHydratedCache) {
      return;
    }

    let isMounted = true;

    const hydrate = async () => {
      const cachedSnapshot = await Prefs.getTasksState();

      if (!isMounted) {
        return;
      }

      dispatch(
        hydrateTasks(
          cachedSnapshot ?? {
            items: [],
            queue: [],
          },
        ),
      );
    };

    hydrate();

    return () => {
      isMounted = false;
    };
  }, [dispatch, hasHydratedCache, token]);

  useEffect(() => {
    if (!token || !hasHydratedCache) {
      return;
    }

    void Prefs.setTasksState({
      items,
      queue,
    });
  }, [hasHydratedCache, items, queue, token]);

  useEffect(() => {
    if (!token || !hasHydratedCache) {
      return;
    }

    if (!isOnline) {
      dispatch(setTasksLoading(false));
      return;
    }

    void synchronizeTasks();
  }, [dispatch, hasHydratedCache, isOnline, synchronizeTasks, token]);

  const createTask = useCallback(
    async (name: string) => {
      const trimmedName = name.trim();

      if (!trimmedName) {
        throw new Error('Informe o nome da tarefa.');
      }

      const localTask: TaskItem = {
        checked: false,
        id: createLocalId(),
        name: trimmedName,
        syncStatus: 'pending',
        updatedAt: Date.now(),
      };

      mutateState(snapshot => ({
        items: [...snapshot.items, localTask],
        queue: [
          ...snapshot.queue,
          {
            createdAt: Date.now(),
            id: createMutationId(),
            payload: { name: trimmedName },
            taskId: localTask.id,
            type: 'create',
          },
        ],
      }));

      if (isOnline) {
        await synchronizeTasks();
      }
    },
    [isOnline, mutateState, synchronizeTasks],
  );

  const toggleTask = useCallback(
    async (taskId: string, checked: boolean) => {
      mutateState(snapshot => ({
        items: snapshot.items.map(task =>
          task.id === taskId
            ? {
                ...task,
                checked,
                syncStatus: 'pending',
                updatedAt: Date.now(),
              }
            : task,
        ),
        queue: enqueueTaskUpdate(snapshot.queue, taskId, { checked }),
      }));

      if (isOnline) {
        await synchronizeTasks();
      }
    },
    [isOnline, mutateState, synchronizeTasks],
  );

  const deleteTask = useCallback(
    async (taskId: string) => {
      mutateState(snapshot => ({
        items: snapshot.items.filter(task => task.id !== taskId),
        queue: enqueueTaskDelete(snapshot.queue, taskId),
      }));

      if (isOnline) {
        await synchronizeTasks();
      }
    },
    [isOnline, mutateState, synchronizeTasks],
  );

  const resetTasks = useCallback(async () => {
    await Prefs.clearTasksState();
    dispatch(clearTasks());
  }, [dispatch]);

  const toDoTasks = useMemo(() => items.filter(task => !task.checked), [items]);
  const doneTasks = useMemo(() => items.filter(task => task.checked), [items]);

  return {
    createTask,
    deleteTask,
    doneTasks,
    hasHydratedCache,
    hasPendingChanges: queue.length > 0,
    isLoading,
    isOffline: !isOnline,
    isSyncing,
    lastError,
    pendingCount: queue.length,
    resetTasks,
    synchronizeTasks,
    toDoTasks,
    toggleTask,
  };
};
