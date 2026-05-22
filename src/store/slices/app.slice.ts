import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppState {
  initializedAt: string | null;
}

const initialState: AppState = {
  initializedAt: null,
};

const appSlice = createSlice({
  initialState,
  name: 'app',
  reducers: {
    setInitializedAt: (state, action: PayloadAction<string>) => {
      state.initializedAt = action.payload;
    },
  },
});

export const { setInitializedAt } = appSlice.actions;

export default appSlice.reducer;
