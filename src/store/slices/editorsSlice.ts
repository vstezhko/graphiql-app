import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { DictionaryKey } from '../../context/LanguageContext';
import { fetchData, getSchema } from './graphQLThunk';

export interface EditorsState {
  queryBody: string;
  queryVariables: string;
  queryHeaders: string;
  activeTab: number;
  isPanelOpen: boolean;
  isFetchingQuery: 'idle' | 'loading';
  isFetchingSchema: 'idle' | 'loading';
  response: string;
  endpoint: string;
  error: DictionaryKey | null;
  documentation: string;
}

const initialState: EditorsState = {
  queryBody: '',
  queryVariables: '',
  queryHeaders: '',
  activeTab: 0,
  isPanelOpen: true,
  isFetchingQuery: 'idle',
  isFetchingSchema: 'idle',
  response: '',
  endpoint: '',
  error: null,
  documentation: '',
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
    setActiveTab: (state, action: PayloadAction<number>) => {
      state.activeTab = action.payload;
    },
    setIsPanelOpen: (state, action: PayloadAction<boolean>) => {
      state.isPanelOpen = action.payload;
    },
    setEndpoint: (state, action: PayloadAction<string>) => {
      state.endpoint = action.payload;
    },
    setError: (state, action: PayloadAction<DictionaryKey | null>) => {
      state.error = action.payload;
    },
    setDocumentation: (state) => {
      state.documentation = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.error = null;
        state.isFetchingQuery = 'loading';
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.isFetchingQuery = 'idle';
        state.response = action.payload;
      })
      .addCase(fetchData.rejected, (state) => {
        state.isFetchingQuery = 'idle';
        state.response = '';
        state.error = 'endpointError';
      })
      .addCase(getSchema.pending, (state) => {
        state.error = null;
        state.isFetchingSchema = 'loading';
      })
      .addCase(getSchema.fulfilled, (state, action) => {
        state.isFetchingSchema = 'idle';
        state.documentation = action.payload;
      })
      .addCase(getSchema.rejected, (state) => {
        state.isFetchingSchema = 'idle';
        state.documentation = '';
        state.error = 'errorSchema';
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
  setDocumentation,
} = editorsSlice.actions;

export default editorsSlice.reducer;
