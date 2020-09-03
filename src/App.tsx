import React, { FunctionComponent } from "react";
import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";
import Notes from "./Components/Notes";

const App: FunctionComponent = () => {
  return (
    <React.Fragment>
      <Header title="My Memo" />
      <Sidebar />
      <main
        role="main"
        className="bg-primary rounded-tl-lg overflow-hidden flex flex-grow"
      >
        <Notes />
      </main>
    </React.Fragment>
  );
};

export default App;
