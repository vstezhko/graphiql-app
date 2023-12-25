import { act, fireEvent, render, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../store/store.ts';
import { screen } from '@testing-library/dom';
import DocumentationSection, {
  Documentation,
} from '../components/documentationComponent/DocumentationSection.tsx';
import { expect } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import editorsReducer, { setEndpoint } from '../store/slices/editorsSlice.ts';
import { getSchema } from '../store/slices/graphQLThunk.ts';
import TypesList from '../components/documentationComponent/TypesList.tsx';
import { mockSchema } from './mockSchema.ts';

test('renders DocumentationSection', () => {
  render(
    <Provider store={store}>
      <DocumentationSection />
    </Provider>
  );

  const buttonElement = screen.getByTestId('openBtn');
  const docSection = screen.getByTestId('docSection');

  expect(buttonElement).toBeInTheDocument();
  expect(docSection).toBeInTheDocument();
});

test('show name in button when isFetchingSchema is not "loading"', () => {
  render(
    <Provider store={store}>
      <DocumentationSection />
    </Provider>
  );

  expect(store.getState().editors.isFetchingSchema).not.toBe('loading');
  const buttonElement = screen.getByTestId('openBtn');
  expect(buttonElement).toBeInTheDocument();
  expect(screen.queryByTestId('сircularProgress')).not.toBeInTheDocument();
});

test('open doc section if schema is ready, render schema', async () => {
  const store = configureStore({
    reducer: {
      editors: editorsReducer,
    },
  });
  render(
    <Provider store={store}>
      <DocumentationSection />
    </Provider>
  );

  await act(async () => {
    store.dispatch(setEndpoint('https://countries.trevorblades.com/graphql'));
    store.dispatch(getSchema());
  });

  await waitFor(() => {
    const docSection = screen.getByTestId('docSection');
    const buttonElement = screen.getByTestId('openBtn');
    expect(buttonElement).not.toBeDisabled();
    expect(docSection).not.toHaveClass('doc-section_close');
    expect(screen.getByText('Root Type')).toBeInTheDocument();
    screen.debug();
  });
});

test('open/ close doc section', async () => {
  const store = configureStore({
    reducer: {
      editors: editorsReducer,
    },
  });
  render(
    <Provider store={store}>
      <DocumentationSection />
    </Provider>
  );

  await act(async () => {
    store.dispatch(setEndpoint('https://countries.trevorblades.com/graphql'));
    store.dispatch(getSchema());
  });

  await waitFor(() => {
    const docSection = screen.getByTestId('docSection');
    const buttonElement = screen.getByTestId('openBtn');
    fireEvent.click(buttonElement);
    expect(docSection).toHaveClass('doc-section_close');
    fireEvent.click(buttonElement);
    expect(docSection).not.toHaveClass('doc-section_close');
  });
});

test('render types', async () => {
  const schema = mockSchema.data.__schema.types as Documentation[];
  const queryType = mockSchema.data?.__schema?.queryType?.name as string;
  const root = schema?.find(
    (s: Documentation) => s.name === queryType
  ) as Documentation;

  const list = schema.find(
    (s: Documentation) => s.name === 'Continent'
  ) as Documentation;

  render(
    <TypesList
      list={list}
      handleTypeClick={vi.fn()}
      schema={schema}
      root={root}
    />
  );

  expect(screen.getByText('Continent')).toBeInTheDocument();
  expect(screen.getByText('Arguments')).toBeInTheDocument();
  const link = screen.getByText('ID');
  expect(link).toBeInTheDocument();
});
