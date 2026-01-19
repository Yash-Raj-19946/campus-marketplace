import { useState } from "react";
import { registerUser } from "../api/auth";
import "../styles/auth.css";

const Register = () => {
  const [data, setData] = useState({ name: "", email: "", password: "" });

  const submit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(data);
      alert("Verification email sent! Check your inbox.");
    } catch (err) {
      alert(err.response?.data?.msg || "Registration failed");
    }
  };

  return (
    <div className="page auth-page">
      <div className="blob blob-2" />
      <div className="blob blob-3" />

      <form className="auth-card" onSubmit={submit}>
        <h2>Register</h2>
        <p>Use your college email to join</p>

        <input
          placeholder="Name"
          required
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />

        <input
          type="email"
          placeholder="College Email"
          required
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          required
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />

        <button className="btn primary">Register</button>
      </form>
    </div>
  );
};

export default Register;
