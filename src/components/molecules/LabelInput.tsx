import React, { forwardRef } from "react";
import Input from "../atoms/Input";

interface LabelInputProps {
  label: string;
  type: string;
  id: string;
  name: string;
  classname?: string;
  required?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  value?: string;
  maxLength?: number;
}

const LabelInput = forwardRef<HTMLInputElement, LabelInputProps>(
  ({ label, type, id, name, maxLength, ...otherProps }, ref) => {
    return (
      <React.Fragment>
        <label htmlFor={id} className="pt-4 font-bold">
          {label}
        </label>
        <Input
          id={id}
          type={type}
          placeholder={label}
          name={name}
          ref={ref}
          maxLength={maxLength}
          {...otherProps}
        />
      </React.Fragment>
    );
  }
);

export default LabelInput;
