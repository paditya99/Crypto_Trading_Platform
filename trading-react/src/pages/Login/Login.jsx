import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser, sendForgotPasswordOTP, verifyForgotPasswordOTP, resetPassword } from '../State/Auth/AuthAction';

const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(store => store);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Forgot Password States
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [showOTPForm, setShowOTPForm] = useState(false);
  const [showResetPasswordForm, setShowResetPasswordForm] = useState(false);
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [sessionId, setSessionId] = useState('');

  // Clear error when component mounts
  useEffect(() => {
    if (user.error) {
      dispatch({type: 'CLEAR_ERROR'});
    }
  }, []);

  // Clear error when user starts typing
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

  // Watch for forgot password OTP sent successfully
  useEffect(() => {
    if (user.isForgotPasswordOtpSent && !user.forgotPasswordError && showForgotPassword) {
      console.log('OTP sent successfully, showing OTP form');
      setShowOTPForm(true);
      setSessionId(user.forgotPasswordSessionId || 'temp-session-id');
      
      // Show OTP in alert for development
      if (user.forgotPasswordOtp) {
        alert(`🔐 Forgot Password OTP: ${user.forgotPasswordOtp}\n\nThis OTP is for development purposes since email is not configured.`);
      }
      
      // Development helper
      console.log('=== FORGOT PASSWORD DEVELOPMENT NOTE ===');
      console.log('Check the backend console for the forgot password OTP');
      console.log('The OTP will be logged there since email is not configured');
      console.log('=== END FORGOT PASSWORD DEVELOPMENT NOTE ===');
    }
  }, [user.isForgotPasswordOtpSent, user.forgotPasswordError, user.forgotPasswordSessionId, user.forgotPasswordOtp, showForgotPassword]);

  // Watch for OTP verification to proceed to password reset
  useEffect(() => {
    if (user.isForgotPasswordOtpVerified && !user.forgotPasswordError && showOTPForm) {
      console.log('OTP verified, showing password reset form');
      setShowResetPasswordForm(true);
    }
  }, [user.isForgotPasswordOtpVerified, user.forgotPasswordError, showOTPForm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      email,
      password
    };
    console.log('Login attempt with:', formData);
    dispatch(loginUser(formData));
    // Don't navigate here - let the Redux state handle navigation
  };

  const handleForgotPassword = () => {
    setShowForgotPassword(true);
    setForgotPasswordEmail(email); // Pre-fill with login email
  };

  const handleSendForgotPasswordOTP = async () => {
    if (!forgotPasswordEmail) {
      alert('Please enter your email address');
      return;
    }
    
    try {
      await dispatch(sendForgotPasswordOTP(forgotPasswordEmail, 'EMAIL'));
      console.log('Send forgot password OTP dispatched');
      // The useEffect will handle showing the OTP form when the state updates
    } catch (error) {
      console.error('Error sending forgot password OTP:', error);
      alert('Failed to send OTP. Please try again.');
    }
  };

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      alert('Please enter a valid 6-digit OTP');
      return;
    }
    
    try {
      // Skip separate OTP verification since backend will verify during reset password
      console.log('OTP entered, proceeding to password reset form');
      setShowResetPasswordForm(true);
    } catch (error) {
      console.error('Error verifying OTP:', error);
      alert('Invalid OTP. Please try again.');
    }
  };

  const handleResetPassword = async () => {
    if (newPassword.length < 6) {
      alert('Password must be at least 6 characters long');
      return;
    }
    
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    try {
      const result = await dispatch(resetPassword(otp, newPassword, sessionId));
      console.log('Reset password result:', result);
      alert('Password reset successfully! Please login with your new password.');
      
      // Reset all states and go back to login
      setShowForgotPassword(false);
      setShowOTPForm(false);
      setShowResetPasswordForm(false);
      setForgotPasswordEmail('');
      setOtp('');
      setNewPassword('');
      setConfirmPassword('');
      setSessionId('');
    } catch (error) {
      console.error('Error resetting password:', error);
      alert('Failed to reset password. Please try again.');
    }
  };

  const handleBackToLogin = () => {
    setShowForgotPassword(false);
    setShowOTPForm(false);
    setShowResetPasswordForm(false);
    setForgotPasswordEmail('');
    setOtp('');
    setNewPassword('');
    setConfirmPassword('');
    setSessionId('');
    // Clear the forgot password session ID and OTP from Redux state
    dispatch({type: 'CLEAR_FORGOT_PASSWORD_SESSION'});
  };

  // Forgot Password Form
  if (showForgotPassword) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{background: 'url(https://img.decrypt.co/insecure/rs:fit:1920:0:0:0/plain/https://cdn.decrypt.co/wp-content/uploads/2025/04/cryptocurrency-world-gID_7.jpg@webp) center/cover no-repeat'}}>
        <div className="backdrop-blur-md bg-[#0a1931]/80 rounded-lg shadow-lg p-8 w-full max-w-md flex flex-col items-center">
          <h1 className="text-4xl font-bold text-white mb-2">Trade Crypto</h1>
          <h2 className="text-xl text-white mb-6">Forgot Password</h2>
          
          {!showOTPForm && !showResetPasswordForm && (
            <div className="w-full">
              <p className="text-gray-300 text-sm mb-4 text-center">
                Enter your email address to receive a password reset OTP
              </p>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded bg-[#11224d] border border-blue-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
                value={forgotPasswordEmail}
                onChange={e => setForgotPasswordEmail(e.target.value)}
                required
              />
              <button
                onClick={handleSendForgotPasswordOTP}
                disabled={user.isForgotPasswordLoading}
                className={`w-full py-2 rounded bg-blue-400 text-white font-semibold hover:bg-blue-500 transition mb-4 ${
                  user.isForgotPasswordLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {user.isForgotPasswordLoading ? 'Sending...' : 'Send OTP'}
              </button>
            </div>
          )}

          {showOTPForm && !showResetPasswordForm && (
            <div className="w-full">
              <p className="text-gray-300 text-sm mb-4 text-center">
                Enter the 6-digit OTP sent to your email
              </p>
              <input
                type="text"
                placeholder="Enter 6-digit OTP"
                className="w-full px-4 py-2 rounded bg-[#11224d] border border-blue-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4 text-center tracking-widest text-lg"
                value={otp}
                onChange={e => {
                  const value = e.target.value.replace(/\D/g, '');
                  if (value.length <= 6) {
                    setOtp(value);
                  }
                }}
                maxLength={6}
                required
              />
              <button
                onClick={handleVerifyOTP}
                disabled={user.isForgotPasswordLoading}
                className={`w-full py-2 rounded bg-green-400 text-white font-semibold hover:bg-green-500 transition mb-4 ${
                  user.isForgotPasswordLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {user.isForgotPasswordLoading ? 'Verifying...' : 'Verify OTP'}
              </button>
            </div>
          )}

          {showResetPasswordForm && (
            <div className="w-full">
              <p className="text-gray-300 text-sm mb-4 text-center">
                Enter your new password
              </p>
              <input
                type="password"
                placeholder="New Password"
                className="w-full px-4 py-2 rounded bg-[#11224d] border border-blue-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Confirm New Password"
                className="w-full px-4 py-2 rounded bg-[#11224d] border border-blue-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                required
              />
              <button
                onClick={handleResetPassword}
                disabled={user.isResetPasswordLoading}
                className={`w-full py-2 rounded bg-green-400 text-white font-semibold hover:bg-green-500 transition mb-4 ${
                  user.isResetPasswordLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {user.isResetPasswordLoading ? 'Resetting...' : 'Reset Password'}
              </button>
            </div>
          )}

          {/* Error Messages */}
          {user.forgotPasswordError && (
            <div className="w-full p-3 bg-red-100 border border-red-400 text-red-700 rounded mb-4">
              {user.forgotPasswordError}
            </div>
          )}

          {user.resetPasswordError && (
            <div className="w-full p-3 bg-red-100 border border-red-400 text-red-700 rounded mb-4">
              {user.resetPasswordError}
            </div>
          )}

          <button
            onClick={handleBackToLogin}
            className="w-full py-2 rounded bg-gray-600 text-white hover:bg-gray-700 transition text-sm"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  // Main Login Form
  return (
    <div className="min-h-screen flex items-center justify-center" style={{background: 'url(https://img.decrypt.co/insecure/rs:fit:1920:0:0:0/plain/https://cdn.decrypt.co/wp-content/uploads/2025/04/cryptocurrency-world-gID_7.jpg@webp) center/cover no-repeat'}}>
      <div className="backdrop-blur-md bg-[#0a1931]/80 rounded-lg shadow-lg p-8 w-full max-w-md flex flex-col items-center">
        <h1 className="text-4xl font-bold text-white mb-2">Trade Crypto</h1>
        <h2 className="text-xl text-white mb-6">Login</h2>
        
        {/* Error Message Display */}
        {user.error && (
          <div className="w-full p-3 bg-red-100 border border-red-400 text-red-700 rounded mb-4">
            {user.error}
          </div>
        )}
        
        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
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
            {user.isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <div className="flex items-center gap-2 mt-4 text-white text-sm">
          <span>Already have account ?</span>
          <Link to="/register" className="underline hover:text-blue-600"><b>SIGNUP</b></Link>
        </div>
        <button 
          onClick={handleForgotPassword}
          className="mt-4 w-full block text-center py-2 rounded bg-[#11224d] text-white hover:bg-blue-900 transition text-sm"
        >
          Forgot Password ?
        </button>
      </div>
    </div>
  );
};

export default Login;