import { configureStore } from '@reduxjs/toolkit';
import editorsReducer from './slices/editorsSlice';
import isLoggedInReducer from './slices/isLoggedInSlice.ts';

export const store = configureStore({
  reducer: {
    editors: editorsReducer,
    isLoggedIn: isLoggedInReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
