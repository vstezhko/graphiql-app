import AuthForm, {
  SignInValues,
  SignUpValues,
} from '../components/form/AuthForm.tsx';
import { signIn } from '../firebase/firebase.ts';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext.tsx';

const errorTooManyAttempts =
  'Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).';
const errorInvalidCredential = 'Firebase: Error (auth/invalid-credential).';

const SignIn = () => {
  const navigate = useNavigate();
  const { dictionary } = useContext(LanguageContext);

  const [serverError, setServerError] = useState<string>();
  const [serverInitialError, setServerInitialError] = useState<string>();

  useEffect(() => {
    const checkLoggedIn = async () => {
      if (localStorage.getItem('isLoggedIn') === 'true') {
        navigate('/main');
      }
    };

    checkLoggedIn();
  }, [navigate]);

  const onSubmit = async (data: SignInValues | SignUpValues) => {
    const res = await signIn(data.email, data.password);
    if (res.error) {
      const errorMessage = await res.error;
      setServerInitialError(errorMessage);
      if (errorMessage === errorInvalidCredential) {
        setServerError(dictionary.FirebaseErrorAuthInvalidCredential);
        return;
      }
      if (errorMessage === errorTooManyAttempts) {
        setServerError(dictionary.FirebaseErrorTooManyAttempts);
      }
      setServerError(errorMessage);
      return;
    }

    setServerError(undefined);
    navigate('/main');
  };

  useEffect(() => {
    if (serverInitialError === errorInvalidCredential) {
      setServerError(dictionary.FirebaseErrorAuthInvalidCredential);
      return;
    }
    if (serverInitialError === errorTooManyAttempts) {
      setServerError(dictionary.FirebaseErrorTooManyAttempts);
    }
  }, [dictionary]);

  return (
    <div className="auth-page">
      <h2 className="h2">{dictionary.signIn}</h2>
      <AuthForm
        type={'signIn'}
        onFormSubmit={onSubmit}
        serverError={serverError}
      />
    </div>
  );
};

export default SignIn;
