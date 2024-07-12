import { createContext, ReactNode, useContext, useState } from "react";
import { AuthType, UserDataType } from "./auth.types";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext<AuthType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserDataType | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const signIn = (userData: UserDataType) => {
    setUser(userData);
    setIsAuthenticated(true);
    navigate("/");
    console.log("user signed In");
  };

  const signOut = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const signUp = (userData: UserDataType) => {
    setUser(userData);
    setIsAuthenticated(true);
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, signIn, signOut, signUp }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
