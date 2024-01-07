import { describe, it, expect } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import App from '../App.tsx';
import ErrorPage from '../pages/ErrorPage.tsx';
import { store } from '../store/store.ts';

describe('Tests for the 404 Page component', () => {
  it('Ensure that the 404 page is displayed when navigating to an invalid route.', () => {
    const { getByText } = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/something-wrong']}>
          <Routes>
            <Route path={'/'} element={<App />} />
            <Route
              path={'*'}
              element={<ErrorPage title="notFoundTitle" text="notFoundText" />}
            />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    const notFoundMessage = getByText('ERROR 404');
    expect(notFoundMessage).toBeInTheDocument();
  });
});
