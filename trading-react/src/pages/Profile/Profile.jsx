import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import SubHeader from '../SubHeader/SubHeader';
import { User, Shield, X } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { sendTwoFactorOTP, verifyTwoFactorOTP, sendAccountVerificationOTP, verifyAccountOTP, disableTwoFactorOTP } from '../State/Auth/AuthAction';

const Profile = () => {
  const [isVerifyPopupOpen, setIsVerifyPopupOpen] = useState(false);
  const [isOTPPopupOpen, setIsOTPPopupOpen] = useState(false);
  const [isAccountVerificationPopupOpen, setIsAccountVerificationPopupOpen] = useState(false);
  const [isAccountVerificationOTPPopupOpen, setIsAccountVerificationOTPPopupOpen] = useState(false);
  const [isDisablePopupOpen, setIsDisablePopupOpen] = useState(false);
  const [otp, setOtp] = useState('');
  const [accountVerificationOtp, setAccountVerificationOtp] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const dispatch = useDispatch();
  const {user} = useSelector(store => store);
  
  // Show OTP alerts for development
  useEffect(() => {
    if (user.isOtpSent && user.twoFactorOtp && !user.twoFactorError) {
      alert(`🔐 Two Factor Authentication OTP: ${user.twoFactorOtp}\n\nThis OTP is for development purposes since email is not configured.`);
    }
  }, [user.isOtpSent, user.twoFactorOtp, user.twoFactorError]);

  useEffect(() => {
    if (user.isAccountVerificationOtpSent && user.accountVerificationOtp && !user.accountVerificationError) {
      alert(`🔐 Account Verification OTP: ${user.accountVerificationOtp}\n\nThis OTP is for development purposes since email is not configured.`);
    }
  }, [user.isAccountVerificationOtpSent, user.accountVerificationOtp, user.accountVerificationError]);

  const userInfo = {
    name: user.user?.fullname || "",
    email: user.user?.email || "",
    dateOfBirth: '1990-05-15',
    nationality: 'American',
    address: '123 Main Street, Apt 4B',
    city: 'New York',
    pincode: '10001',
    country: 'United States'
  };

  const handleEnableTwoFactor = () => {
    if (user.isTwoFactorEnabled) {
      // If already enabled, open disable popup
      setIsDisablePopupOpen(true);
      setSuccessMessage('');
    } else {
      // If not enabled, open verification popup (existing logic)
      setIsVerifyPopupOpen(true);
      setSuccessMessage('');
    }
  };

  const handleDisableTwoFactor = async () => {
    try {
      console.log('Disabling Two Factor Authentication');
      const result = await dispatch(disableTwoFactorOTP());
      console.log('Disable 2FA result:', result);
      setIsDisablePopupOpen(false);
      setSuccessMessage('Two Factor Authentication disabled successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error disabling 2FA:', error);
      alert('Failed to disable Two Factor Authentication. Please try again.');
    }
  };

  const handleAccountVerification = () => {
    if (user.isAccountVerified) {
      alert('Account is already verified');
    } else {
      // Open account verification popup
      setIsAccountVerificationPopupOpen(true);
      setSuccessMessage(''); // Clear any previous messages
    }
  };

  const handleSendOTP = async () => {
    try {
    console.log('Sending OTP to:', userInfo.email);
      const result = await dispatch(sendTwoFactorOTP('EMAIL'));
      console.log('Send OTP result:', result);
    // Close verify popup and open OTP popup
    setIsVerifyPopupOpen(false);
    setIsOTPPopupOpen(true);
      setSuccessMessage('OTP sent successfully! Check your email (or console for development).');
      
      // Development helper: Show a note about checking console
      setTimeout(() => {
        console.log('=== DEVELOPMENT NOTE ===');
        console.log('Check the backend console for the OTP');
        console.log('The OTP will be logged there since email is not configured');
        console.log('=== END DEVELOPMENT NOTE ===');
      }, 1000);
    } catch (error) {
      console.error('Error sending OTP:', error);
      alert('Failed to send OTP. Please try again.');
    }
  };

  const handleOTPSubmit = async () => {
    if (otp.length === 6) {
      try {
      console.log('OTP submitted:', otp);
        const result = await dispatch(verifyTwoFactorOTP(otp));
        console.log('Verify OTP result:', result);
        // Close all popups and reset OTP
      setIsOTPPopupOpen(false);
      setOtp('');
        setSuccessMessage('Two Factor Authentication enabled successfully!');
        // Clear success message after 3 seconds
        setTimeout(() => setSuccessMessage(''), 3000);
      } catch (error) {
        console.error('Error verifying OTP:', error);
        alert('Invalid OTP. Please try again.');
      }
    } else {
      alert('Please enter a 6-digit OTP');
    }
  };

  const handleSendAccountVerificationOTP = async () => {
    try {
      console.log('Sending account verification OTP to:', userInfo.email);
      const result = await dispatch(sendAccountVerificationOTP('EMAIL'));
      console.log('Send account verification OTP result:', result);
      // Close verification popup and open OTP popup
      setIsAccountVerificationPopupOpen(false);
      setIsAccountVerificationOTPPopupOpen(true);
      setSuccessMessage('Account verification OTP sent successfully! Check your email (or console for development).');
      
      // Development helper: Show a note about checking console
      setTimeout(() => {
        console.log('=== ACCOUNT VERIFICATION DEVELOPMENT NOTE ===');
        console.log('Check the backend console for the account verification OTP');
        console.log('The OTP will be logged there since email is not configured');
        console.log('=== END ACCOUNT VERIFICATION DEVELOPMENT NOTE ===');
      }, 1000);
    } catch (error) {
      console.error('Error sending account verification OTP:', error);
      alert('Failed to send account verification OTP. Please try again.');
    }
  };

  const handleAccountVerificationOTPSubmit = async () => {
    if (accountVerificationOtp.length === 6) {
      try {
        console.log('Account verification OTP submitted:', accountVerificationOtp);
        const result = await dispatch(verifyAccountOTP(accountVerificationOtp));
        console.log('Verify account OTP result:', result);
        // Close all popups and reset OTP
        setIsAccountVerificationOTPPopupOpen(false);
        setAccountVerificationOtp('');
        setSuccessMessage('Account verification successful!');
        // Clear success message after 3 seconds
        setTimeout(() => setSuccessMessage(''), 3000);
      } catch (error) {
        console.error('Error verifying account OTP:', error);
        alert('Invalid OTP. Please try again.');
      }
    } else {
      alert('Please enter a 6-digit OTP');
    }
  };



  return (
    <>
      <SubHeader title="Profile" />
      <div className="flex flex-col items-center space-y-6 p-6">
        
        {/* Success Message */}
        {successMessage && (
          <div className="w-full max-w-5xl p-4 bg-green-100 border border-green-400 text-green-700 rounded">
            {successMessage}
          </div>
        )}
        
        {/* Your Information Card */}
        <Card className="w-full max-w-5xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <User className="w-6 h-6 text-blue-400" />
            <h2 className="text-xl font-semibold text-white">Your information</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Name</label>
              <p className="text-white font-medium">{userInfo.name}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
              <p className="text-white font-medium">{userInfo.email}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Date of Birth</label>
              <p className="text-white font-medium">{userInfo.dateOfBirth}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Nationality</label>
              <p className="text-white font-medium">{userInfo.nationality}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Address</label>
              <p className="text-white font-medium">{userInfo.address}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">City</label>
              <p className="text-white font-medium">{userInfo.city}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Pincode</label>
              <p className="text-white font-medium">{userInfo.pincode}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Country</label>
              <p className="text-white font-medium">{userInfo.country}</p>
            </div>
          </div>
        </Card>

        {/* Two Step Verification Card */}
        <Card className="w-full max-w-5xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-6 h-6 text-green-400" />
            <h2 className="text-xl font-semibold text-white">Two step verification</h2>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-gray-300">Status:</span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                user.isTwoFactorEnabled 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-orange-100 text-orange-800'
              }`}>
                {user.isTwoFactorEnabled ? 'Enabled' : 'Disabled'}
              </span>
            </div>
            <Button 
              onClick={handleEnableTwoFactor}
              disabled={user.isTwoFactorLoading || user.isDisableTwoFactorLoading}
              className={`${
                user.isTwoFactorEnabled 
                  ? 'bg-orange-600 hover:bg-orange-700' 
                  : 'bg-green-600 hover:bg-green-700'
              } ${(user.isTwoFactorLoading || user.isDisableTwoFactorLoading) ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {user.isTwoFactorLoading ? 'Loading...' : 
               user.isDisableTwoFactorLoading ? 'Disabling...' :
               user.isTwoFactorEnabled ? 'Disable two factor auth' : 'Enable two factor auth'}
            </Button>
          </div>
          
          {/* Error message display */}
          {user.twoFactorError && (
            <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {user.twoFactorError}
            </div>
          )}
          
          {/* Disable 2FA error message display */}
          {user.disableTwoFactorError && (
            <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {user.disableTwoFactorError}
            </div>
          )}
        </Card>

        {/* Account Status Card */}
        <Card className="w-full max-w-5xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-6 h-6 text-green-400" />
              <h2 className="text-xl font-semibold text-white">Account Status</h2>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-gray-300">Status:</span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                user.isAccountVerified 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-orange-100 text-orange-800'
              }`}>
                {user.isAccountVerified ? 'Verified' : 'Pending'}
              </span>
              </div>
              <Button 
                onClick={handleAccountVerification}
                disabled={user.isAccountVerificationLoading || user.isAccountVerified}
              className={`${
                  user.isAccountVerificationLoading || user.isAccountVerified ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {user.isAccountVerificationLoading ? 'Loading...' : 
                 user.isAccountVerified ? 'Account Verified' : 'Verify Account'}
              </Button>
            </div>

            {/* Account verification error message display */}
            {user.accountVerificationError && (
              <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {user.accountVerificationError}
              </div>
            )}
          </Card>
      </div>
      
      {/* Verify Account Popup (for 2FA enable) */}
      {isVerifyPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg w-80 relative">
            <button
              onClick={() => setIsVerifyPopupOpen(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-200"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-white mb-4">Verify your account</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <p className="text-white font-medium bg-gray-700 p-2 rounded border border-gray-600">
                  {userInfo.email}
                </p>
              </div>
              
              <button
                onClick={handleSendOTP}
                disabled={user.isTwoFactorLoading}
                className={`w-full py-2 px-4 mt-4 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors ${
                  user.isTwoFactorLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {user.isTwoFactorLoading ? 'Sending...' : 'Send OTP'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* OTP Entry Popup (for 2FA enable) */}
      {isOTPPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg w-80 relative">
            <button
              onClick={() => {
                setIsOTPPopupOpen(false);
                setOtp('');
              }}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-200"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-white mb-4">Enter OTP</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  6-digit OTP
                </label>
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
                  className="w-full p-2 text-sm bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 text-center tracking-widest text-lg"
                />
                <p className="text-xs text-gray-400 mt-1">
                  OTP sent to {userInfo.email}
                </p>
              </div>
              
              <button
                onClick={handleOTPSubmit}
                disabled={user.isTwoFactorLoading}
                className={`w-full py-2 px-4 mt-4 bg-green-600 text-white rounded hover:bg-green-700 focus:outline-none focus:ring-1 focus:ring-green-500 transition-colors ${
                  user.isTwoFactorLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {user.isTwoFactorLoading ? 'Verifying...' : 'Submit'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Disable 2FA Confirmation Popup */}
      {isDisablePopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg w-80 relative">
            <button
              onClick={() => setIsDisablePopupOpen(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-200"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-white mb-4">Disable Two Factor Authentication</h2>
              
              <div className="text-gray-300 text-sm">
                <p>Are you sure you want to disable Two Factor Authentication?</p>
                <p className="mt-2 text-orange-300">
                  <strong>Warning:</strong> This will make your account less secure.
                </p>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setIsDisablePopupOpen(false)}
                  className="flex-1 py-2 px-4 bg-gray-600 text-white rounded hover:bg-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-500 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDisableTwoFactor}
                  disabled={user.isDisableTwoFactorLoading}
                  className={`flex-1 py-2 px-4 bg-orange-600 text-white rounded hover:bg-orange-700 focus:outline-none focus:ring-1 focus:ring-orange-500 transition-colors ${
                    user.isDisableTwoFactorLoading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {user.isDisableTwoFactorLoading ? 'Disabling...' : 'Disable 2FA'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Account Verification Popup */}
      {isAccountVerificationPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg w-80 relative">
            <button
              onClick={() => setIsAccountVerificationPopupOpen(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-200"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-white mb-4">Verify your account</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <p className="text-white font-medium bg-gray-700 p-2 rounded border border-gray-600">
                  {userInfo.email}
                </p>
              </div>
              
              <button
                onClick={handleSendAccountVerificationOTP}
                disabled={user.isAccountVerificationLoading}
                className={`w-full py-2 px-4 mt-4 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors ${
                  user.isAccountVerificationLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {user.isAccountVerificationLoading ? 'Sending...' : 'Send Verification OTP'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Account Verification OTP Entry Popup */}
      {isAccountVerificationOTPPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg w-80 relative">
            <button
              onClick={() => {
                setIsAccountVerificationOTPPopupOpen(false);
                setAccountVerificationOtp('');
              }}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-200"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-white mb-4">Enter Verification OTP</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  6-digit OTP
                </label>
                <input
                  type="text"
                  value={accountVerificationOtp}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, ''); // Only allow digits
                    if (value.length <= 6) {
                      setAccountVerificationOtp(value);
                    }
                  }}
                  placeholder="Enter 6-digit OTP"
                  maxLength={6}
                  className="w-full p-2 text-sm bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 text-center tracking-widest text-lg"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Verification OTP sent to {userInfo.email}
                </p>
              </div>
              
              <button
                onClick={handleAccountVerificationOTPSubmit}
                disabled={user.isAccountVerificationLoading}
                className={`w-full py-2 px-4 mt-4 bg-green-600 text-white rounded hover:bg-green-700 focus:outline-none focus:ring-1 focus:ring-green-500 transition-colors ${
                  user.isAccountVerificationLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {user.isAccountVerificationLoading ? 'Verifying...' : 'Submit'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile; 