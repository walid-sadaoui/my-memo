import React, { forwardRef } from "react";

interface LabelInputProps {
  label: string;
  type: string;
  id: string;
  name: string;
  classname?: string;
  required?: boolean;
  maxLength?: number;
}

const LabelInput = forwardRef<HTMLInputElement, LabelInputProps>(
  ({ label, type, id, name, maxLength }, ref) => {
    return (
      <React.Fragment>
        <label htmlFor={id} className="pt-4 font-bold">
          {label}
        </label>
        <input
          id={id}
          type={type}
          className="mr-2 flex-grow  border-2 border-gray-500 rounded-lg py-2 my-2 px-4 bg-gray-200 placeholder-gray-700 w-full"
          placeholder={label}
          name={name}
          ref={ref}
          maxLength={maxLength}
        />
      </React.Fragment>
    );
  }
);

export default LabelInput;
