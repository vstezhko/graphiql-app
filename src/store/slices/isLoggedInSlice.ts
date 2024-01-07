import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface IsLoggedInState {
  status: boolean;
  isLoading: boolean;
}

const initialState: IsLoggedInState = {
  status: false,
  isLoading: false,
};

export const isLoggedInSlice = createSlice({
  name: 'isLoggedInSlice',
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<boolean>) => {
      state.status = action.payload;
      localStorage.setItem('isLoggedIn', JSON.stringify(action.payload));
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setStatus, setLoading } = isLoggedInSlice.actions;

export default isLoggedInSlice.reducer;
