import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface EditorsState {
  queryBody: string;
  queryVariables: string;
  queryHeaders: string;
  activeTab: number;
  isPanelOpen: boolean;
}

const initialState: EditorsState = {
  queryBody: `query {
    viewer {
      login
      repositories(last: 10) {
        nodes {
          name
        }
      }
    }
  }`,
  queryVariables: `{ "last": 10}`,
  queryHeaders: `{ "Authorization": "Bearer YOUR_TOKEN" }`,
  activeTab: 0,
  isPanelOpen: true,
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
  },
});

export const {
  setQueryBody,
  setQueryVariables,
  setQueryHeaders,
  setActiveTab,
  setIsPanelOpen,
} = editorsSlice.actions;

export default editorsSlice.reducer;
