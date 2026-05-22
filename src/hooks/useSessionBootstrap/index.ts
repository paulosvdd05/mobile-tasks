import { isAxiosError } from 'axios';
import { useNetworkState } from 'expo-network';
import { useEffect, useRef } from 'react';

import { Prefs } from '../../repository';
import { clearSession, clearTasks, finishSessionHydration, setSession, useAppDispatch, useAppSelector } from '../../store';
import { SessionData, SessionResponse } from '../../types/auth';
import { useService } from '../useService';

export const useSessionBootstrap = () => {
  const dispatch = useAppDispatch();
  const hasHydratedSession = useAppSelector(state => state.app.hasHydratedSession);
  const token = useAppSelector(state => state.session.token);
  const networkState = useNetworkState();
  const { api } = useService();
  const validatedTokenRef = useRef<string | null>(null);
  const isValidatingRef = useRef(false);

  const persistValidatedSession = async (session: SessionData) => {
    await Prefs.setSession(session);
    dispatch(setSession(session));
  };

  const clearInvalidSession = async () => {
    validatedTokenRef.current = null;
    await Prefs.clearTasksState();
    await Prefs.clearSession();
    dispatch(clearTasks());
    dispatch(clearSession());
  };

  useEffect(() => {
    if (hasHydratedSession) {
      return;
    }

    let isMounted = true;

    const hydrate = async () => {
      try {
        const session = await Prefs.getSession();

        if (session && isMounted) {
          dispatch(setSession(session));
        }
      } finally {
        if (isMounted) {
          dispatch(finishSessionHydration());
        }
      }
    };

    hydrate();

    return () => {
      isMounted = false;
    };
  }, [dispatch, hasHydratedSession]);

  useEffect(() => {
    if (!hasHydratedSession || !token || networkState.isConnected !== true || isValidatingRef.current) {
      return;
    }

    if (validatedTokenRef.current === token) {
      return;
    }

    let isMounted = true;

    const validateSession = async () => {
      isValidatingRef.current = true;

      try {
        const { data } = await api.get<SessionResponse>('/auth/session');

        if (!isMounted) {
          return;
        }

        const session: SessionData = {
          token: data.token,
          user: data.userFromId,
        };

        await persistValidatedSession(session);
        validatedTokenRef.current = session.token;
      } catch (error) {
        if (!isMounted) {
          return;
        }

        if (isAxiosError(error) && error.response?.status === 401) {
          await clearInvalidSession();
          return;
        }
      } finally {
        if (isMounted) {
          isValidatingRef.current = false;
        }
      }
    };

    validateSession();

    return () => {
      isMounted = false;
    };
  }, [api, dispatch, hasHydratedSession, networkState.isConnected, token]);
};
