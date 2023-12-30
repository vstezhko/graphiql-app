import { Store, configureStore } from '@reduxjs/toolkit';
import editorsReducer, {
  setQueryBody,
  setQueryHeaders,
  setQueryVariables,
} from '../store/slices/editorsSlice';
import { fetchData, getSchema } from '../store/slices/graphQLThunk';
import { Mock } from 'vitest';
import { AppDispatch } from '../store/store';

type EditorsState = {
  editors: ReturnType<typeof editorsReducer>;
};

describe('editors reducer', () => {
  let store: Store<EditorsState> & { dispatch: AppDispatch };

  beforeEach(() => {
    store = configureStore({
      reducer: {
        editors: editorsReducer,
      },
    });
  });

  test('handles setQueryBody', () => {
    const query = 'test query';
    store.dispatch(setQueryBody(query));
    expect(store.getState().editors.queryBody).toBe(query);
  });

  test('handles setQueryVariables', () => {
    const variables = 'test variables';
    store.dispatch(setQueryVariables(variables));
    expect(store.getState().editors.queryVariables).toBe(variables);
  });

  test('handles setQueryHeaders', () => {
    const headers = 'test headers';
    store.dispatch(setQueryHeaders(headers));
    expect(store.getState().editors.queryHeaders).toBe(headers);
  });

  test('handles fetchData result', async () => {
    const data = { data: '12345' };

    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(data),
        ok: true,
        status: 200,
      })
    ) as Mock;

    await store.dispatch(fetchData());

    expect(store.getState().editors.isFetchingQuery).toBe('idle');
    expect(store.getState().editors.response).toBe(
      JSON.stringify(data, null, 2)
    );
    expect(store.getState().editors.requestError).toBeNull();
  });

  test('handles fetchData errors', async () => {
    const errorReference = 'endpointError';
    global.fetch = vi.fn(() => Promise.reject()) as Mock;

    await store.dispatch(fetchData());

    expect(store.getState().editors.isFetchingQuery).toBe('idle');
    expect(store.getState().editors.requestError).toBe(errorReference);
    expect(store.getState().editors.response).toBe('');
  });

  test('handles fetchSchema errors', async () => {
    const errorReference = 'errorSchema';
    global.fetch = vi.fn(() => Promise.reject()) as Mock;

    await store.dispatch(getSchema());

    expect(store.getState().editors.isFetchingQuery).toBe('idle');
    expect(store.getState().editors.requestError).toBe(errorReference);
    expect(store.getState().editors.response).toBe('');
  });
});
