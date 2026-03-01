// import { Navigate } from "react-router-dom";
// import { useAuth } from "./AuthContext";

// // allowedRoles: optional array e.g. ['admin'] or ['student', 'counsellor']
// // If omitted, any authenticated user is allowed.
// const ProtectedRoute = ({ children, allowedRoles }) => {
//   const { user, isAuthenticated, loading } = useAuth();

//   if (loading) return <p>Loading...</p>;

//   if (!isAuthenticated) return <Navigate to="/login" replace />;

//   if (allowedRoles && !allowedRoles.includes(user?.role)) {
//     // Redirect to their own home instead of a blank error
//     const roleHome = {
//       admin:      "/dashboard/admin",
//       counsellor: "/dashboard/counsellor",
//       student:    "/dashboard/student",
//     };
//     return <Navigate to={roleHome[user?.role] || "/"} replace />;
//   }

//   return children;
// };

// export default ProtectedRoute;


import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ROLE_HOME = {
  admin:      "/dashboard/admin",
  counsellor: "/dashboard/counsellor",
  student:    "/dashboard/student",
};

// allowedRoles: optional array e.g. ['admin'] or ['student']
// If omitted, any authenticated user passes through.
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, isAuthenticated, loading } = useAuth();

  // Wait for auth state before making any routing decision
  if (loading) return null;

  // Not logged in — send to login
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  // Logged in but wrong role — send to their own home
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to={ROLE_HOME[user.role] || "/"} replace />;
  }

  return children;
};

export default ProtectedRoute;