import { FC } from 'react';

interface AuthServerErrorMessageParams {
  message: string;
}

const AuthServerErrorMessage: FC<AuthServerErrorMessageParams> = ({
  message,
}) => {
  return <div className="auth-message">{message}</div>;
};

export default AuthServerErrorMessage;
