import React, { FunctionComponent } from "react";
import Icon from "../Icon";

interface ButtonProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
  icon?: string;
  type?: "button" | "submit" | "reset" | undefined;
  size?: ButtonSize;
}

export enum ButtonSize {
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large",
}

const Button: FunctionComponent<ButtonProps> = ({
  children,
  className = "",
  onClick,
  icon,
  size = ButtonSize.MEDIUM,
  type,
  ...otherProps
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`py-2 px-2 rounded inline-flex ${className}`}
      {...otherProps}
    >
      {icon && <Icon icon={icon} size={size} />}
      {children}
    </button>
  );
};

export default Button;
