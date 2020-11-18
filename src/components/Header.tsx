import React, { FunctionComponent, useContext } from "react";
import { Link } from "react-router-dom";
import { postRequest } from "../api";
import { ReactComponent as UserCircle } from "../assets/images/user-circle.svg";
import { AuthContext } from "../AuthContext";
interface HeaderProps {
  title?: string;
  logo?: string;
  categories?: string[];
  links?: string[];
  className?: string;
}

const Header: FunctionComponent<HeaderProps> = ({ title }) => {
  const { user, setUser } = useContext(AuthContext);

  const logout = async (event: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const logoutResponse = await postRequest("/logout");
      if (logoutResponse) {
        // setErrorMessage
        console.log(logoutResponse);
      }
      if (setUser) {
        setUser({});
      }
    } catch (error) {}
  };

  return (
    <header className="col-span-2">
      <nav className="flex items-center justify-between p-4 font-sans">
        <Link to="/">
          <span className="font-hand text-3xl text-white pl-2 mr-6">
            {title}
          </span>
        </Link>
        <div className="flex-grow flex items-center text-lg">
          <Link to="/notes" className="text-teal-200 hover:text-white mr-4">
            Notes
          </Link>
          {/* <a
            href="#responsive-header"
            className="text-teal-200 hover:text-white mr-4"
          >
            Expenses
          </a>
          <a
            href="#responsive-header"
            className="text-teal-200 hover:text-white mr-4"
          >
            Nutrition
          </a>
          <a
            href="#responsive-header"
            className="text-teal-200 hover:text-white mr-4"
          >
            Work
          </a>
          <a
            href="#responsive-header"
            className="text-teal-200 hover:text-white"
          >
            Dev
          </a> */}
          {user?.id ? (
            <button
              onClick={logout}
              className="inline-flex items-center p-2 rounded text-white hover:border-transparent hover:text-teal-500 hover:bg-white ml-auto"
            >
              <span>Deconnexion</span>
            </button>
          ) : (
            <Link
              to="/login"
              className="inline-flex items-center p-2 rounded text-white hover:border-transparent hover:text-teal-500 hover:bg-white ml-auto"
            >
              <UserCircle className="w-6 h-6 mr-2" />
              <span>Connexion</span>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
