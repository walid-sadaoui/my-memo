import React, {
  createContext,
  FunctionComponent,
  useEffect,
  useState,
} from "react";
import { getRequest } from "./api";
import { User } from "./models/User";

type AuthContextProps = {
  user: Partial<User> | undefined;
  setUser: React.Dispatch<React.SetStateAction<Partial<User> | undefined>>;
};

// ajouter la config du procider ici en exportant l'authprovider
const AuthContext: React.Context<Partial<AuthContextProps>> = createContext<
  Partial<AuthContextProps>
>({ user: undefined });

const AuthProvider: FunctionComponent = ({ children }) => {
  const [user, setUser] = useState<Partial<User> | undefined>(undefined);
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
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
