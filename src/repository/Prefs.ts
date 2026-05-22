import AsyncStorage from '@react-native-async-storage/async-storage';

import { SessionData } from '../types/auth';

const storageKeys = {
  session: '@testetecnico/session',
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

  static async setSession(session: SessionData) {
    await AsyncStorage.setItem(storageKeys.session, JSON.stringify(session));
  }
}
