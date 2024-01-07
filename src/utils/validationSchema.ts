import { object, string, ref } from 'yup';

export enum FormFields {
  EMAIL = 'email',
  PASSWORD = 'password',
  CONFIRM_PASSWORD = 'confirmPassword',
}

export enum ErrorsKeys {
  EmailIsRequired = 'EmailIsRequired',
  InvalidEmailFormat = 'InvalidEmailFormat',
  PasswordIsRequired = 'PasswordIsRequired',
  Need1Digit = 'Need1Digit',
  Need1UppercaseAZ = 'Need1UppercaseAZ',
  Need1LowerCaseAZ = 'Need1LowerCaseAZ',
  Min8Characters = 'Min8Characters',
  Need1SpecialSymbol = 'Need1SpecialSymbol',
  ConfirmPasswordIsRequired = 'ConfirmPasswordIsRequired',
  PasswordsMustMatch = 'PasswordsMustMatch',
}

export const validationSchema = {
  signIn: object().shape({
    [FormFields.EMAIL]: string()
      .required(ErrorsKeys.EmailIsRequired)
      .email(ErrorsKeys.InvalidEmailFormat)
      .matches(
        /^[\w-]+@[a-zA-Z\d-]+\.[a-zA-Z]{2,}/,
        ErrorsKeys.InvalidEmailFormat
      ),

    [FormFields.PASSWORD]: string()
      .required(ErrorsKeys.PasswordIsRequired)
      .matches(/^(?=.*\d)/, ErrorsKeys.Need1Digit)
      .matches(/(?=.*[A-ZА-Я])/u, ErrorsKeys.Need1UppercaseAZ)
      .matches(/(?=.*[a-zа-я])/u, ErrorsKeys.Need1LowerCaseAZ)
      .min(8, ErrorsKeys.Min8Characters)
      .matches(
        /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/,
        ErrorsKeys.Need1SpecialSymbol
      ),
  }),
  signUp: object().shape({
    [FormFields.EMAIL]: string()
      .required(ErrorsKeys.EmailIsRequired)
      .email(ErrorsKeys.InvalidEmailFormat)
      .matches(
        /^[\w-]+@[a-zA-Z\d-]+\.[a-zA-Z]{2,}/,
        ErrorsKeys.InvalidEmailFormat
      ),

    [FormFields.PASSWORD]: string()
      .required(ErrorsKeys.PasswordIsRequired)
      .matches(/^(?=.*\d)/, ErrorsKeys.Need1Digit)
      .matches(/(?=.*[A-ZА-Я])/u, ErrorsKeys.Need1UppercaseAZ)
      .matches(/(?=.*[a-zа-я])/u, ErrorsKeys.Need1LowerCaseAZ)
      .min(8, ErrorsKeys.Min8Characters)
      .matches(
        /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/,
        ErrorsKeys.Need1SpecialSymbol
      ),

    [FormFields.CONFIRM_PASSWORD]: string()
      .required(ErrorsKeys.ConfirmPasswordIsRequired)
      .matches(/(?=.*[A-Z])/, ErrorsKeys.Need1UppercaseAZ)
      .matches(/(?=.*[a-z])/, ErrorsKeys.Need1LowerCaseAZ)
      .matches(
        /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/,
        ErrorsKeys.Need1SpecialSymbol
      )
      .min(8, 'min 8 characters')
      .oneOf([ref(FormFields.PASSWORD)], ErrorsKeys.PasswordsMustMatch),
  }),
};
