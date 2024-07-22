import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { AuthType, UserDataType } from "./auth.types";
import { useNavigate } from "react-router-dom";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db, firebaseAuth } from "../firebaseConfig";
import { onAuthStateChanged, signOut, User } from "firebase/auth";

export const AuthContext = createContext<AuthType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserDataType | null>(null);
  const [userCredential, setUserCredential] = useState<User | undefined>();
  const [userList, setUserList] = useState<string[]>([]);

  // console.log("firebaseAuth", firebaseAuth);

  const signIn = async (user: User) => {
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
    fetchUser();
  };

  const fetchUser = async () => {
    const usersCollection = collection(db, "users");
    const usersSnapshot = await getDocs(usersCollection);
    const users = usersSnapshot.docs.map((doc) => ({
      ...doc.data(),
    }));
    setUserList(users);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
      setUserCredential(currentUser as User);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const signUp = (user: UserDataType) => {
    setUserData(user);
    navigate("/user");
    fetchUser();
  };

  const logOut = () => {
    setUserData(null);
    signOut(firebaseAuth);
  };

  return (
    <AuthContext.Provider
      value={{
        userData,
        signIn,
        logOut,
        signUp,
        setUserData,
        userCredential,
        userList,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
