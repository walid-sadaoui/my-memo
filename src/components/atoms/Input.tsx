import React, { forwardRef } from "react";

interface InputProps {
  type: string;
  id?: string;
  name: string;
  placeholder?: string;
  className?: string;
  required?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  value?: string;
  maxLength?: number;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type, id, name, placeholder, maxLength, ...otherProps }, ref) => {
    return (
      <input
        id={id}
        type={type}
        className="mr-2 flex-grow border-2 border-gray-500 rounded-lg py-2 my-2 px-4 bg-gray-200 placeholder-gray-700 w-full"
        placeholder={placeholder}
        name={name}
        ref={ref}
        maxLength={maxLength}
        {...otherProps}
      />
    );
  }
);

export default Input;
