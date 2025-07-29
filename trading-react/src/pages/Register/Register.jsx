import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../State/Auth/AuthAction';

const Register = () => {

  const dispatch = useDispatch();
  const { user } = useSelector(store => store);
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate=useNavigate();

  // Clear error when component mounts
  useEffect(() => {
    if (user.error) {
      dispatch({type: 'CLEAR_ERROR'});
    }
  }, []);

  // Clear error when user starts typing
  const handleNameChange = (e) => {
    setName(e.target.value);
    if (user.error) {
      dispatch({type: 'CLEAR_ERROR'});
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (user.error) {
      dispatch({type: 'CLEAR_ERROR'});
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (user.error) {
      dispatch({type: 'CLEAR_ERROR'});
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Access form data from state
    const formData = {
      fullname: name, 
      email,
      password,
    };
    console.log("formData=", formData);
    dispatch(registerUser(formData));
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{background: 'url(https://img.decrypt.co/insecure/rs:fit:1920:0:0:0/plain/https://cdn.decrypt.co/wp-content/uploads/2025/04/cryptocurrency-world-gID_7.jpg@webp) center/cover no-repeat'}}>
      <div className="backdrop-blur-md bg-[#0a1931]/80 rounded-lg shadow-lg p-8 w-full max-w-md flex flex-col items-center">
        <h1 className="text-4xl font-bold text-white mb-2">Trade Crypto</h1>
        <h2 className="text-xl text-white mb-6">Create New Account</h2>
        
        {/* Error Message Display */}
        {user.error && (
          <div className="w-full p-3 bg-red-100 border border-red-400 text-red-700 rounded mb-4">
            {user.error}
          </div>
        )}
        
        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your full name"
            className="w-full px-4 py-2 rounded bg-[#11224d] border border-blue-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={name}
            onChange={handleNameChange}
            required
          />
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 rounded bg-[#11224d] border border-blue-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={email}
            onChange={handleEmailChange}
            required
          />
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full px-4 py-2 rounded bg-[#11224d] border border-blue-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          <button
            type="submit"
            disabled={user.isLoading}
            className={`w-full py-2 rounded bg-blue-400 text-white font-semibold hover:bg-blue-500 transition ${
              user.isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {user.isLoading ? 'Creating Account...' : 'Register'}
          </button>
        </form>
        <div className="flex items-center gap-2 mt-4 text-white text-sm">
          <span>Don't have account ?</span>
          <Link to="/login" className="underline hover:text-blue-600"><b>LOGIN</b></Link>
        </div>
      </div>
    </div>
  );
};

export default Register; 