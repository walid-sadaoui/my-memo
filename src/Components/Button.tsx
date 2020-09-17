import React, { FunctionComponent } from "react";

interface ButtonProps {
  title: string;
  onClick?: any;
}
const Button: FunctionComponent<ButtonProps> = ({ title, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="self-start border-2 rounded bg-secondary px-2 text-white"
    >
      {title}
    </button>
  );
};

export default Button;
