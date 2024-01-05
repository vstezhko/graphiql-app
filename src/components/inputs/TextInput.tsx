import { FieldError, useFormContext } from 'react-hook-form';
import { forwardRef, useContext, useState } from 'react';
import { LanguageContext } from '../../context/LanguageContext.tsx';
import { ErrorsKeys } from '../../utils/validationSchema.ts';

type TextInputTypes = 'text' | 'password';

export interface TextInputParams {
  type: TextInputTypes;
  id: string;
  inputName: string;
  label: string;
  error?: FieldError | undefined;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputParams>(
  ({ label, inputName, id, type, error, ...rest }, ref) => {
    const [hideInputData, setHideInputData] = useState(type === 'password');
    const isError = error?.message as ErrorsKeys | undefined;
    const { register } = useFormContext();
    const { onChange } = register(inputName);
    const { dictionary } = useContext(LanguageContext);

    const switchPasswordVisibility = () => {
      setHideInputData((prevState) => !prevState);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange(event);
    };

    const passwordIcon = hideInputData ? (
      <img
        className="textInput__passwordIcon"
        onClick={switchPasswordVisibility}
        src="./../../../public/eye.svg"
        alt={dictionary.showPassword}
      />
    ) : (
      <img
        className="textInput__passwordIcon"
        onClick={switchPasswordVisibility}
        src="./../../../public/invisible.svg"
        alt={dictionary.hidePassword}
      />
    );

    const errorText = isError
      ? dictionary[isError]
        ? dictionary[isError]
        : error?.message
      : '';

    return (
      <div className="textInput inputItem">
        <label htmlFor={id}>{label}</label>
        <input
          className={`textInput__input ${
            isError ? 'textInput__input_error' : ''
          }`}
          ref={ref}
          id={id}
          name={inputName}
          onChange={handleChange}
          {...rest}
          type={
            hideInputData ? 'password' : type === 'password' ? 'text' : type
          }
        />
        <p className="inputItem__error">{errorText}</p>
        {type === 'password' && passwordIcon}
      </div>
    );
  }
);

export default TextInput;
