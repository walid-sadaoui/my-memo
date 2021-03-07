import React, { FunctionComponent, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { postRequest } from "../../../api";
import { AuthContext } from "../../../AuthContext";
import classNames from "classnames";
import Button from "../../atoms/Button";
import Icon from "../../atoms/Icon";

interface HeaderProps {
  title?: string;
  logo?: string;
  categories?: string[];
  links?: string[];
  className?: string;
}

const AuthenticatedHeader: FunctionComponent<HeaderProps> = ({ title }) => {
  const { setUser } = useContext(AuthContext);
  const [navbarOpen, setNavbarOpen] = useState<boolean>(false);

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
    <header
      className={classNames(
        "flex col-span-2 bg-blue-900 border-blue-500 border-b-8",
        navbarOpen && "h-screen sm:h-auto"
      )}
    >
      <div
        className={classNames(
          navbarOpen
            ? "flex flex-1 sm:hidden px-4 py-6 order-last self-start justify-end"
            : "hidden"
        )}
      >
        <Button onClick={(): void => setNavbarOpen(!navbarOpen)}>
          <Icon icon="x" size="large" />
          {/* <X className="w-8 h-8 text-white hover:text-teal-200" /> */}
        </Button>
      </div>
      <nav
        className={classNames(
          "flex p-4 font-sans overflow-hidden",
          navbarOpen
            ? "flex-col items-start sm:items-center w-auto sm:w-full h-screen sm:flex-row sm:h-auto"
            : "items-center justify-between w-full"
        )}
      >
        <div
          className={classNames(
            "flex flex-1 sm:hidden px-2",
            navbarOpen && "hidden"
          )}
        >
          <Button onClick={(): void => setNavbarOpen(!navbarOpen)}>
            <Icon icon="menu" size="medium" />
          </Button>
        </div>
        <Link
          to="/"
          className={classNames("flex-none sm:pl-4", navbarOpen && "pl-2")}
          onClick={(): void => setNavbarOpen(!navbarOpen)}
        >
          <pre className="text-3xl text-white font-hand hover:text-teal-200">
            {title}
          </pre>
        </Link>
        <ul
          className={classNames(
            "sm:flex sm:flex-row sm:mr-auto sm:ml-4 sm:w-auto",
            navbarOpen ? "flex w-full flex-col items-stretch" : "hidden"
          )}
        >
          <li className="py-2">
            <Link
              to="/notes"
              onClick={(): void => setNavbarOpen(!navbarOpen)}
              className="ml-2 mr-4 text-teal-200 hover:text-white"
            >
              Notes
            </Link>
          </li>
        </ul>
        <Button
          className={classNames(
            "inline-flex justify-end items-center p-2 rounded text-white hover:text-teal-200",
            !navbarOpen && "flex-1"
          )}
          onClick={logout}
        >
          <Icon icon="userCircle" size="medium" />
          <span
            className={classNames(
              "sm:flex sm:ml-2",
              navbarOpen ? "flex ml-2" : "hidden"
            )}
          >
            Deconnexion
          </span>
        </Button>
      </nav>
    </header>
  );
};

export default AuthenticatedHeader;
