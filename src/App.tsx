import React, { FunctionComponent } from "react";
import Header from "./components/Header";
// import Sidebar from "./components/Sidebar";
import Notes from "./components/Notes";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";
import { AuthProvider } from "./AuthContext";

const App: FunctionComponent = () => {
  return (
    <Router>
      <AuthProvider>
        <Header title="My Memo" />
        {/* <Sidebar /> */}
        <main role="main" className="bg-white overflow-hidden flex flex-grow">
          <Route exact={true} path="/" component={Notes} />
          <Route path="/notes" component={Notes} />
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={LogIn} />
        </main>
      </AuthProvider>
    </Router>
  );
};

export default App;
