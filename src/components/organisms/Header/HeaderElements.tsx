import React from "react";

export const Header: React.FC = ({ children }) => {
  return (
    <header className="flex items-center justify-between col-span-2 text-white bg-blue-900 border-b-8 border-blue-500">
      {children}
    </header>
  );
};

export const NavBar: React.FC = ({ children }) => {
  return (
    <nav className="flex items-center justify-between p-4 overflow-hidden font-sans sm:w-full">
      {children}
    </nav>
  );
};
