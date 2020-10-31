import React, { FunctionComponent } from "react";

interface LabelInputProps {
  label: string;
  type: string;
  id: string;
  classname?: string;
  required?: boolean;
}

const LabelInput: FunctionComponent<LabelInputProps> = ({
  label,
  type,
  id,
}) => {
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
        required
        aria-required
      />
    </React.Fragment>
  );
};

export default LabelInput;
