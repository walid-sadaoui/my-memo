import React, { FunctionComponent } from "react";
import UnauthenticatedHeader from "./organisms/Header/UnauthenticatedHeader";
import Notes from "./pages/Notes";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";

const UnauthenticatedApp: FunctionComponent = () => {
  return (
    <Router>
      <UnauthenticatedHeader />
      <main role="main" className="flex flex-grow overflow-hidden bg-white">
        <AppRoutes />
      </main>
    </Router>
  );
};

const AppRoutes: FunctionComponent = () => {
  return (
    <React.Fragment>
      <Route exact={true} path="/" component={Notes} />
      <Route path="/notes" component={Notes} />
      <Route path="/signup" component={SignUp} />
      <Route path="/login" component={LogIn} />
    </React.Fragment>
  );
};

export default UnauthenticatedApp;
