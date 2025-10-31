import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { apiFetch } from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';

export default function Login() {
  const navigate = useNavigate();
  const { setToken, setUser } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await apiFetch('/auth/login', { method: 'POST', body: { email, password } });
      setToken(res.token);
      setUser(res.user);
      navigate('/');
    } catch (e) {
      setError(e);
    }
  };

  return (
    <form className="stack" onSubmit={onSubmit}>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error.message}</p>}
      <input className="input" placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input className="input" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button className="btn" type="submit">Login</button>
      <p>Don't have an account? <Link to="/register">Register</Link></p>
    </form>
  );
}


