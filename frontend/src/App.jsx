import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from './store/authSlice';
import Login from './Login';
import Register from './Register';
import Location from './Location'
import './App.css';

const App = () => {
 const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user);
  return (
    <Routes>
      <Route
        path="/login"
        element={currentUser ? <Navigate to="/dashboard" /> : <Login />}
      />
      <Route path='/register' element={<Register />} />
      <Route
        path="/dashboard"
        element={
          currentUser ? (
            <Location />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route path="*" element={<Navigate to={currentUser ? "/dashboard" : "/login"} />} />
    </Routes>
  );
};

export default App;
