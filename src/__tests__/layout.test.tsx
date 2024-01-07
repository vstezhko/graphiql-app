import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Layout from '../components/layout/Layout.tsx';
import { Provider } from 'react-redux';
import { store } from '../store/store.ts';
import { expect } from 'vitest';

describe('Footer', () => {
  it('renders Layout', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Layout>test</Layout>
        </MemoryRouter>
      </Provider>
    );

    const footerElement = screen.getByTestId('footer');
    expect(footerElement).toBeInTheDocument();
    const footerLinks = screen.getAllByTestId('footerLink');
    expect(footerLinks).toHaveLength(3);
  });
});

describe('Header', () => {
  it('renders Layout', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Layout>test</Layout>
        </MemoryRouter>
      </Provider>
    );

    const headerElement = screen.getByTestId('header');
    expect(headerElement).toBeInTheDocument();

    const headersNavLinks = screen.getAllByTestId('headerNavLink');
    expect(headersNavLinks).toHaveLength(2);
  });

  it('opens and closes burger menu when burger button is clicked', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Layout>test</Layout>
        </MemoryRouter>
      </Provider>
    );

    const burgerButton = screen.getByText('Menu');
    expect(burgerButton).toBeInTheDocument();
    fireEvent.click(burgerButton);

    expect(screen.getByText('X')).toBeInTheDocument();

    const closeButton = screen.getByText('X');
    fireEvent.click(closeButton);

    expect(screen.queryByText('X')).not.toBeInTheDocument();
  });
});
