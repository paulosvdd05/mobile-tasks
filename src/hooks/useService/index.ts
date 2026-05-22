import type { AxiosInstance } from 'axios';
import axios from 'axios';
import { useEffect, useRef } from 'react';

import { Prefs } from '../../repository';
import { useAppSelector } from '../../store';

import { API_URL } from './api';

interface HookReturn {
  api: AxiosInstance;
}

export const useService = (): HookReturn => {
  const token = useAppSelector(state => state.session.token);
  const tokenRef = useRef<string | null>(token);
  const axiosInstanceRef = useRef<AxiosInstance | null>(null);

  useEffect(() => {
    tokenRef.current = token;
  }, [token]);

  if (!axiosInstanceRef.current) {
    const instance = axios.create({
      baseURL: API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 15000,
    });

    instance.interceptors.request.use(async config => {
      const storedToken = tokenRef.current ?? (await Prefs.getToken());

      if (storedToken) {
        const finalToken = storedToken.startsWith('Bearer ') ? storedToken : `Bearer ${storedToken}`;
        config.headers = config.headers ?? {};
        (config.headers as Record<string, string>).Authorization = finalToken;
      }

      return config;
    });

    axiosInstanceRef.current = instance;
  }

  return { api: axiosInstanceRef.current };
};
