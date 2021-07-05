import React, { FunctionComponent, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../AuthContext";
import Button, { ButtonSize } from "../../atoms/Button";
import HeaderMobileDetail from "./HeaderMobileDetail";
import Title from "../../atoms/Title";
import { Header, NavBar } from "./HeaderElements";

interface HeaderProps {
  categories?: string[];
  links?: string[];
  className?: string;
}

const AuthenticatedHeader: FunctionComponent<HeaderProps> = () => {
  const { logout } = useAuth();
  const [mobileNavOpen, setMobileNavOpen] = useState<boolean>(false);

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
          aria-label="Menu"
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
              logout();
            }}
          >
            <span className="sr-only sm:not-sr-only sm:ml-2 sm:flex">
              Déconnexion
            </span>
          </Button>
        </NavBar>
      </Header>
    </>
  );
};

export default AuthenticatedHeader;
