import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import Layout from "../Layouts/Layout";

const ProtectedRoute = () => {
  const auth = useAuthContext();
  return auth?.isAuthenticated ? <Layout /> : <Navigate to="/sign-in" />;
};

export default ProtectedRoute;
