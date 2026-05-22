import { useEffect } from 'react';

import { Prefs } from '../../repository';
import { finishSessionHydration, setSession, useAppDispatch, useAppSelector } from '../../store';

export const useSessionBootstrap = () => {
  const dispatch = useAppDispatch();
  const hasHydratedSession = useAppSelector(state => state.app.hasHydratedSession);

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
};
