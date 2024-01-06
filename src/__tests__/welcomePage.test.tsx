import { act, render, waitFor } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import WelcomePage from '../pages/welcomPage/WelcomePage.tsx';
import LanguageProvider from '../context/LanguageContext.tsx';
import { store } from '../store/store';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { setLoading, setStatus } from '../store/slices/isLoggedInSlice.ts';

test('renders welcome page', async () => {
  render(
    <MemoryRouter>
      <Provider store={store}>
        <LanguageProvider>
          <WelcomePage />
        </LanguageProvider>
      </Provider>
    </MemoryRouter>
  );

  const welcomePage = screen.getByTestId('welcome-page');
  expect(welcomePage).toBeInTheDocument();
});

test('not renders block with links while loading', async () => {
  act(() => {
    store.dispatch(setLoading(true));
  });

  render(
    <MemoryRouter>
      <Provider store={store}>
        <LanguageProvider>
          <WelcomePage />
        </LanguageProvider>
      </Provider>
    </MemoryRouter>
  );

  await waitFor(() => {
    const welcomePageLinks = screen.queryByTestId('welcome-page__links');
    expect(welcomePageLinks).toBeNull();
  });
});

test('renders sign in and sign up buttons when logged out', async () => {
  act(() => {
    store.dispatch(setLoading(false));
    store.dispatch(setStatus(false));
  });

  render(
    <MemoryRouter>
      <Provider store={store}>
        <LanguageProvider>
          <WelcomePage />
        </LanguageProvider>
      </Provider>
    </MemoryRouter>
  );

  await waitFor(() => {
    const signInLink = screen.queryByTestId('signIn-link');
    const signUpLink = screen.queryByTestId('signUp-link');
    expect(signInLink).toBeInTheDocument();
    expect(signUpLink).toBeInTheDocument();
  });
});
