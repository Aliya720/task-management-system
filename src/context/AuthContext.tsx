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
import { signOut, User } from "firebase/auth";
import { admin } from "../constants/admin";
import { TaskType } from "../components/Tasks/TaskType";

export const AuthContext = createContext<AuthType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserDataType | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userCredential, setUserCredential] = useState<User | null>(null);
  const [userList, setUserList] = useState<UserDataType[]>([]);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [taskList, setTaskList] = useState<TaskType[] | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  //to fetch all users data from fire store
  const fetchUsersList = async () => {
    const usersCollection = collection(db, "users");
    const usersSnapshot = await getDocs(usersCollection);
    const users = usersSnapshot.docs.map((doc) => ({
      ...doc.data(),
    })) as UserDataType[];
    setUserList(users);
  };
  useEffect(() => {
    fetchUsersList();
  }, []);

  // updating state when admin is logged in
  useEffect(() => {
    if (userData?.uid === admin.Id) {
      setIsAdminLoggedIn(true);
    } else {
      setIsAdminLoggedIn(false);
    }
  }, [userData]);

  //handle authentication state changes with Firebase
  useEffect(() => {
    const unsubscribe = () => {
      firebaseAuth.onAuthStateChanged((user) => {
        if (user) {
          setUserCredential(user);
          setIsAuthenticated(true);
          setIsLoading(false);
        } else {
          setUserCredential(null);
        }
      });
    };

    return () => {
      unsubscribe();
    };
  }, []);

  //to sign in
  const signIn = async (user: User) => {
    try {
      const usersRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(usersRef);
      if (userSnap.exists()) {
        setUserData(userSnap.data() as UserDataType);
        navigate("/user/dashboard");
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
    // fetchUsersList();
  };

  //sign up function
  const signUp = (user: UserDataType) => {
    setUserData(user);
    navigate("/user/dashboard");
    // fetchUsersList();
  };

  //log Out
  const logOut = () => {
    console.log("logged out");
    navigate("/sign-in");
    setUserData(null);
    signOut(firebaseAuth);
  };

  return (
    <AuthContext.Provider
      value={{
        isAdminLoggedIn,
        isAuthenticated,
        userData,
        signIn,
        logOut,
        signUp,
        setUserData,
        userCredential,
        userList,
        taskList,
        setTaskList,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
