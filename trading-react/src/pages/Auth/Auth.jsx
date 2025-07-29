import React from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from '../Login/Login';
import Login2FA from '../Login/Login2FA';
import Register from '../Register/Register';
import ForgotPassword from '../ForgotPassword/ForgotPassword';

const Auth = () => {
  const location = useLocation();
  const path = location.pathname;
  const { user } = useSelector(store => store);
  
  console.log("location=", location);
  console.log("path=", path);
  console.log("user state in Auth:", user);

  // If 2FA is required during login, show the 2FA component
  if (user.isLogin2FARequired) {
    return <Login2FA />;
  }

  if (path === '/login') return <Login />;
  if (path === '/register') return <Register />;
  if (path === '/forgot-password') return <ForgotPassword />;

  // Optionally, render nothing or a fallback for other paths
  return null;
};

export default Auth;