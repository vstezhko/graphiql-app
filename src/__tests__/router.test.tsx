import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { store } from '../store/store.ts';
import { Provider } from 'react-redux';
import SignIn from '../pages/SignIn.tsx';
import SignUp from '../pages/SignUp.tsx';

describe('GQLRouterProvider Component', () => {
  it('renders SignIn component when navigating to /signIn', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/signIn']}>
          <Routes>
            <Route path={'/signIn'} element={<SignIn />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Sign In')).toBeInTheDocument();
  });

  it('renders SignIn component when navigating to /signUp', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/signUp']}>
          <Routes>
            <Route path={'/signUp'} element={<SignUp />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Sign Up')).toBeInTheDocument();
  });
});
