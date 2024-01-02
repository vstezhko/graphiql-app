import { render, fireEvent, act, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import EditorToolbar from '../components/editorComponent/editorToolbar/EditorToolbar';
import { store } from '../store/store';
import { Mock } from 'vitest';
import {
  setQueryBody,
  setQueryHeaders,
  setQueryVariables,
} from '../store/slices/editorsSlice';

describe('EditorToolbar', () => {
  it('renders without crashing', () => {
    render(
      <Provider store={store}>
        <EditorToolbar />
      </Provider>
    );
  });

  it('dispatches setEndpoint action on input change', () => {
    const data = { data: '12345' };

    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(data),
        ok: true,
        status: 200,
      })
    ) as Mock;

    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <EditorToolbar />
      </Provider>
    );

    act(() => {
      fireEvent.change(getByPlaceholderText('Enter a GraphQL endpoint'), {
        target: { value: 'test' },
      });
    });

    expect(store.getState().editors.endpoint).toBe('test');
  });

  it('dispatches setPrettifyError action when handlePrettify is called with incorrect values', () => {
    const { getByText } = render(
      <Provider store={store}>
        <EditorToolbar />
      </Provider>
    );

    act(() => {
      store.dispatch(setQueryBody('query someQuery { field '));
      store.dispatch(setQueryHeaders(' {    "header"  :   "test" }'));
      store.dispatch(setQueryVariables('{ "variable": "test" }'));
    });

    act(() => {
      fireEvent.click(getByText('Prettify'));
    });

    expect(store.getState().editors.queryBody).toBe('query someQuery { field ');
    expect(store.getState().editors.queryHeaders).toBe(
      ' {    "header"  :   "test" }'
    );
    expect(store.getState().editors.queryVariables).toBe(
      '{ "variable": "test" }'
    );
    expect(store.getState().editors.prettifyError).toBe('bracketMismatch');
  });

  it('dispatches actions correctly when handlePrettify is called with correct values', () => {
    const { getByText } = render(
      <Provider store={store}>
        <EditorToolbar />
      </Provider>
    );

    act(() => {
      store.dispatch(setQueryBody('query someQuery { field }'));
      store.dispatch(setQueryHeaders(' {    "header"  :   "test" }'));
      store.dispatch(setQueryVariables('{ "variable": "test" }'));
    });

    act(() => {
      fireEvent.click(getByText('Prettify'));
    });

    expect(store.getState().editors.queryBody).toBe(
      'query someQuery {\n  field\n}'
    );
    expect(store.getState().editors.queryHeaders).toBe(
      '{\n  "header": "test"\n}'
    );
    expect(store.getState().editors.queryVariables).toBe(
      '{\n  "variable": "test"\n}'
    );
  });

  it("shouldn't dispatch fetchData action when queryBody is empty and run button is clicked", () => {
    const { getByLabelText } = render(
      <Provider store={store}>
        <EditorToolbar />
      </Provider>
    );

    act(() => {
      fireEvent.click(getByLabelText('run-request'));
    });

    expect(store.getState().editors.response).toBe('');
  });

  it('should dispatch fetchData action when queryBody is not empty and run button is clicked', async () => {
    const data = { data: '12345' };

    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(data),
        ok: true,
        status: 200,
      })
    ) as Mock;

    const { getByLabelText } = render(
      <Provider store={store}>
        <EditorToolbar />
      </Provider>
    );

    act(() => {
      store.dispatch(setQueryBody('query someQuery { field }'));
    });

    act(() => {
      fireEvent.click(getByLabelText('run-request'));
    });

    await waitFor(() =>
      expect(store.getState().editors.response).toBe(
        JSON.stringify(data, null, 2)
      )
    );
  });
});
