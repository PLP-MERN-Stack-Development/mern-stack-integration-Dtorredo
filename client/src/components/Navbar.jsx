import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Navbar() {
  const { token, user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="brand">MERN Blog</Link>
        <Link to="/" className="nav-link">Posts</Link>
        {token && <Link to="/create" className="nav-link">New Post</Link>}
      </div>
      <div className="nav-right">
        {token ? (
          <>
            <span className="nav-text">Hi, {user?.name}</span>
            <button onClick={handleLogout} className="btn">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn">Login</Link>
            <Link to="/register" className="btn btn-secondary">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}


