import React, { FunctionComponent } from "react";
import Notes from "./pages/Notes";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import AuthenticatedHeader from "./organisms/Header/AuthenticatedHeader";

const AuthenticatedApp: FunctionComponent = () => {
  return (
    <Router>
      <AuthenticatedHeader />
      <main role="main" className="flex flex-grow overflow-y-auto bg-white">
        <AppRoutes />
      </main>
    </Router>
  );
};

const AppRoutes: FunctionComponent = () => {
  return (
    <Router>
      <Route
        exact={true}
        path={process.env.PUBLIC_URL + "/"}
        component={Notes}
      />
      <Route path={process.env.PUBLIC_URL + "/notes"} component={Notes} />
      <Route path="*">
        <Redirect to={process.env.PUBLIC_URL + "/"} />
      </Route>
    </Router>
  );
};

export default AuthenticatedApp;
