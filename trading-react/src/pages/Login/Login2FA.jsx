import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { verifyLogin2FA } from '../State/Auth/AuthAction';
import { X } from 'lucide-react';

const Login2FA = () => {
  const [otp, setOtp] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(store => store);

  const handleOTPSubmit = async (e) => {
    e.preventDefault();
    if (otp.length === 6) {
      try {
        console.log('Login 2FA OTP submitted:', otp);
        await dispatch(verifyLogin2FA(otp, user.login2FASession));
        navigate('/');
      } catch (error) {
        console.error('Error verifying login 2FA:', error);
        alert('Invalid OTP. Please try again.');
      }
    } else {
      alert('Please enter a 6-digit OTP');
    }
  };

  const handleBackToLogin = () => {
    // Reset the 2FA state and go back to login
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{background: 'url(https://img.decrypt.co/insecure/rs:fit:1920:0:0:0/plain/https://cdn.decrypt.co/wp-content/uploads/2025/04/cryptocurrency-world-gID_7.jpg@webp) center/cover no-repeat'}}>
      <div className="backdrop-blur-md bg-[#0a1931]/80 rounded-lg shadow-lg p-8 w-full max-w-md flex flex-col items-center">
        <h1 className="text-4xl font-bold text-white mb-2">Trade Crypto</h1>
        <h2 className="text-xl text-white mb-6">Two-Factor Authentication</h2>
        
        <div className="w-full text-center mb-6">
          <p className="text-gray-300 mb-4">
            We've sent a 6-digit verification code to your email.
          </p>
          <p className="text-sm text-gray-400">
            Check your email or the backend console for the OTP.
          </p>
        </div>

        <form className="w-full flex flex-col gap-4" onSubmit={handleOTPSubmit}>
          <div className="relative">
            <input
              type="text"
              value={otp}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, ''); // Only allow digits
                if (value.length <= 6) {
                  setOtp(value);
                }
              }}
              placeholder="Enter 6-digit OTP"
              maxLength={6}
              className="w-full px-4 py-2 rounded bg-[#11224d] border border-blue-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 text-center tracking-widest text-lg"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={user.isLogin2FALoading}
            className={`w-full py-2 rounded bg-blue-400 text-white font-semibold hover:bg-blue-500 transition ${
              user.isLogin2FALoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {user.isLogin2FALoading ? 'Verifying...' : 'Verify OTP'}
          </button>
        </form>

        {/* Error message display */}
        {user.login2FAError && (
          <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded w-full">
            {user.login2FAError}
          </div>
        )}

        <button
          onClick={handleBackToLogin}
          className="mt-4 text-gray-400 hover:text-white transition"
        >
          ← Back to Login
        </button>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-400">
            Development Note: Check the backend console for the OTP if email is not configured.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login2FA; 