import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { apiFetch } from "../services/api.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
  const navigate = useNavigate();
  const { setToken, setUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await apiFetch("/auth/login", {
        method: "POST",
        body: { email, password },
      });
      setToken(res.token);
      setUser(res.user);
      navigate("/");
    } catch (e) {
      setError(e);
    }
  };

  return (
    <div className="container">
      <form
        className="stack"
        onSubmit={onSubmit}
        style={{ maxWidth: "400px", margin: "48px auto" }}
      >
        <h2 style={{ color: "#ffffff" }}>Login</h2>
        {error && <p style={{ color: "#ff6b6b" }}>{error.message}</p>}
        <input
          className="input"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="input"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="btn" type="submit">
          Login
        </button>
        <p style={{ color: "#C0FAE6", textAlign: "center" }}>
          Don't have an account?{" "}
          <Link
            to="/register"
            style={{ color: "#C0FAE6", textDecoration: "underline" }}
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
