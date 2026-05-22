import { createSlice } from '@reduxjs/toolkit';

interface AppState {
  hasHydratedSession: boolean;
}

const initialState: AppState = {
  hasHydratedSession: false,
};

const appSlice = createSlice({
  initialState,
  name: 'app',
  reducers: {
    finishSessionHydration: state => {
      state.hasHydratedSession = true;
    },
    resetAppState: state => {
      state.hasHydratedSession = false;
    },
  },
});

export const { finishSessionHydration, resetAppState } = appSlice.actions;

export default appSlice.reducer;
