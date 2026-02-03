

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/authApi";
import {
    validateName,
    validateEmail,
    validatePassword
} from "../utils/validators";
import "./Login.css";

const Register = () => {
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        setError("");

        if (!validateName(form.name)) {
            return setError("Name must be at least 2 characters long");
        }

        if (!validateEmail(form.email)) {
            return setError("Invalid email format");
        }

        if (!validatePassword(form.password)) {
            return setError(
                "Password must be 8+ chars, include uppercase, lowercase and number"
            );
        }

        try {
            //   await registerUser(form);
            const res = await registerUser(form);
            console.log("Backend response:", res.data);
            navigate("/login");
        } catch (err) {

            console.error("Backend error:", err.response?.data);
            setError(err.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className="auth-container">
            <form className="auth-card" onSubmit={submit}>
                <h2>Create Account</h2>

                {error && <p className="error">{error}</p>}

                <input
                    placeholder="Full Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                />

                <button>Register</button>
            </form>
        </div>
    );
};

export default Register;
