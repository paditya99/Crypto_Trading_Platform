import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../State/Auth/AuthAction';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(logout());
    navigate('/login');
  }, [dispatch, navigate]);

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold mb-6">Logging Out...</h1>
      <p className="text-gray-600">You are being logged out. Please wait...</p>
    </div>
  );
};

export default Logout; 