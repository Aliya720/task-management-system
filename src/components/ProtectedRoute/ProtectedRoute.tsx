import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

const ProtectedRoute = () => {
  const auth = useAuthContext();
  return auth?.isAuthenticated ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default ProtectedRoute;
