import { render, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import AuthForm, { AuthFormParams } from '../components/form/AuthForm.tsx';

describe('AuthForm', () => {
  const onSubmitMock = vi.fn();
  const defaultProps: AuthFormParams = {
    type: 'signIn',
    onFormSubmit: onSubmitMock,
    serverError: undefined,
  };

  it('renders SignIn form correctly', async () => {
    const { getByLabelText } = render(<AuthForm {...defaultProps} />);

    expect(getByLabelText('Email')).toBeInTheDocument();
    expect(getByLabelText('Password')).toBeInTheDocument();
  });

  it('renders SignUp form correctly', async () => {
    const signUpProps: AuthFormParams = { ...defaultProps, type: 'signUp' };
    const { getByLabelText } = render(<AuthForm {...signUpProps} />);

    expect(getByLabelText('Email')).toBeInTheDocument();
    expect(getByLabelText('Password')).toBeInTheDocument();
    expect(getByLabelText('Confirm Password')).toBeInTheDocument();
  });

  it('calls onFormSubmit with correct data on form submission', async () => {
    const { getByLabelText, getByTestId } = render(
      <AuthForm {...defaultProps} />
    );

    await waitFor(() => {
      fireEvent.change(getByLabelText('Email'), {
        target: { value: 'test@example.com' },
      });
      fireEvent.change(getByLabelText('Password'), {
        target: { value: 'Password123!' },
      });
    });

    await act(() => {
      const submitButton = getByTestId('authForm-submit');
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      try {
        expect(onSubmitMock).toHaveBeenCalledWith({
          email: 'test@example.com',
          password: 'Password123!',
        });
      } catch (error) {
        throw error;
      }
    });
  });
});
