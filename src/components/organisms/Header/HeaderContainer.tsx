import React, { FunctionComponent, useState } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import Button, { ButtonSize } from "../../atoms/Button";
import Title from "../../atoms/Title";
import useWindowSize, {
  widthBreakpoints,
} from "../../../shared/hooks/useWindowSize";

interface HeaderContainerProps {
  children?: React.ReactChild;
}

const HeaderContainer: FunctionComponent<HeaderContainerProps> = ({
  children,
}) => {
  return (
    <header
      className={classNames(
        "flex bg-blue-900 border-blue-500 border-b-8 text-white items-center"
      )}
    >
      {children}
    </header>
  );
};

export default HeaderContainer;
