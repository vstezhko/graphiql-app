import AuthForm, {
  SignInValues,
  SignUpValues,
} from '../components/form/AuthForm.tsx';
import { signUp } from '../firebase/firebase.ts';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { LanguageContext } from '../context/LanguageContext.tsx';

const errorAlreadyInUse = 'Firebase: Error (auth/email-already-in-use).';

const SignUp = () => {
  const { dictionary } = useContext(LanguageContext);
  const navigate = useNavigate();

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
    const res = await signUp(data.email, data.password);
    if (res.error) {
      const errorMessage = await res.error;
      setServerInitialError(errorMessage);
      if (errorMessage === errorAlreadyInUse) {
        setServerError(dictionary.FirebaseErrorAuthEmailAlreadyInUse);
        return;
      }
      setServerError(errorMessage);
      return;
    }
    setServerError(undefined);
    navigate('/main');
  };

  useEffect(() => {
    if (serverInitialError === errorAlreadyInUse) {
      setServerError(dictionary.FirebaseErrorAuthEmailAlreadyInUse);
      return;
    }
  }, [dictionary]);

  return (
    <div className="auth-page" data-testid="signUp-page">
      <h2 className="h2" data-testid="signUp-title">
        {dictionary.signUp}
      </h2>
      <AuthForm
        type={'signUp'}
        onFormSubmit={onSubmit}
        serverError={serverError}
      />
    </div>
  );
};

export default SignUp;
