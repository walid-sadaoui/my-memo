import React, { FunctionComponent, useState } from "react";
import { Link } from "react-router-dom";
import Button, { ButtonSize } from "../../atoms/Button";
import Title from "../../atoms/Title";
import HeaderMobileDetail from "./HeaderMobileDetail";

interface HeaderProps {
  logo?: string;
  categories?: string[];
  links?: string[];
  className?: string;
}

const Header: React.FC = ({ children }) => {
  return (
    <header className="flex items-center justify-between col-span-2 text-white bg-blue-900 border-b-8 border-blue-500">
      {children}
    </header>
  );
};

const NavBar: React.FC = ({ children }) => {
  return (
    <nav className="flex items-center justify-between p-4 overflow-hidden font-sans">
      {children}
    </nav>
  );
};

const LoginLink: React.FC<React.AnchorHTMLAttributes<HTMLAnchorElement>> = ({
  ...otherProps
}) => {
  return (
    <Link
      to="/login"
      className="flex items-end justify-end flex-1 text-white rounded hover:text-teal-200"
      {...otherProps}
    >
      <Button icon="userCircle" size={ButtonSize.MEDIUM}>
        <span id="button__label" className="hidden sm:ml-2 sm:flex">
          Connexion
        </span>
      </Button>
    </Link>
  );
};

const UnauthenticatedHeader: FunctionComponent<HeaderProps> = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState<boolean>(false);
  // const navElements = [{ endpoint: "/notes", label: "Notes" }];

  return (
    <>
      {mobileNavOpen && (
        <HeaderMobileDetail onClose={(): void => setMobileNavOpen(false)} />
      )}
      <Header>
        <Button
          icon="menu"
          size={ButtonSize.MEDIUM}
          onClick={(): void => setMobileNavOpen(true)}
          className="m-4 sm:hidden"
        />
        <Title onClick={(): void => setMobileNavOpen(false)} />
        <NavBar>
          <ul className="hidden sm:flex sm:flex-row sm:mr-auto sm:ml-4 sm:w-auto">
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
      </Header>
    </>
  );
};

export default UnauthenticatedHeader;
