import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../AuthContext";
import Button, { ButtonSize } from "../../atoms/Button";
import Title from "../../atoms/Title";

interface HeaderMobileDetailProps {
  categories?: string[];
  links?: string[];
  className?: string;
  onClose: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

const LoginLink: React.FC<React.AnchorHTMLAttributes<HTMLAnchorElement>> = ({
  ...props
}) => {
  return (
    <Link
      to="/login"
      className="flex text-white rounded hover:text-teal-200"
      {...props}
    >
      <Button icon="userCircle" size={ButtonSize.MEDIUM} value="Connexion" />
    </Link>
  );
};

const NavBar: React.FC = ({ children }) => {
  return (
    <nav className="flex flex-col items-start h-screen p-4 font-sans">
      {children}
    </nav>
  );
};

const HeaderMobileDetail: FunctionComponent<HeaderMobileDetailProps> = ({
  onClose,
}) => {
  const { user, logout } = useAuth();

  return (
    <div className="absolute flex flex-col items-start w-screen h-screen text-white bg-blue-900 border-b-8 border-blue-500 z-100 sm:hidden">
      <div className="flex items-center justify-between w-full p-4">
        <Title onClick={onClose} />
        <Button
          icon="x"
          size={ButtonSize.MEDIUM}
          onClick={onClose}
          aria-label="Close"
        />
      </div>
      <NavBar>
        <ul className="flex flex-col items-start">
          <li className="py-2">
            <Link
              to="/notes"
              onClick={onClose}
              className="ml-2 mr-4 text-teal-200 hover:text-white"
            >
              Notes
            </Link>
          </li>
        </ul>
        {user ? (
          <Button
            icon="userCircle"
            size={ButtonSize.MEDIUM}
            onClick={(event): void => {
              onClose(event);
              logout();
            }}
          >
            <span className="sr-only sm:not-sr-only sm:ml-2 sm:flex">
              Déconnexion
            </span>
          </Button>
        ) : (
          <LoginLink onClick={onClose} />
        )}
      </NavBar>
    </div>
  );
};

export default HeaderMobileDetail;
