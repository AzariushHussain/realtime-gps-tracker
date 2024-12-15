import React, { useState } from 'react';
import { registerUser } from './api/auth';
import { useDispatch } from 'react-redux';
import { login } from './store/authSlice';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resp = await registerUser(username, password, role);
    console.log("register response", resp);
    if (resp) {
      dispatch(login(resp.data));
    }
    navigate('/dashboard');
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow-sm w-100" style={{ maxWidth: '400px' }}>
        <h2 className="mb-4 text-center">Register</h2>
        <div className="mb-3">
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="form-control"
            placeholder="Enter username"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            placeholder="Enter password"
            required
          />
        </div>
        <div className="mb-3">
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="form-select"
            required
          >
            <option value="" disabled>Select Role</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>
        <button 
          type="submit" 
          className="btn btn-primary w-100"
        >
          Register
        </button>
        <p className="mt-3 text-center">
          Already registered?{' '}
          <Link to="/login" className="text-decoration-none">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
