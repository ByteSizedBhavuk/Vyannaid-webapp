import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ROLE_HOME = {
  admin:      "/dashboard/admin",
  counsellor: "/dashboard/counsellor",
  student:    "/dashboard/student",
};

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) return null;

  // Not logged in → login
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  // Wrong role → that role's own home, never "/"
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to={ROLE_HOME[user.role] ?? "/login"} replace />;
  }

  // Incomplete student profile → setup page
  // Only redirect if:
  //   1. They are a student
  //   2. profileComplete is explicitly false (undefined/null = treated as complete)
  //   3. They are NOT already on the setup page (prevents loop)
  if (
    user.role === "student" &&
    user.profileComplete === false &&
    location.pathname !== "/profile/setup"
  ) {
    return <Navigate to="/profile/setup" replace />;
  }

  return children;
};

export default ProtectedRoute;