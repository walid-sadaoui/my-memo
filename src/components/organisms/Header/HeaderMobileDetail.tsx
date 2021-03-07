import React, { FunctionComponent, useState } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import Button, { ButtonSize } from "../../atoms/Button";
import Title from "../../atoms/Title";
import useWindowSize, {
  widthBreakpoints,
} from "../../../shared/hooks/useWindowSize";

interface HeaderMobileDetailProps {
  title?: string;
  logo?: string;
  categories?: string[];
  links?: string[];
  className?: string;
}

const LoginLink: React.FC<React.AnchorHTMLAttributes<
  HTMLAnchorElement
>> = () => {
  return (
    <Link
      to="/login"
      className="flex items-start justify-end flex-1 text-white rounded hover:text-teal-200"
    >
      <Button icon="userCircle" size={ButtonSize.MEDIUM} value="Connexion" />
    </Link>
  );
};

const NavBar: React.FC = ({ children }) => {
  return (
    <nav className="flex flex-col items-start justify-between w-full h-screen p-4 overflow-hidden font-sans">
      {children}
    </nav>
  );
};

const CloseMobileNavButton: React.FC<{
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}> = ({ onClick }) => {
  return (
    <div className="w-full sm:hidden">
      <Button icon="x" size={ButtonSize.MEDIUM} onClick={onClick} />
    </div>
  );
};

const HeaderMobileDetail: FunctionComponent<HeaderMobileDetailProps> = ({}) => {
  const [mobileNavOpen, setMobileNavOpen] = useState<boolean>();
  const windowSize = useWindowSize();

  const headerClass = classNames(
    "flex bg-blue-900 border-blue-500 border-b-8 text-white items-center",
    mobileNavOpen && "h-screen sm:h-auto flex-wrap"
  );

  const navClass = classNames(
    "flex p-4 font-sans overflow-hidden",
    mobileNavOpen
      ? "flex-col items-start sm:items-center w-full h-screen sm:flex-row sm:h-auto flex-b"
      : "items-center justify-between w-full"
  );

  return (
    <div className="absolute flex flex-col items-start w-screen h-screen text-white bg-blue-900 border-b-8 border-blue-500 z-100 sm:hidden">
      <div className="flex items-center justify-between w-full p-4">
        <CloseMobileNavButton onClick={(): void => setMobileNavOpen(true)} />
        <Title />
      </div>
      <NavBar>
        <ul className="flex flex-col items-start">
          <li className="py-2">
            <Link
              to="/notes"
              onClick={(): void => setMobileNavOpen(false)}
              className="ml-2 mr-4 text-teal-200 hover:text-white"
            >
              Notes
            </Link>
          </li>
        </ul>
        <LoginLink onClick={(): void => setMobileNavOpen(false)} />
      </NavBar>
    </div>
  );
};

export default HeaderMobileDetail;
