import React, { useState } from 'react';
import { loginUser } from './api/auth';
import { useDispatch } from 'react-redux';
import { login } from './store/authSlice';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resp = await loginUser(username, password);
    console.log('login response', resp);
    if (resp) {
      dispatch(login(resp.data));
    }
    navigate('/dashboard');
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <form onSubmit={handleSubmit} className="p-4 bg-white shadow rounded" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 className="mb-3 text-center">Login</h2>
        <div className="mb-3">
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Login</button>

        {/* Registration Link */}
        <p className="mt-3 text-center">
          Don't have an account?{' '}
          <Link to="/register" className="text-decoration-none text-primary">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
