import { useState } from 'react';

import { Prefs } from '../../repository';
import { clearSession, setSession, useAppDispatch } from '../../store';
import { AuthResponse, SessionData, SignInPayload, SignUpPayload } from '../../types/auth';
import { getApiErrorMessage } from '../../utils';
import { useService } from '../useService';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { api } = useService();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const persistSession = async (session: SessionData) => {
    await Prefs.setSession(session);
    dispatch(setSession(session));
  };

  const signIn = async (payload: SignInPayload) => {
    setIsSubmitting(true);

    try {
      const { data } = await api.post<AuthResponse>('/auth/sign-in/email', payload);
      await persistSession({ token: data.token, user: data.user });
    } catch (error) {
      throw new Error(getApiErrorMessage(error, 'Nao foi possivel entrar agora.'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const signUp = async (payload: SignUpPayload) => {
    setIsSubmitting(true);

    try {
      const { data } = await api.post<AuthResponse>('/auth/sign-up/email', payload);
      await persistSession({ token: data.token, user: data.user });
    } catch (error) {
      throw new Error(getApiErrorMessage(error, 'Nao foi possivel criar a conta agora.'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const signOut = async () => {
    await Prefs.clearSession();
    dispatch(clearSession());
  };

  return {
    isSubmitting,
    signIn,
    signOut,
    signUp,
  };
};
