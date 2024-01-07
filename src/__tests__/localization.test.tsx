import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../store/store.ts';
import { MemoryRouter } from 'react-router-dom';
import Layout from '../components/layout/Layout.tsx';
import { expect } from 'vitest';

describe('Localization Component', () => {
  it('renders language button', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Layout>test</Layout>
        </MemoryRouter>
      </Provider>
    );

    const langBtn = screen.getByTestId('langBtn');
    expect(langBtn).toBeInTheDocument();
    fireEvent.click(langBtn);
    const popover = screen.getByTestId('popover');
    expect(popover).toBeInTheDocument();
    expect(screen.getAllByRole('menuitem')).toHaveLength(2);
    const englishLangElement = screen.getByText('English');
    fireEvent.click(englishLangElement);
    const signIn = screen.getByTestId('signIn');
    expect(signIn.textContent).toBe('Sign In');
  });
});
