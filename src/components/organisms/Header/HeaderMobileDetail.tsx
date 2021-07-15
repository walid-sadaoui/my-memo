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
      to={process.env.PUBLIC_URL + "/login"}
      className="flex text-white rounded hover:text-teal-200"
      {...props}
    >
      <Button icon="userCircle" size={ButtonSize.MEDIUM} value="Connexion" />
    </Link>
  );
};

const LogoutLink: React.FC<React.AnchorHTMLAttributes<HTMLAnchorElement>> = ({
  ...props
}) => {
  return (
    <Link
      to={process.env.PUBLIC_URL + "/logout"}
      className="flex text-white rounded hover:text-teal-200"
      {...props}
    >
      <Button icon="userCircle" size={ButtonSize.MEDIUM} value="Deconnexion" />
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
              to={process.env.PUBLIC_URL + "/notes"}
              onClick={onClose}
              className="ml-2 mr-4 text-teal-200 hover:text-white"
            >
              Notes
            </Link>
          </li>
        </ul>
        {user ? (
          <LogoutLink
            onClick={(event): void => {
              onClose(event);
              logout();
            }}
          />
        ) : (
          <LoginLink onClick={onClose} />
        )}
      </NavBar>
    </div>
  );
};

export default HeaderMobileDetail;
