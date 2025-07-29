import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { paymentHandler } from '../State/Wallet/WalletAction';
import { CLEAR_DEPOSIT_SUCCESS, CLEAR_WALLET_ERROR } from '../State/Wallet/WalletConstants';

const TopUpForm = ({ isOpen, onClose }) => {
  const [amount, setAmount] = useState('');
  const [amountError, setAmountError] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const dispatch=useDispatch();
  const { wallet } = useSelector(store => store);
  
  // Clear deposit success state when modal opens
  useEffect(() => {
    if (isOpen) {
      if (wallet.depositSuccess) {
        dispatch({ type: CLEAR_DEPOSIT_SUCCESS });
      }
      if (wallet.error) {
        dispatch({ type: CLEAR_WALLET_ERROR });
      }
    }
  }, [isOpen, wallet.depositSuccess, wallet.error, dispatch]);
  
  const handleAmountChange = (e) => {
    const value = e.target.value;
    // Only allow digits, no negative, no zero at start
    if (/^\d*$/.test(value)) {
      setAmount(value);
      setAmountError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || Number(amount) <= 0) {
      setAmountError('Please enter a positive amount');
      return;
    }
    // Handle form submission logic here
    console.log('Amount:', amount, 'Payment Method:', paymentMethod);
    dispatch(paymentHandler({jwt: localStorage.getItem("jwt"), amount, paymentMethod}));
  };

  return (
    isOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
        <div className="bg-gray-800 p-8 rounded-lg w-96 relative">
        <button
          onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-200"
        >
          <X className="w-6 h-6" />
        </button>
        
          <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-6">Top up your wallet</h2>
            
            {/* Show success message if payment is initiated */}
            {wallet.depositSuccess && (
              <div className="bg-green-600 text-white p-4 rounded-lg mb-4">
                <div className="font-bold">Payment Initiated!</div>
                <div>{wallet.depositSuccess.message}</div>
              </div>
            )}

            {/* Show error message if deposit fails */}
            {wallet.error && (
              <div className="bg-red-600 text-white p-4 rounded-lg mb-4">
                <div className="font-bold">Payment Failed!</div>
                <div>{wallet.error}</div>
              </div>
            )}
          
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Enter amount
              </label>
              <input
                type="number"
                value={amount}
                onChange={handleAmountChange}
                placeholder="Enter amount"
                disabled={wallet.isLoading}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                required
                min="1"
                inputMode="numeric"
              />
              {amountError && (
                <div className="text-red-600 font-bold mt-1">{amountError}</div>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Select Payment method
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="RAZORPAY"
                    checked={paymentMethod === 'RAZORPAY'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    disabled={wallet.isLoading}
                    className="mr-3 text-blue-600 focus:ring-blue-500 focus:ring-2 disabled:opacity-50"
                    required
                  />
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg" 
                    alt="RAZORPAY"
                    className="h-6 w-auto bg-white px-2 py-1 rounded"
                  />
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="STRIPE"
                    checked={paymentMethod === 'STRIPE'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    disabled={wallet.isLoading}
                    className="mr-3 text-blue-600 focus:ring-blue-500 focus:ring-2 disabled:opacity-50"
                    required
                  />
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" 
                    alt="STRIPE"
                    className="h-6 w-auto bg-white px-2 py-1 rounded"
                  />
                </label>
              </div>
            </div>
            
              <button
              type="submit"
              disabled={wallet.isLoading}
              className={`w-full py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-colors ${
                wallet.isLoading
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
              >
              {wallet.isLoading ? 'Processing...' : 'Submit'}
              </button>
          </form>
        </div>
    </div>
    )
  );
}

export default TopUpForm;