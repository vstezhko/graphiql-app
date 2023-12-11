import AuthForm, {
  SignInValues,
  SignUpValues,
} from '../components/form/AuthForm.tsx';
import {signUp} from "../firebase/firebase.ts";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

const SignUp = () => {
    const navigate = useNavigate()

    const [serverError, setSererError] = useState()
  const onSubmit = async (data: SignInValues | SignUpValues) => {
      const res = await signUp(data.email, data.password)
      if (res.error) {
          console.log(res.error)
          setSererError(res.error)
      }

      console.log(res.token)
      localStorage.setItem('token', JSON.stringify(res.token))
      setSererError(undefined)
      navigate('/')
  };

  return (
    <div className="wrapper">
      <h2 className="h2">Sign Up</h2>
      <AuthForm type={'signUp'} onFormSubmit={onSubmit} />
        {serverError && <p>{serverError}</p>}
    </div>
  );
};

export default SignUp;
