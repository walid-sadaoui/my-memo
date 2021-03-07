import React, { FunctionComponent, useContext } from "react";
import { AuthContext } from "./AuthContext";
import Loading from "./components/molecules/Loading";

const AuthenticatedApp = React.lazy(() =>
  import("./components/AuthenticatedApp")
);
const UnauthenticatedApp = React.lazy(() =>
  import("./components/UnauthenticatedApp")
);
const App: FunctionComponent = () => {
  const { user } = useContext(AuthContext);
  return (
    <React.Suspense fallback={<Loading />}>
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </React.Suspense>
  );
};

export default App;
