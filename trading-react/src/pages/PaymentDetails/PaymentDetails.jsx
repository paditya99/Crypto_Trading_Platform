import React, { useEffect, useState } from 'react';
import { Building2, CreditCard, User, Hash } from 'lucide-react';
import SubHeader from '../SubHeader/SubHeader';
import { Button } from '@/components/ui/button';
import PaymentDetailsForm from './PaymentDetailsForm';
import { useDispatch, useSelector } from 'react-redux';
import store from '../State/Store';
import { getPaymentDetails } from '../State/Withdrawal/WithdrawalActions';

const PaymentDetails = () => {
  const [isPaymentDetailsFormOpen, setIsPaymentDetailsFormOpen] = useState(false);
  const dispatch=useDispatch();
  const {withdrawal}=useSelector(store=>store);

  const handleAddPaymentDetails = () => {
    setIsPaymentDetailsFormOpen(!isPaymentDetailsFormOpen);
  };

  useEffect(()=>{
    dispatch(getPaymentDetails({jwt: localStorage.getItem("jwt")}));
  },[])

  return (
    <>
      <SubHeader title="Payment Details" />
      {withdrawal.paymentDetails ? (
      <div className="flex items-center justify-center">
        <div className="w-1/2 border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-6">Bank Account Details</h2>
          
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 border rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Bank Name</p>
                <p className="font-medium">{withdrawal.paymentDetails?.bankName}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 border rounded-lg flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Account Number</p>
                <p className="font-medium">
                {(()=>{
                    const accNo=withdrawal.paymentDetails?.accountNumber || "";
                    if(accNo.length !== 10){
                        return <span className="text-red-600 font-bold">Invalid Account Number</span>
                    }
                    const masked="xxxxxx" + accNo.slice(-4);
                    return <span className="font-medium">{masked}</span>
                })()}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 border rounded-lg flex items-center justify-center">
                <User className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Account Holder Name</p>
                <p className="font-medium">{withdrawal.paymentDetails?.accountHolderName}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 border rounded-lg flex items-center justify-center">
                <Hash className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">IFSC Code</p>
                <p className="font-medium">{withdrawal.paymentDetails?.ifsc}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      ) : (
        <>
        <h1 className='text-center text-2xl font-bold'>No details found. Please add your payment details. </h1>
      <Button className='w-auto mt-4 bg-blue-600 text-white hover:bg-blue-800 rounded-full' onClick={handleAddPaymentDetails}>
        Add Payment Details
      </Button>
      </>
      )}
      <PaymentDetailsForm
        isOpen={isPaymentDetailsFormOpen}
        onClose={handleAddPaymentDetails}
      />
    </>
  );
};

export default PaymentDetails; 