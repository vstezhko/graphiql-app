import { FieldError, FormProvider, useForm } from 'react-hook-form';
import { Button } from '@mui/material';
import TextInput from '../inputs/TextInput.tsx';
import { FormFields, validationSchema } from '../../utils/validationSchema.ts';
import { yupResolver } from '@hookform/resolvers/yup';
import { FC, useContext } from 'react';
import AuthServerErrorMessage from '../AuthServerErrorMessage.tsx';
import { LanguageContext } from '../../context/LanguageContext.tsx';

export interface SignInValues {
  email: string;
  password: string;
}

export interface SignUpValues extends SignInValues {
  confirmPassword: string;
}

export interface AuthFormParams {
  type: 'signIn' | 'signUp';
  onFormSubmit: (data: SignInValues | SignUpValues) => void;
  serverError?: string | undefined;
}

const AuthForm: FC<AuthFormParams> = ({ type, onFormSubmit, serverError }) => {
  const { dictionary } = useContext(LanguageContext);
  const validationResolver =
    type === 'signIn' ? validationSchema.signIn : validationSchema.signUp;

  const methods = useForm({
    resolver: yupResolver(validationResolver as typeof validationSchema.signUp),
    mode: 'onChange',
  });

  const {
    handleSubmit,
    formState: { errors, dirtyFields },
    register,
  } = methods;

  const onSubmit = async (data: SignInValues | SignUpValues) => {
    onFormSubmit(data);
  };

  const filledFields = Object.values(dirtyFields).length;
  const isFilledAllFields =
    type === 'signIn' ? filledFields === 2 : filledFields === 3;
  const isValid = errors && !Object.keys(errors).length && isFilledAllFields;

  return (
    <FormProvider {...methods} data-testid="authForm">
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <TextInput
          id={FormFields.EMAIL}
          inputName={FormFields.EMAIL}
          label={dictionary.Email}
          type="text"
          {...register(FormFields.EMAIL)}
          error={errors[FormFields.EMAIL]}
        />
        <TextInput
          id={FormFields.PASSWORD}
          inputName={FormFields.PASSWORD}
          label={dictionary.Password}
          type="password"
          {...register(FormFields.PASSWORD)}
          error={errors[FormFields.PASSWORD]}
        />
        {type === 'signUp' && (
          <TextInput
            id={FormFields.CONFIRM_PASSWORD}
            inputName={FormFields.CONFIRM_PASSWORD}
            label={dictionary.ConfirmPassword}
            type="password"
            {...register(FormFields.CONFIRM_PASSWORD)}
            error={errors[FormFields.CONFIRM_PASSWORD] as FieldError}
          />
        )}

        <Button
          variant="outlined"
          type="submit"
          disabled={!isValid}
          data-testid="authForm-submit"
        >
          {dictionary.SUBMIT}
        </Button>
        {serverError && <AuthServerErrorMessage message={serverError} />}
      </form>
    </FormProvider>
  );
};

export default AuthForm;
