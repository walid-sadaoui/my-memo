import React, { FunctionComponent } from "react";
import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";

const App: FunctionComponent = () => {
  return (
    <React.Fragment>
      <Header title="My Memo" />
      <Sidebar />
    </React.Fragment>
  );
};

export default App;
