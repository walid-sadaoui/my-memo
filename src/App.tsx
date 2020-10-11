import React, { FunctionComponent } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Notes from "./components/Notes";

const App: FunctionComponent = () => {
  return (
    <React.Fragment>
      <Header title="My Memo" />
      <Sidebar />
      <main
        role="main"
        className="bg-white rounded-tl-lg overflow-hidden flex flex-grow"
      >
        <Notes />
      </main>
    </React.Fragment>
  );
};

export default App;
