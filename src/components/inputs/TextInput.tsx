import { FieldError, useFormContext } from 'react-hook-form';
import { forwardRef, useState } from 'react';

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
    const isError = error?.message;
    const { register } = useFormContext();
    const { onChange } = register(inputName);

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
        alt="show password"
      />
    ) : (
      <img
        className="textInput__passwordIcon"
        onClick={switchPasswordVisibility}
        src="./../../../public/invisible.svg"
        alt="hide pasword"
      />
    );

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
          type={hideInputData ? 'password' : type === 'password' ? 'text' : type}
        />
        <p className="inputItem__error">{isError ? error.message : ' '}</p>
        {type === 'password' && passwordIcon}
      </div>
    );
  }
);

export default TextInput;
