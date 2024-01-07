import { createAsyncThunk } from '@reduxjs/toolkit';
import { makeRequest, makeSchemaRequest } from '../../api/api';
import { RootState } from '../store';

export const fetchData = createAsyncThunk(
  'editors/fetchData',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    return JSON.stringify(await makeRequest(state), null, 2);
  }
);

export const getSchema = createAsyncThunk(
  'documentation/getSchema',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    return JSON.stringify(await makeSchemaRequest(state), null, 2);
  }
);
