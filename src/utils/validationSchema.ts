import { object, string, ref } from 'yup';

export enum FormFields {
  EMAIL = 'email',
  PASSWORD = 'password',
  CONFIRM_PASSWORD = 'confirmPassword',
}

export const validationSchema = {
  signIn: object().shape({
    [FormFields.EMAIL]: string()
      .required('Email is required')
      .email('Invalid email format'),

    [FormFields.PASSWORD]: string()
      .required('Password is required')
      .matches(/^(?=.*\d)/, 'need 1 digit')
      .matches(/(?=.*[A-Z])/, 'need 1 uppercase (A-Z)')
      .matches(/(?=.*[a-z])/, 'need 1 lowercase (a-z)')
      .matches(
        /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/,
        'need 1 special symbol'
      ),
  }),
  signUp: object().shape({
    [FormFields.EMAIL]: string()
      .required('Email is required')
      .email('Invalid email format'),

    [FormFields.PASSWORD]: string()
      .required('Password is required')
      .matches(/^(?=.*\d)/, 'need 1 digit')
      .matches(/(?=.*[A-Z])/, 'need 1 uppercase (A-Z)')
      .matches(/(?=.*[a-z])/, 'need 1 lowercase (a-z)')
      .matches(
        /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/,
        'need 1 special symbol'
      ),

    [FormFields.CONFIRM_PASSWORD]: string()
      .required('Confirm Password is required')
      .matches(/(?=.*[A-Z])/, 'need 1 uppercase (A-Z)')
      .matches(/(?=.*[a-z])/, 'need 1 lowercase (a-z)')
      .matches(/[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/, 'need 1 special symbol')
      .oneOf([ref(FormFields.PASSWORD)], 'Passwords must match'),
  }),
};
