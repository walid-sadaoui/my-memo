import React, { FunctionComponent, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { postRequest } from "../../../api";
import { AuthContext } from "../../../AuthContext";
import Button, { ButtonSize } from "../../atoms/Button";
import HeaderMobileDetail from "./HeaderMobileDetail";
import Title from "../../atoms/Title";

interface HeaderProps {
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

const AuthenticatedHeader: FunctionComponent<HeaderProps> = () => {
  const { setUser } = useContext(AuthContext);
  const [mobileNavOpen, setMobileNavOpen] = useState<boolean>(false);

  const logout = async (event: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const logoutResponse = await postRequest("/logout");
      if (logoutResponse) {
        console.log(logoutResponse);
      }
      if (setUser) {
        setUser(undefined);
      }
    } catch (error) {}
  };

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
          <Button
            icon="userCircle"
            size={ButtonSize.MEDIUM}
            onClick={(event): void => {
              setMobileNavOpen(false);
              logout(event);
            }}
          >
            <span id="button__label" className="hidden sm:ml-2 sm:flex">
              Déconnexion
            </span>
          </Button>
        </NavBar>
      </Header>
    </>
  );
};

export default AuthenticatedHeader;
