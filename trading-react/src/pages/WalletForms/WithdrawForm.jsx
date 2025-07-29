import React, { useEffect, useState } from 'react';
import { X, Building2 } from 'lucide-react';
import store from '../State/Store';
import { useDispatch, useSelector } from 'react-redux';
import { getPaymentDetails, getWithdrawalRequest } from '../State/Withdrawal/WithdrawalActions';
import { CLEAR_WITHDRAWAL_SUCCESS } from '../State/Withdrawal/WithdrawalConstants';
import { CLEAR_WALLET_ERROR } from '../State/Wallet/WalletConstants';
import { useNavigate } from 'react-router-dom';

const WithdrawForm = ({ isOpen, onClose }) => {
  const [amount, setAmount] = useState('');
  const [amountError, setAmountError] = useState('');
  const dispatch = useDispatch();
  const { withdrawal, wallet } = useSelector(store => store);
  const navigate = useNavigate();

  // Reset error when form is opened/closed or amount changes
  useEffect(() => {
    if (isOpen) {
      dispatch(getPaymentDetails({ jwt: localStorage.getItem("jwt") }));
      setAmountError('');
      // Clear withdrawal success state when modal opens
      if (withdrawal.success) {
        dispatch({ type: CLEAR_WITHDRAWAL_SUCCESS });
      }
      // Clear wallet error state when modal opens
      if (wallet.error) {
        dispatch({ type: CLEAR_WALLET_ERROR });
      }
    }
  }, [isOpen, dispatch, withdrawal.success, wallet.error]);

  useEffect(() => {
    setAmountError('');
  }, [amount]);

  // Handle successful withdrawal
  useEffect(() => {
    if (withdrawal.success) {
      // Show success message for 3 seconds then close modal
      setTimeout(() => {
        onClose();
        // Reset form
        setAmount('');
        setAmountError('');
      }, 3000);
    }
  }, [withdrawal.success, onClose]);

  const handleAmountChange = (e) => {
    const value = e.target.value;
    // Only allow digits, no negative, no zero at start
    if (/^\d*$/.test(value)) {
      setAmount(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const availableBalance = Number(wallet.userWallet?.balance || 0);
    if (!amount || Number(amount) <= 0) {
      setAmountError('Please enter a positive amount');
      return;
    }
    if (Number(amount) > availableBalance) {
      setAmountError('Amount exceeds available balance');
      return;
    }
    setAmountError('');
    dispatch(getWithdrawalRequest({ amount, jwt: localStorage.getItem("jwt")}));
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
            <h2 className="text-2xl font-bold text-white mb-6">Request withdrawal</h2>

            {/* Show success message if withdrawal succeeds */}
            {withdrawal.success && (
              <div className="bg-green-600 text-white p-4 rounded-lg mb-4">
                <div className="font-bold">Withdrawal Request Successful!</div>
                <div>Your withdrawal request has been submitted.</div>
                <div className="text-sm mt-1">Amount: ${amount}</div>
              </div>
            )}

            {/* Show error message if withdrawal fails */}
            {withdrawal.error && (
              <div className="bg-red-600 text-white p-4 rounded-lg mb-4">
                <div className="font-bold">Withdrawal Failed!</div>
                <div>{withdrawal.error}</div>
              </div>
            )}

            <div className="bg-gray-700 p-4 rounded-lg">
              <div className="text-sm text-gray-300 mb-1">Available balance</div>
              <div className="text-2xl font-bold text-green-400">${wallet.userWallet?.balance}</div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Enter amount to withdraw
              </label>
              <input
                type="number"
                value={amount}
                onChange={handleAmountChange}
                placeholder="Enter amount"
                disabled={withdrawal.success || withdrawal.isLoading}
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
                Transfer to
              </label>
              <div className="bg-gray-700 p-4 rounded-lg flex items-center gap-3">
                <Building2 className="w-6 h-6 text-blue-400" />
                <div>
                  <div className="text-white font-medium">{withdrawal.paymentDetails?.bankName}</div>
                  <div className="text-gray-400 text-sm">
                    {(() => {
                      const accNo = withdrawal.paymentDetails?.accountNumber || "";
                      if (accNo.length !== 10) {
                        return <span className="text-red-600 font-bold">Invalid Account Number</span>;
                      }
                      const masked = "xxxxxx" + accNo.slice(-4);
                      return <span className="font-medium">{masked}</span>;
                    })()}
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={withdrawal.success || withdrawal.isLoading}
              className={`w-full py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-colors ${
                withdrawal.success || withdrawal.isLoading
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-red-600 text-white hover:bg-red-700'
              }`}
            >
              {withdrawal.isLoading ? 'Processing...' : 'Withdraw'}
            </button>
          </form>
        </div>
      </div>
    )
  );
}

export default WithdrawForm;