import React, { FunctionComponent, useEffect, useState } from "react";
import Header from "./components/Header";
// import Sidebar from "./components/Sidebar";
import Notes from "./components/Notes";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";
import { AuthContext } from "./AuthContext";
import { User } from "./models/User";
import { getRequest } from "./api";

const App: FunctionComponent = () => {
  const [user, setUser] = useState<Partial<User>>({});
  const getCurrentUser = async () => {
    try {
      const currentUserResponse = await getRequest("/me");
      console.log(currentUserResponse);
      if (currentUserResponse.code === 200) {
        setUser(currentUserResponse.user);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getCurrentUser();
  }, []);
  return (
    <Router>
      <AuthContext.Provider value={{ user, setUser }}>
        <Header title="My Memo" />
        {/* <Sidebar /> */}
        <main role="main" className="bg-white overflow-hidden flex flex-grow">
          <Route exact={true} path="/" component={Notes} />
          <Route path="/notes" component={Notes} />
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={LogIn} />
        </main>
      </AuthContext.Provider>
    </Router>
  );
};

export default App;
