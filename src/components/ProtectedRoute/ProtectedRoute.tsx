import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import Layout from "../Layouts/Layout";

const ProtectedRoute = () => {
  const auth = useAuthContext();
  return auth?.userCredential ? <Layout /> : <Navigate to="/sign-in" />;
};

export const AdminProtectedRoute = () => {
  const auth = useAuthContext();
  return auth?.isAdminLoggedIn ? <Layout /> : <Navigate to="/user" />;
};

export default ProtectedRoute;
