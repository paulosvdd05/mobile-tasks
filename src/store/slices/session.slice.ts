import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { SessionData, User } from '../../types/auth';

interface SessionState {
  token: string | null;
  user: User | null;
}

const initialState: SessionState = {
  token: null,
  user: null,
};

const sessionSlice = createSlice({
  initialState,
  name: 'session',
  reducers: {
    clearSession: state => {
      state.token = null;
      state.user = null;
    },
    setSession: (state, action: PayloadAction<SessionData>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
  },
});

export const { clearSession, setSession } = sessionSlice.actions;

export default sessionSlice.reducer;
