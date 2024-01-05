import { act, fireEvent, render, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../store/store.ts';
import { screen } from '@testing-library/dom';
import DocumentationSection, {
  Documentation,
} from '../components/documentationComponent/DocumentationSection.tsx';
import { expect, Mock } from 'vitest';
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

it('should not render the back button when no type is selected', () => {
  render(
    <Provider store={store}>
      <DocumentationSection />
    </Provider>
  );

  const backButton = screen.queryByTestId('backBtn');
  expect(backButton).not.toBeInTheDocument();
});

it('should render the back button when a type is selected, should back history', async () => {
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
    const typeElement = screen.getByText('ID');
    fireEvent.click(typeElement);
    const backButton = screen.getByTestId('backBtn');
    expect(backButton).toBeInTheDocument();
  });
});

test('should click on links and call the mock function', async () => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockSchema),
      ok: true,
      status: 200,
    })
  ) as Mock;

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
    const link = screen.getByText('Query');
    expect(link).toBeInTheDocument();
  });
});

test('test TypeList component', () => {
  const schema = mockSchema.data.__schema.types as Documentation[];
  const queryType = mockSchema.data?.__schema?.queryType?.name as string;
  const root = schema?.find(
    (s: Documentation) => s.name === queryType
  ) as Documentation;

  const list = schema.find(
    (s: Documentation) => s.name === 'Continent'
  ) as Documentation;

  const mockFunction = vi.fn();

  render(
    <TypesList
      list={list}
      handleTypeClick={mockFunction}
      schema={schema}
      root={root}
    />
  );

  expect(screen.getByText('Continent')).toBeInTheDocument();
  expect(screen.getByText('Arguments')).toBeInTheDocument();
  const links = screen.getAllByTestId('link');
  expect(links.length).toBeGreaterThan(0);
  links.forEach((link) => {
    fireEvent.click(link);
    expect(mockFunction).toHaveBeenCalled();
  });
});
