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
import { admin } from "../constants/admin";
import { TaskType } from "../components/Tasks/TaskType";

export const AuthContext = createContext<AuthType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserDataType | null>(null);
  const [userCredential, setUserCredential] = useState<User | undefined>();
  const [userList, setUserList] = useState<string[]>([]);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [taskList, setTaskList] = useState<TaskType[] | undefined>();

  //to sign in
  const signIn = async (user: User) => {
    const usersRef = doc(db, "users", user.uid);
    try {
      const userSnap = await getDoc(usersRef);
      if (userSnap.exists()) {
        setUserData(userSnap.data() as UserDataType);
        navigate("/user");
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
    fetchUser();
  };

  //to fetch all users data from fire store
  const fetchUser = async () => {
    const usersCollection = collection(db, "users");
    const usersSnapshot = await getDocs(usersCollection);
    const users = usersSnapshot.docs.map((doc) => ({
      ...doc.data(),
    }));
    setUserList(users);
  };

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
    const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
      setUserCredential(currentUser as User);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  //sign up function
  const signUp = (user: UserDataType) => {
    setUserData(user);
    navigate("/user");
    fetchUser();
  };

  //log Out
  const logOut = () => {
    setUserData(null);
    signOut(firebaseAuth);
  };

  return (
    <AuthContext.Provider
      value={{
        isAdminLoggedIn,
        userData,
        signIn,
        logOut,
        signUp,
        setUserData,
        userCredential,
        userList,
        taskList,
        setTaskList,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
