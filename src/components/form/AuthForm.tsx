import { FieldError, FormProvider, useForm } from 'react-hook-form';
import { Button } from '@mui/material';
import TextInput from '../inputs/TextInput.tsx';
import { FormFields, validationSchema } from '../../utils/validationSchema.ts';
import { yupResolver } from '@hookform/resolvers/yup';
import { FC } from 'react';

export interface SignInValues {
  email: string;
  password: string;
}

export interface SignUpValues extends SignInValues {
  confirmPassword: string;
}

export interface AuthFormParams {
  type: 'signIn' | 'signUp';
}

const AuthForm: FC<AuthFormParams> = ({ type }) => {
  const validationResolver =
    type === 'signIn' ? validationSchema.signIn : validationSchema.signUp;

  const methods = useForm({
    resolver: yupResolver(validationResolver as typeof validationSchema.signUp),
  });

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = methods;

  const onSubmit = async (data: SignInValues) => {
    console.log(data);
  };

  const isValid = errors && !Object.keys(errors).length;

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="form"
      >
        <TextInput
          id={FormFields.EMAIL}
          inputName={FormFields.EMAIL}
          label="Email"
          type="text"
          {...register(FormFields.EMAIL)}
          error={errors[FormFields.EMAIL]}
        />
        <TextInput
          id={FormFields.PASSWORD}
          inputName={FormFields.PASSWORD}
          label="Password"
          type="password"
          {...register(FormFields.PASSWORD)}
          error={errors[FormFields.PASSWORD]}
        />
        {type === 'signUp' && (
          <TextInput
            id={FormFields.CONFIRM_PASSWORD}
            inputName={FormFields.CONFIRM_PASSWORD}
            label="Confirm password"
            type="password"
            {...register(FormFields.CONFIRM_PASSWORD)}
            error={errors[FormFields.CONFIRM_PASSWORD] as FieldError}
          />
        )}

        <Button variant="outlined" type="submit" disabled={!isValid}>
          Submit
        </Button>
      </form>
    </FormProvider>
  );
};

export default AuthForm;
