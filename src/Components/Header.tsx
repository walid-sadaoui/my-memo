import React, { FunctionComponent } from "react";
import { ReactComponent as Download } from "../assets/images/download.svg";

interface HeaderProps {
  title?: string;
  logo?: string;
  categories?: string[];
  links?: string[];
  className?: string;
}

const Header: FunctionComponent<HeaderProps> = ({ title }) => {
  return (
    <header className="bg-secondary">
      <nav className="flex items-center justify-between p-4 font-content">
        <span className="font-hand text-3xl text-white pl-2 mr-6">{title}</span>
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
          <a
            href="/"
            className="inline-flex items-center p-2 rounded text-white hover:border-transparent hover:text-teal-500 hover:bg-white ml-auto"
          >
            <Download className="w-6 h-6 mr-2" />
            <span>Download</span>
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Header;
