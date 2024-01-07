import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render, waitFor } from '@testing-library/react';
import LanguageProvider from '../context/LanguageContext.tsx';
import SignUp from '../pages/SignUp.tsx';
import { signUp } from '../firebase/firebase.ts';

vi.mock('../firebase/firebase');

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('SignUp component', () => {
  it('renders sign-up page', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <LanguageProvider>
          <SignUp />
        </LanguageProvider>
      </MemoryRouter>
    );

    waitFor(() => {
      const signUpPage = getByTestId('signUp-page');
      const signUpTitle = getByTestId('signUp-title');

      expect(signUpPage).toBeInTheDocument();
      expect(signUpTitle).toBeInTheDocument();
    });
  });

  it('navigates to /main when already logged in', async () => {
    localStorage.setItem('isLoggedIn', 'true');

    render(
      <MemoryRouter>
        <LanguageProvider>
          <SignUp />
        </LanguageProvider>
      </MemoryRouter>
    );

    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/main'));
  });

  it('handles errors on form submission', async () => {
    signUp.mockResolvedValue({
      error: 'Custom error message',
    });

    const { getByLabelText, getByText } = render(<SignUp />);

    await waitFor(() => {
      const emailInput = getByLabelText('Email');
      const passwordInput = getByLabelText('Password');
      const confirmPasswordInput = getByLabelText('Confirm Password');

      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'Password123!' } });
      fireEvent.change(confirmPasswordInput, {
        target: { value: 'Password123!' },
      });
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
