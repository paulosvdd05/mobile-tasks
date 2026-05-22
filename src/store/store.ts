import { configureStore } from '@reduxjs/toolkit';

import appReducer from './slices/app.slice';
import sessionReducer from './slices/session.slice';

export const store = configureStore({
  reducer: {
    app: appReducer,
    session: sessionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
