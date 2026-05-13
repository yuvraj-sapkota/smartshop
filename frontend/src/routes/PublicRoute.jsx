import { Navigate } from "react-router-dom";
import useAuthStore from "../store/auth/authStore";

const PublicRoute = ({ children }) => {
  const { user, token } = useAuthStore();

  if (token && user) {
    return <Navigate to={`/${user.role}`} replace />;
  }

  return children;
};

export default PublicRoute;
