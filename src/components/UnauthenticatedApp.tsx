import React, { FunctionComponent } from "react";
import UnauthenticatedHeader from "./organisms/Header/UnauthenticatedHeader";
import Notes from "./pages/Notes";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";

const UnauthenticatedApp: FunctionComponent = () => {
  return (
    <Router>
      <UnauthenticatedHeader />
      <main role="main" className="flex flex-grow overflow-y-auto bg-white">
        <AppRoutes />
      </main>
    </Router>
  );
};

const AppRoutes: FunctionComponent = () => {
  return (
    <React.Fragment>
      <Route
        exact={true}
        path={process.env.PUBLIC_URL + "/"}
        component={Notes}
      />
      <Route path={process.env.PUBLIC_URL + "/notes"} component={Notes} />
      <Route path={process.env.PUBLIC_URL + "/signup"} component={SignUp} />
      <Route path={process.env.PUBLIC_URL + "/login"} component={LogIn} />
      <Route path="*">
        <Redirect to={process.env.PUBLIC_URL + "/"} />
      </Route>
    </React.Fragment>
  );
};

export default UnauthenticatedApp;
