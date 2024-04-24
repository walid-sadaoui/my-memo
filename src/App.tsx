import React, { FunctionComponent } from "react";
// import { useAuth } from "./AuthContext";
// import Loading from "./components/molecules/Loading";
import UnauthenticatedApp from "./components/UnauthenticatedApp";

// const AuthenticatedApp = React.lazy(() =>
//   import("./components/AuthenticatedApp")
// );

// const UnauthenticatedApp = React.lazy(() =>
//   import("./components/UnauthenticatedApp")
// );
const App: FunctionComponent = () => {
  // const { user } = useAuth();

  return (
    // <React.Suspense fallback={<Loading />}>
    //   {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    // </React.Suspense>
    <UnauthenticatedApp />
  );
};

export default App;
