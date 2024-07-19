import { createContext, ReactNode, useContext, useState } from "react";
import { AuthType, UserDataType } from "./auth.types";
import { useNavigate } from "react-router-dom";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { User } from "firebase/auth";

export const AuthContext = createContext<AuthType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserDataType | null>(null);
  const [userCredential, setUserCredential] = useState<User>();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userNameList, setUserNameList] = useState<string[]>([]);

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
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
    fetchUserNames();
  };

  const fetchUserNames = async () => {
    const usersCollection = collection(db, "users");
    const usersSnapshot = await getDocs(usersCollection);
    const userNames = usersSnapshot.docs.map(
      (doc) => `${doc.data().firstName} ${doc.data().secondName}`
    );
    setUserNameList(userNames);
  };

  const signUp = (user: User) => {
    setIsAuthenticated(true);
    setUserCredential(user);
    navigate("/user");
    fetchUserNames();
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
        userNameList,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
