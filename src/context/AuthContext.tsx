import { createContext, ReactNode, useContext, useState } from "react";
import { AuthType, UserDataType } from "./auth.types";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const AuthContext = createContext<AuthType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserDataType | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const signIn = async (userData: UserDataType) => {
    setIsAuthenticated(true);
    console.log(userData);
    const usersRef = doc(db, "users", userData.uid);
    try {
      const userSnap = await getDoc(usersRef);
      if (userSnap.exists()) {
        setUser(userSnap.data() as UserDataType);
        console.log("User signed in", userSnap.data());
        navigate("/user");
      } else {
        console.error("No such user!");
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const signUp = (userData: UserDataType) => {
    setIsAuthenticated(true);
    setUser(userData);
    navigate("/user");
  };

  const signOut = () => {
    setUser(null);
    setIsAuthenticated(false);
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
