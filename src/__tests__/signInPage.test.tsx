import { MemoryRouter } from 'react-router-dom';
import SignIn from '../pages/SignIn.tsx';
import { fireEvent, render, waitFor } from '@testing-library/react';
import LanguageProvider from '../context/LanguageContext.tsx';
import { signIn } from '../firebase/firebase.ts';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock('../firebase/firebase');

describe('SignIn component', () => {
  it('renders sign-in page', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <LanguageProvider>
          <SignIn />
        </LanguageProvider>
      </MemoryRouter>
    );

    waitFor(() => {
      const signInPage = getByTestId('signIn-page');
      const signInTitle = getByTestId('signIn-title');

      expect(signInPage).toBeInTheDocument();
      expect(signInTitle).toBeInTheDocument();
    });
  });

  it('navigates to /main when already logged in', async () => {
    localStorage.setItem('isLoggedIn', 'true');

    render(
      <MemoryRouter>
        <LanguageProvider>
          <SignIn />
        </LanguageProvider>
      </MemoryRouter>
    );

    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/main'));
  });
  it('handles errors on form submission', async () => {
    signIn.mockResolvedValue({
      error: 'Custom error message',
    });

    const { getByLabelText, getByText } = render(<SignIn />);

    await waitFor(() => {
      const emailInput = getByLabelText('Email');
      const passwordInput = getByLabelText('Password');

      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'Password123!' } });
    });

    await waitFor(() => {
      const submitButton = getByText('SUBMIT');
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      const errorElement = getByText('Custom error message');
      expect(errorElement).toBeInTheDocument();
    });
  });
});
