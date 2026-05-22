import { useEffect } from 'react';

import { setInitializedAt, useAppDispatch, useAppSelector } from '../../store';

export const useAppInitialization = () => {
  const dispatch = useAppDispatch();
  const initializedAt = useAppSelector(state => state.app.initializedAt);

  useEffect(() => {
    if (initializedAt) {
      return;
    }

    dispatch(setInitializedAt(new Date().toISOString()));
  }, [dispatch, initializedAt]);
};
