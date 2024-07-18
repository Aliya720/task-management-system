import { createContext, ReactNode, useContext, useState } from "react";
import { AuthType, UserDataType } from "./auth.types";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { User } from "firebase/auth";

export const AuthContext = createContext<AuthType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserDataType | null>(null);
  const [userCredential, setUserCredential] = useState<User>();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const signIn = async (user: User) => {
    setUserCredential(user);
    setIsAuthenticated(true);
    const usersRef = doc(db, "users", user.uid);
    try {
      const userSnap = await getDoc(usersRef);
      if (userSnap.exists()) {
        setUserData(userSnap.data() as UserDataType);
        console.log(userSnap.data());
        navigate("/user");
      } else {
        console.error("No such user!");
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const signUp = (user: User) => {
    setIsAuthenticated(true);
    setUserCredential(user);
    navigate("/user");
  };

  const signOut = () => {
    setUserData(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userData,
        signIn,
        signOut,
        signUp,
        setUserData,
        userCredential,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
