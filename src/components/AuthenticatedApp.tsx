import React, { FunctionComponent } from "react";
import Notes from "./pages/Notes";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import AuthenticatedHeader from "./organisms/Header/AuthenticatedHeader";

const AuthenticatedApp: FunctionComponent = () => {
  return (
    <Router>
      <AuthenticatedHeader />
      <main role="main" className="flex flex-grow overflow-hidden bg-white">
        <AppRoutes />
      </main>
    </Router>
  );
};

const AppRoutes: FunctionComponent = () => {
  return (
    <Router>
      <Route exact={true} path="/" component={Notes} />
      <Route path="/notes" component={Notes} />
      <Route path="/signup" component={SignUp} />
      <Route path="/login" component={LogIn} />
    </Router>
  );
};

export default AuthenticatedApp;
