import AuthForm from "../components/form/AuthForm.tsx";

const SignUp = () => {
    return (
        <div className='wrapper'>
            <h2 className="h2">Sign Up</h2>
            <AuthForm type={"signUp"}/>
        </div>
    );
};

export default SignUp;
