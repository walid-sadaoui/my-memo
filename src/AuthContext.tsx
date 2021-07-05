import React from "react";
import { getRequest, postRequest } from "./api";
import Loading from "./components/molecules/Loading";
import { User } from "./models/User";

interface LoginFormValues {
  email: string;
  password: string;
}

interface RegisterFormValues {
  email: string;
  password: string;
}

type AuthContextProps = {
  user: Partial<User> | undefined;
  logout: () => Promise<void>;
  login: (newUser: LoginFormValues) => Promise<boolean>;
};

const AuthContext = React.createContext<AuthContextProps | undefined>(
  undefined
);

const useAuth = () => {
  const authContext = React.useContext(AuthContext);
  if (authContext === undefined)
    throw new Error("useAuth must be used within an AuthProvider");
  return authContext;
};

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = React.useState<Partial<User> | undefined>(undefined);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const getCurrentUser = async () => {
    try {
      const currentUserResponse = await getRequest("/me");
      console.log(currentUserResponse);
      if (currentUserResponse.data) {
        setUser(currentUserResponse.data.user);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const login = async (newUser: LoginFormValues): Promise<boolean> => {
    try {
      const logInResponse = await postRequest(
        "/login",
        JSON.stringify(newUser)
      );
      console.log(logInResponse);
      if (logInResponse.data.code === 200) {
        setUser(logInResponse.data.user);
        return true;
      }
      return false;
    } catch (error) {
      console.log("login error ", error);
      return false;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await postRequest("/logout");
      setUser(undefined);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getCurrentUser();
  }, []);

  if (isLoading) return <Loading />;

  return (
    <AuthContext.Provider value={{ user, logout, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuth };
