import { Provider } from 'react-redux';
import EditorContainer from '../components/editorComponent/editorContainer/EditorContainer';
import { store } from '../store/store';
import { fireEvent, render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import EditorTabs from '../components/editorComponent/editorTabs/EditorTabs';

test('renders EditorContainer', () => {
  render(
    <Provider store={store}>
      <EditorContainer />
    </Provider>
  );

  const editorElement = screen.getByTestId('queryBody');
  const jsonViewerElement = screen.getByTestId('response');
  const variablesElement = screen.getByTestId('queryVariables');
  const headersElement = screen.queryByTestId('queryHeaders');
  const variablesHeader = screen.getByText(/Variables/i);
  const headersHeader = screen.getByText(/Headers/i);

  expect(editorElement).toBeDefined();
  expect(jsonViewerElement).toBeDefined();
  expect(variablesElement).toBeDefined();
  expect(headersElement).toBeNull();
  expect(variablesHeader).toBeDefined();
  expect(headersHeader).toBeDefined();
});

test('opens and closes the variables&headers panel', () => {
  const { getByLabelText } = render(
    <Provider store={store}>
      <EditorTabs />
    </Provider>
  );

  fireEvent.click(getByLabelText('hide-editors-panel'));
  expect(getByLabelText('show-editors-panel')).toBeDefined();

  fireEvent.click(getByLabelText('show-editors-panel'));
  expect(getByLabelText('hide-editors-panel')).toBeDefined();
});

test('switches tabs of the variables&headers panel', () => {
  const { getByText } = render(
    <Provider store={store}>
      <EditorTabs />
    </Provider>
  );

  fireEvent.click(getByText('Variables'));
  expect(store.getState().editors.activeTab).toBe(0);

  fireEvent.click(getByText('Headers'));
  expect(store.getState().editors.activeTab).toBe(1);
});
