import React, { FunctionComponent } from "react";
import Header from "./Components/Header";

const App: FunctionComponent = () => {
  return (
    <React.Fragment>
      <Header title="My Memo" />
      <nav className="flex flex-col p-4">
        <div className="hidden">
          <button className="px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
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
        <div className="flex flex-col flex-grow font-content text-lg">
          <a
            href="#responsive-header"
            className="px-2 mt-4 text-teal-200 hover:text-white mb-4"
          >
            Docs
          </a>
          <a
            href="#responsive-header"
            className="px-2 mt-4 text-teal-200 hover:text-white mb-4"
          >
            Examples
          </a>
          <a
            href="#responsive-header"
            className="px-2 mt-4 text-teal-200 hover:text-white mb-4"
          >
            Blog
          </a>
          <a
            href="/"
            className="inline-flex items-center p-2 rounded text-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-auto"
          >
            {/* <svg-icon
              src="assets/icons/cog.svg"
              [svgClass]="'w-6 h-6 mr-2'"
            ></svg-icon> */}
            <span>Settings</span>
          </a>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default App;
