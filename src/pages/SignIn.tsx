import AuthForm, {
  SignInValues,
  SignUpValues,
} from '../components/form/AuthForm.tsx';
import {sighIn} from '../firebase/firebase.ts';
import {useNavigate} from "react-router-dom";
import {useState} from "react";

const SignIn = () => {
  const navigate = useNavigate()

  const [serverError, setSererError] = useState()
  const onSubmit = async (data: SignInValues | SignUpValues) => {
    const res = await sighIn(data.email, data.password);
    if (res.error) {
      console.log(res.error);
      setSererError(res.error)
    }

    console.log(res.token);
    localStorage.setItem('token', JSON.stringify(res.token));
    setSererError(undefined)
    navigate('/');
  };

  return (
    <div className="wrapper">
      <h2 className="h2">Sign In</h2>
      <AuthForm type={'signIn'} onFormSubmit={onSubmit}/>
      {serverError && <p>{serverError}</p>}
    </div>
  );
};

export default SignIn;
