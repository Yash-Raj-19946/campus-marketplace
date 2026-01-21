import { useState } from "react";
import { loginUser } from "../api/auth";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    try {
      // 🔥 loginUser already stores token internally
      await loginUser(data);

      // ✅ SUCCESS → go to HOME
      navigate("/", { replace: true });
    } catch (err) {
      // ❌ FAILURE → stay on /login
      alert(err.response?.data?.msg || "Invalid email or password");
    }
  };

  return (
    <div className="page auth-page">
      <div className="blob blob-1" />
      <div className="blob blob-2" />

      <form className="auth-card" onSubmit={submit}>
        <h2>Login</h2>
        <p>Welcome back to Campus Marketplace</p>

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

        <button className="btn primary">Login</button>
      </form>
    </div>
  );
};

export default Login;
