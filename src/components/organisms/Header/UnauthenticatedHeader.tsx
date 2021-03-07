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
    <header className="flex items-center col-span-2 text-white bg-blue-900 border-b-8 border-blue-500">
      {children}
    </header>
  );
};

const NavBar: React.FC = ({ children }) => {
  return (
    <nav className="flex items-center justify-between w-full p-4 overflow-hidden font-sans">
      {children}
    </nav>
  );
};

const LoginLink: React.FC<React.AnchorHTMLAttributes<
  HTMLAnchorElement
>> = () => {
  return (
    <Link
      to="/login"
      className="flex items-end justify-end flex-1 text-white rounded hover:text-teal-200"
    >
      <Button icon="userCircle" size={ButtonSize.MEDIUM}>
        <span id="button__label" className="hidden sm:ml-2 sm:flex">
          Connexion
        </span>
      </Button>
    </Link>
  );
};

const ToggleMobileNavButton: React.FC<{
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}> = ({ onClick }) => {
  return (
    <div className="w-full p-4 sm:hidden">
      <Button
        icon="menu"
        size={ButtonSize.MEDIUM}
        className="w-full p-4 sm:hidden"
        onClick={onClick}
      />
    </div>
  );
};

const UnauthenticatedHeader: FunctionComponent<HeaderProps> = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState<boolean>(false);
  const navElements = [{ endpoint: "/notes", label: "Notes" }];

  return (
    <>
      {mobileNavOpen && <HeaderMobileDetail />}
      <Header>
        <ToggleMobileNavButton
          onClick={(): void => {
            console.log("cliques");
            setMobileNavOpen(true);
          }}
        />
        <Title />
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
