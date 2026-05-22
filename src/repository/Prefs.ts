import AsyncStorage from '@react-native-async-storage/async-storage';

import { SessionData } from '../types/auth';
import { TasksCacheSnapshot } from '../types/tasks';

const storageKeys = {
  session: '@testetecnico/session',
  tasks: '@testetecnico/tasks',
} as const;

export class Prefs {
  static async clearSession() {
    await AsyncStorage.removeItem(storageKeys.session);
  }

  static async getSession(): Promise<SessionData | null> {
    const sessionString = await AsyncStorage.getItem(storageKeys.session);

    if (!sessionString) {
      return null;
    }

    try {
      return JSON.parse(sessionString) as SessionData;
    } catch {
      return null;
    }
  }

  static async getToken(): Promise<string | null> {
    const session = await Prefs.getSession();
    return session?.token ?? null;
  }

  static async getTasksState(): Promise<TasksCacheSnapshot | null> {
    const tasksString = await AsyncStorage.getItem(storageKeys.tasks);

    if (!tasksString) {
      return null;
    }

    try {
      return JSON.parse(tasksString) as TasksCacheSnapshot;
    } catch {
      return null;
    }
  }

  static async setSession(session: SessionData) {
    await AsyncStorage.setItem(storageKeys.session, JSON.stringify(session));
  }

  static async setTasksState(snapshot: TasksCacheSnapshot) {
    await AsyncStorage.setItem(storageKeys.tasks, JSON.stringify(snapshot));
  }

  static async clearTasksState() {
    await AsyncStorage.removeItem(storageKeys.tasks);
  }
}
