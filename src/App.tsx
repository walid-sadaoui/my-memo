import React, { FunctionComponent } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Notes from "./components/Notes";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";

const App: FunctionComponent = () => {
  return (
    <Router>
      <Header title="My Memo" />
      <Sidebar />
      <main
        role="main"
        className="bg-white rounded-tl-lg overflow-hidden flex flex-grow"
      >
        <Route exact={true} path="/" component={Notes} />
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={LogIn} />
      </main>
    </Router>
  );
};

export default App;
