import { createContext } from "react";
import { User } from "./models/User";

type AuthContextProps = {
  user: Partial<User>;
  setUser: React.Dispatch<React.SetStateAction<Partial<User>>>;
};

export const AuthContext = createContext<Partial<AuthContextProps>>({});
