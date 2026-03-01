// import { createContext, useContext, useEffect, useState } from "react";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Restore session from localStorage on app load
//   useEffect(() => {
//     try {
//       const stored = localStorage.getItem("user");
//       if (stored) {
//         const parsed = JSON.parse(stored);
//         setUser(parsed);
//         if (parsed.token) localStorage.setItem("token", parsed.token);
//       }
//     } catch {
//       // Corrupted storage — clear it
//       localStorage.removeItem("user");
//       localStorage.removeItem("token");
//     }
//     setLoading(false);
//   }, []);

//   // userData = { id, name, email, role, token }
//   const login = (userData) => {
//     setUser(userData);
//     localStorage.setItem("user", JSON.stringify(userData));
//     if (userData.token) localStorage.setItem("token", userData.token);
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem("user");
//     localStorage.removeItem("token");
//   };

//   const isAuthenticated = !!user;

//   return (
//     <AuthContext.Provider
//       value={{ user, login, logout, isAuthenticated, loading }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);


import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Read localStorage synchronously on first render so auth state is known
  // immediately — no async useEffect needed, no loading flicker.
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem("user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      return null;
    }
  });

  // loading stays false — kept as a flag for future async work (e.g. token refresh)
  const [loading] = useState(false);

  // Keep token in sync whenever user changes
  useEffect(() => {
    if (user?.token) localStorage.setItem("token", user.token);
  }, [user]);

  // userData = { id, name, email, role, token }
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    if (userData.token) localStorage.setItem("token", userData.token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  // Stable context value — only re-creates when user or loading actually changes
  const value = useMemo(
    () => ({ user, login, logout, isAuthenticated: !!user, loading }),
    [user, loading] // eslint-disable-line react-hooks/exhaustive-deps
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);