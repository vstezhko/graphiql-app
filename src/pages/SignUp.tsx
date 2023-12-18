import AuthForm, {
  SignInValues,
  SignUpValues,
} from '../components/form/AuthForm.tsx';
import { signUp } from '../firebase/firebase.ts';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const SignUp = () => {
  const navigate = useNavigate();

  const [serverError, setServerError] = useState();
  const onSubmit = async (data: SignInValues | SignUpValues) => {
    const res = await signUp(data.email, data.password);
    if (res.error) {
      setServerError(await res.error);
      return;
    }
    setServerError(undefined);
    navigate('/main');
  };

  return (
    <div className="auth-page">
      <h2 className="h2">Sign Up</h2>
      <AuthForm
        type={'signUp'}
        onFormSubmit={onSubmit}
        serverError={serverError}
      />
    </div>
  );
};

export default SignUp;
