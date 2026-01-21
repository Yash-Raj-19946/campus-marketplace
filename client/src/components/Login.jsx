import { useState, useContext } from "react";
import { loginUser } from "../api/auth";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(data);

      localStorage.setItem("token", res.data.token);

      const profileRes = await fetch("https://campus-marketplace-api.onrender.com/api/api/auth/me", {
        headers: {
          Authorization: `Bearer ${res.data.token}`,
        },
      });
      const user = await profileRes.json();

      setUser(user);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
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
