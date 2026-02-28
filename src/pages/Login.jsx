
// //login jsx
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { loginUser } from "../api/authApi";
// import { useAuth } from "../auth/AuthContext";
// import { validateEmail } from "../utils/validators";
// import "./Login.css";

// const Login = () => {
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [error, setError] = useState("");
//   const { login, isAuthenticated } = useAuth(); // auth context
//   const navigate = useNavigate();


// const handleSubmit = async (e) => {
//   e.preventDefault();
//   setError("");

//   if (!validateEmail(form.email)) return setError("Invalid email");
//   if (!form.password) return setError("Password is required");

//   try {
//     const res = await loginUser(form);

//     // Store JWT
//     login(res.data.token);

//     // ✅ redirect after state update
//     navigate("/dashboard/student", { replace: true });
//   } catch (err) {
//     if (err.response?.data?.message) setError(err.response.data.message);
//     else setError("Login failed. Try again.");
//   }
// };


//   return (
//     <div className="auth-container">
//       <form className="auth-card" onSubmit={handleSubmit}>
//         <h2>Welcome Back</h2>
//         <p className="subtitle">Login to continue your journey</p>

//         {/* Error display */}
//         {error && <p className="error">{error}</p>}

//         <input
//           type="email"
//           placeholder="Email"
//           value={form.email}
//           onChange={(e) => setForm({ ...form, email: e.target.value })}
//           required
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           value={form.password}
//           onChange={(e) => setForm({ ...form, password: e.target.value })}
//           required
//         />

//         <button type="submit">Login</button>

//         <p className="switch">
//           Don’t have an account?{" "}
//           <span onClick={() => navigate("/register")}>Register</span>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default Login;


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/authApi";
import { useAuth } from "../auth/AuthContext";
import { validateEmail } from "../utils/validators";
import { Eye, EyeOff } from "lucide-react";
import "./Login.css";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateEmail(form.email)) return setError("Invalid email");
    if (!form.password) return setError("Password is required");

    try {
      const res = await loginUser(form);

      // ✅ store auth as OBJECT
      login({
        token: res.data.token,
        email: form.email,
      });

      // ✅ single, explicit redirect
      navigate("/dashboard/student", { replace: true });

    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Try again."
      );
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h2>Welcome Back</h2>
        <p className="subtitle">Login to continue your journey</p>

        {error && <p className="error">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        <div className="password-input-container">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

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

