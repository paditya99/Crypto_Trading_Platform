import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import store from '../State/Store';
import { transferMoney } from '../State/Wallet/WalletAction';
import { getPaymentDetails } from '../State/Withdrawal/WithdrawalActions';
import { CLEAR_TRANSFER_SUCCESS, CLEAR_WALLET_ERROR } from '../State/Wallet/WalletConstants';

const TransferForm = ({ isOpen, onClose }) => {
  const [amount, setAmount] = useState('');
  const [walletId, setWalletId] = useState('');
  const [purpose, setPurpose] = useState('');
  const [amountError, setAmountError] = useState('');

  const dispatch = useDispatch();
  const { wallet } = useSelector(store => store);

  useEffect(() => {
    if (isOpen) {
      dispatch(getPaymentDetails({ jwt: localStorage.getItem("jwt") }));
      setAmountError('');
        // Clear any previous transfer success state
  if (wallet.transferSuccess) {
    dispatch({ type: CLEAR_TRANSFER_SUCCESS });
  }
  // Clear any previous error state
  if (wallet.error) {
    dispatch({ type: CLEAR_WALLET_ERROR });
  }
    }
  }, [isOpen, dispatch, wallet.transferSuccess]);

  useEffect(() => {
    setAmountError('');
  }, [amount]);

  // Handle successful transfer
  useEffect(() => {
    if (wallet.transferSuccess) {
      // Show success message for 3 seconds then close modal
      setTimeout(() => {
        onClose();
        // Reset form
        setAmount('');
        setWalletId('');
        setPurpose('');
        setAmountError('');
      }, 3000);
    }
  }, [wallet.transferSuccess, onClose]);

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
    dispatch(transferMoney({
      jwt: localStorage.getItem("jwt"),
      walletId,
      reqData: {
        amount: amount,
        purpose: purpose
      }
    }));
    // Do not close modal here; let parent handle it on success
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
            <h2 className="text-2xl font-bold text-white mb-6">Transfer to other wallet</h2>
            
            {/* Success Message */}
            {wallet.transferSuccess && (
              <div className="bg-green-600 text-white p-4 rounded-lg mb-4">
                <div className="font-bold">Transfer Successful!</div>
                <div>{wallet.transferSuccess.message}</div>
                <div className="text-sm mt-1">Amount: ${wallet.transferSuccess.amount}</div>
              </div>
            )}

            {/* Error Message */}
            {wallet.error && (
              <div className="bg-red-600 text-white p-4 rounded-lg mb-4">
                <div className="font-bold">Transfer Failed!</div>
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
                disabled={wallet.transferSuccess || wallet.isLoading}
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
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Enter Wallet Id
              </label>
              <input
                type="text"
                value={walletId}
                onChange={(e) => setWalletId(e.target.value)}
                placeholder="Enter wallet ID"
                disabled={wallet.transferSuccess || wallet.isLoading}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Type your purpose
              </label>
              <input
                type="text"
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                placeholder="Enter purpose"
                disabled={wallet.transferSuccess || wallet.isLoading}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                required
              />
            </div>
            <button
              type="submit"
              disabled={wallet.transferSuccess || wallet.isLoading}
              className={`w-full py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-colors ${
                wallet.transferSuccess || wallet.isLoading
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {wallet.isLoading ? 'Transferring...' : 'Send'}
            </button>
          </form>
        </div>
      </div>
    )
  );
}

export default TransferForm;