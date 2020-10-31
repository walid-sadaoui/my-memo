import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as UserCircle } from "../assets/images/user-circle.svg";
interface HeaderProps {
  title?: string;
  logo?: string;
  categories?: string[];
  links?: string[];
  className?: string;
}

const Header: FunctionComponent<HeaderProps> = ({ title }) => {
  return (
    <header className="col-span-2">
      <nav className="flex items-center justify-between p-4 font-sans">
        <Link to="/">
          <span className="font-hand text-3xl text-white pl-2 mr-6">
            {title}
          </span>
        </Link>
        <div className="flex-grow flex items-center text-lg">
          <a
            href="#responsive-header"
            className="text-teal-200 hover:text-white mr-4"
          >
            Dashboard
          </a>
          <a
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
          </a>
          <Link
            to="/login"
            className="inline-flex items-center p-2 rounded text-white hover:border-transparent hover:text-teal-500 hover:bg-white ml-auto"
          >
            <UserCircle className="w-6 h-6 mr-2" />
            <span>Connexion</span>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
