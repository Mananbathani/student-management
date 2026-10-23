import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { login } from '../redux/actions';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const from = location.state?.from?.pathname || '/students';

  if (user) return <Navigate to={from} replace />;

  const handleSubmit = (e) => {
    e.preventDefault();
    const ok = dispatch(login(username.trim(), password));
    if (ok) navigate(from, { replace: true });
    else setError('Invalid username or password.');
  };

  return (
    <div className="d-flex justify-content-center align-items-center login-wrapper">
      <div className="card page-card p-4" style={{ maxWidth: 400, width: '100%' }}>
        <h3 className="text-center mb-1">Welcome back</h3>
        <p className="text-center text-muted mb-4">Sign in to manage students</p>

        {error && <div className="alert alert-danger py-2">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoFocus
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Sign in
          </button>
        </form>

        <div className="text-center text-muted small mt-3">
          Demo login: <code>admin</code> / <code>admin123</code>
        </div>
      </div>
    </div>
  );
}

export default Login;
