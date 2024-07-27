import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import Layout from "../Layouts/Layout";
import { getAuth } from "firebase/auth";

const ProtectedRoute = () => {
  // const auth = useAuthContext();
  const firebaseAuth = getAuth();
  // console.log(auth?.userCredential);

  return firebaseAuth.currentUser ? <Layout /> : <Navigate to="/sign-in" />;
};

export const AdminProtectedRoute = () => {
  const auth = useAuthContext();
  return auth?.isAdminLoggedIn ? <Layout /> : <Navigate to="/user" />;
};

export default ProtectedRoute;
