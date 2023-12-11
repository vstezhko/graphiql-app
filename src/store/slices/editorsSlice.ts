import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { fetchData } from './graphQLThunk';

export interface EditorsState {
  queryBody: string;
  queryVariables: string;
  queryHeaders: string;
  activeTab: number;
  isPanelOpen: boolean;
  isFetching: 'idle' | 'loading';
  response: string;
  endpoint: string;
  error: string | null;
}

const initialState: EditorsState = {
  queryBody: '',
  queryVariables: '',
  queryHeaders: '',
  activeTab: 0,
  isPanelOpen: true,
  isFetching: 'idle',
  response: '',
  endpoint: '',
  error: null,
};

export const editorsSlice = createSlice({
  name: 'editors',
  initialState,
  reducers: {
    setQueryBody: (state, action: PayloadAction<string>) => {
      state.queryBody = action.payload;
    },
    setQueryVariables: (state, action: PayloadAction<string>) => {
      state.queryVariables = action.payload;
    },
    setQueryHeaders: (state, action: PayloadAction<string>) => {
      state.queryHeaders = action.payload;
    },
    setResponse: (state, action: PayloadAction<string>) => {
      state.response = action.payload;
    },
    setActiveTab: (state, action: PayloadAction<number>) => {
      state.activeTab = action.payload;
    },
    setIsPanelOpen: (state, action: PayloadAction<boolean>) => {
      state.isPanelOpen = action.payload;
    },
    setEndpoint: (state, action: PayloadAction<string>) => {
      state.endpoint = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.error = null;
        state.isFetching = 'loading';
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.isFetching = 'idle';
        state.response = action.payload;
      })
      .addCase(fetchData.rejected, (state) => {
        state.isFetching = 'idle';
        state.response = '';
        state.error = 'The endpoint cannot be reached';
      });
  },
});

export const {
  setQueryBody,
  setQueryVariables,
  setQueryHeaders,
  setActiveTab,
  setIsPanelOpen,
  setEndpoint,
  setError,
} = editorsSlice.actions;

export default editorsSlice.reducer;
