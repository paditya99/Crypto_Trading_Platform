import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import store from '../State/Store';
import { addPaymentDetails } from '../State/Withdrawal/WithdrawalActions';

const PaymentDetailsForm = ({ isOpen, onClose }) => {
  const [accountHolderName, setAccountHolderName] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [confirmAccountNumber, setConfirmAccountNumber] = useState('');
  const [bankName, setBankName] = useState('');

  const dispatch=useDispatch();
  const {withdrawal} = useSelector(store=>store);

  const handleSubmit = (e) => {
    
    // Validate that account numbers match
    if (accountNumber !== confirmAccountNumber) {
      alert('Account numbers do not match!');
      return;
    }

    const formData = {
      accountHolderName, 
      ifsc: ifscCode,
      accountNumber,
      confirmAccountNumber,
      bankName
    };
    // Handle form submission logic here
    dispatch(addPaymentDetails({
      paymentDetailsRequest: formData,
      jwt: localStorage.getItem("jwt")
    }))

    console.log('Payment Details:', formData);
  };

  return (
    isOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
        <div className="bg-gray-800 p-6 rounded-lg w-80 relative">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-200"
          >
            <X className="w-5 h-5" />
          </button>
          
          <form onSubmit={handleSubmit} className="space-y-3">
            <h2 className="text-lg font-bold text-white mb-4">Add Payment Details</h2>
            
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">
                Account holder name
              </label>
              <input
                type="text"
                value={accountHolderName}
                onChange={(e) => setAccountHolderName(e.target.value)}
                placeholder="Enter name"
                className="w-full p-2 text-sm bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">
                IFSC code
              </label>
              <input
                type="text"
                value={ifscCode}
                onChange={(e) => setIfscCode(e.target.value)}
                placeholder="Enter IFSC"
                className="w-full p-2 text-sm bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">
                Account number
              </label>
              <input
                type="text"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                placeholder="Enter account number"
                className="w-full p-2 text-sm bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">
                Confirm account number
              </label>
              <input
                type="text"
                value={confirmAccountNumber}
                onChange={(e) => setConfirmAccountNumber(e.target.value)}
                placeholder="Confirm account number"
                className="w-full p-2 text-sm bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">
                Bank name
              </label>
              <input
                type="text"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                placeholder="Enter bank name"
                className="w-full p-2 text-sm bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full py-2 px-4 mt-4 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    )
  );
}

export default PaymentDetailsForm