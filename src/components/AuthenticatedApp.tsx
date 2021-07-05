import React, { FunctionComponent } from "react";
import Notes from "./pages/Notes";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
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
      <Route path="/login">
        <Redirect to="/" />
      </Route>
    </Router>
  );
};

export default AuthenticatedApp;
