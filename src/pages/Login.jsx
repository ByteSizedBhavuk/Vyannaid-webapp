// // import { useState } from "react";
// // import { loginUser } from "../api/authApi";
// // import { useAuth } from "../auth/AuthContext";
// // import { useNavigate } from "react-router-dom";

// // const Login = () => {
// //   const [form, setForm] = useState({ email: "", password: "" });
// //   const { login } = useAuth();
// //   const navigate = useNavigate();

// //   const submit = async (e) => {
// //     e.preventDefault();
// //     const res = await loginUser(form);
// //     login(res.data.token);
// //     navigate("/dashboard/student");
// //   };

// //   return (
// //     <form onSubmit={submit}>
// //       <h2>Login</h2>
// //       <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
// //       <input type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />
// //       <button>Login</button>
// //     </form>
// //   );
// // };

// // export default Login;


// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { loginUser } from "../api/authApi";
// import { useAuth } from "../auth/AuthContext";
// import "./Login.css";

// const Login = () => {
//   const [form, setForm] = useState({ email: "", password: "" });
//   const { login } = useAuth();
//   const navigate = useNavigate();

// const submit = async (e) => {
//   e.preventDefault();
//   setError("");

//   if (!validateEmail(form.email)) {
//     return setError("Invalid email");
//   }

//   if (!form.password) {
//     return setError("Password is required");
//   }

//   try {
//     const res = await loginUser(form); // axios POST
//     login(res.data.token);              // store JWT in context/localStorage
//     navigate("/dashboard/student");     // redirect
//   } catch (err) {
//     // Backend error handling
//     if (err.response && err.response.data && err.response.data.message) {
//       setError(err.response.data.message);
//     } else {
//       setError("Login failed. Try again.");
//     }
//   }
// };


//   return (
//     <div className="auth-container">
//       <form className="auth-card" onSubmit={submit}>
//         <h2>Welcome Back</h2>
//         <p className="subtitle">Login to continue your journey</p>

//         <input
//           type="email"
//           placeholder="Email"
//           required
//           onChange={(e) => setForm({ ...form, email: e.target.value })}
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           required
//           onChange={(e) => setForm({ ...form, password: e.target.value })}
//         />

//         <button type="submit">Login</button>

//         <p className="switch">
//           Don’t have an account? <span onClick={() => navigate("/register")}>Register</span>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default Login;





import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/authApi";
import { useAuth } from "../auth/AuthContext";
import { validateEmail } from "../utils/validators";
import "./Login.css";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { login, isAuthenticated } = useAuth(); // auth context
  const navigate = useNavigate();

  // Auto-redirect if user is already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard/student");
    }
  }, [isAuthenticated, navigate]);

const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  if (!validateEmail(form.email)) return setError("Invalid email");
  if (!form.password) return setError("Password is required");

  try {
    const res = await loginUser(form);

    // Store JWT
    login(res.data.token);

    // ✅ redirect after state update
    navigate("/dashboard/student", { replace: true });
  } catch (err) {
    if (err.response?.data?.message) setError(err.response.data.message);
    else setError("Login failed. Try again.");
  }
};


  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h2>Welcome Back</h2>
        <p className="subtitle">Login to continue your journey</p>

        {/* Error display */}
        {error && <p className="error">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        <button type="submit">Login</button>

        <p className="switch">
          Don’t have an account?{" "}
          <span onClick={() => navigate("/register")}>Register</span>
        </p>
      </form>
    </div>
  );
};

export default Login;
