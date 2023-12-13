import { createAsyncThunk } from '@reduxjs/toolkit';
import { makeRequest } from '../../api/api';
import { RootState } from '../store';

export const fetchData = createAsyncThunk(
  'editors/fetchData',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    return JSON.stringify(await makeRequest(state), null, 2);
  }
);
