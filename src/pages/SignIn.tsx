import AuthForm from '../components/form/AuthForm.tsx';

const SignIn = () => {
  return (
    <div className='wrapper'>
      <h2 className="h2">Sign In</h2>
      <AuthForm type={'signIn'}/>
    </div>
  );
};

export default SignIn;
