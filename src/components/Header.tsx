import React, { FunctionComponent, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { postRequest } from "../api";
import { ReactComponent as UserCircle } from "../assets/images/user-circle.svg";
import { AuthContext } from "../AuthContext";
import classNames from "classnames";
interface HeaderProps {
  title?: string;
  logo?: string;
  categories?: string[];
  links?: string[];
  className?: string;
}

const Header: FunctionComponent<HeaderProps> = ({ title }) => {
  const { user, setUser } = useContext(AuthContext);
  const [navbarOpen, setNavbarOpen] = useState<boolean>(false);

  const logout = async (event: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const logoutResponse = await postRequest("/logout");
      if (logoutResponse) {
        // setErrorMessage
        console.log(logoutResponse);
      }
      if (setUser) {
        setUser(undefined);
      }
    } catch (error) {}
  };

  const toggleNav = () => {
    setNavbarOpen(!navbarOpen);
  };

  return (
    <header className="col-span-2 border-blue-500 border-b-8">
      <nav className="flex items-center justify-between p-4 font-sans w-full overflow-hidden min-w-full flex-wrap">
        <div className="sm:hidden mr-auto px-2">
          <button
            onClick={toggleNav}
            className="px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
          >
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <Link to="/">
          <pre className="font-hand text-3xl text-white pl-2">{title}</pre>
        </Link>
        {user ? (
          <button
            onClick={logout}
            className="inline-flex items-center p-2 rounded text-white hover:border-transparent hover:text-teal-500 hover:bg-white ml-auto"
          >
            <span>Deconnexion</span>
          </button>
        ) : (
          <Link
            to="/login"
            className="inline-flex items-center p-2 rounded text-white hover:border-transparent hover:text-teal-500 hover:bg-white ml-auto sm:order-last"
          >
            <UserCircle className="w-6 h-6" />
            <span className="hidden sm:flex sm:ml-2">Connexion</span>
          </Link>
        )}
        <div
          className={classNames(
            "sm:w-auto sm:flex-grow sm:flex sm:items-center text-lg",
            navbarOpen && "flex w-full"
          )}
          id="nav-content"
        >
          <ul
            className={classNames(
              "sm:flex sm:flex-row sm:ml-4",
              navbarOpen ? "flex flex-col items-stretch w-full py-2" : "hidden"
            )}
          >
            <li>
              <Link to="/notes" className="text-teal-200 hover:text-white mr-4">
                Notes
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
