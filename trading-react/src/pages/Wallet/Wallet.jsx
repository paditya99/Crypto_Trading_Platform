import React, { useEffect, useState } from "react";
import SubHeader from "../SubHeader/SubHeader";
import { CopyIcon, Wallet2Icon, UploadIcon, DownloadIcon, ArrowRightLeftIcon, ShuffleIcon } from "lucide-react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import TopUpForm from "../WalletForms/TopUpForm";
import WithdrawForm from "../WalletForms/WithdrawForm";
import TransferForm from "../WalletForms/TransferForm";
import { useDispatch, useSelector } from "react-redux";
import { depositMoneyToWallet, getUserWallet, getUserWalletTransactions } from "../State/Wallet/WalletAction";
import store from "../State/Store";
import { useNavigate } from "react-router-dom";
import { getPaymentDetails } from "../State/Withdrawal/WithdrawalActions";


function useQuery() {
  return new URLSearchParams(window.location.search);
}


const Wallet = () => {
  const [isTopUpFormOpen, setIsTopUpFormOpen] = useState(false);
  const [isWithdrawFormOpen, setIsWithdrawFormOpen] = useState(false);
  const [isTransferFormOpen, setIsTransferFormOpen] = useState(false);
  const navigate=useNavigate();

  const dispatch=useDispatch();
  const {wallet}=useSelector(store=>store);

  // State for success/error messages
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const query=useQuery();
  const orderId=query.get("order_id");
  const paymentId=query.get("payment_id");
  const razorpayPaymentId=query.get("razorpay_payment_id");

  const handleGetUserWallet=()=>{
    console.log("inside handleGetUserWallet");
    dispatch(getUserWallet(localStorage.getItem("jwt")));
  }

  const handleGetWalletTransactions=()=>{
    console.log("inside handleGetWalletTransactions");
    dispatch(getUserWalletTransactions(localStorage.getItem("jwt")));
  }

  useEffect(()=>{
      if(orderId){
        dispatch(depositMoneyToWallet({jwt: localStorage.getItem("jwt"), paymentId: razorpayPaymentId || paymentId, orderId, navigate}))
      }
  },[orderId, paymentId, razorpayPaymentId])

  useEffect(()=>{
    handleGetUserWallet();
    handleGetWalletTransactions();
    dispatch(getPaymentDetails({jwt: localStorage.getItem("jwt")}))
  },[dispatch])

  // Handle success and error messages
  useEffect(() => {
    if (wallet.transferSuccess) {
      setSuccessMessage(wallet.transferSuccess.message);
      setTimeout(() => setSuccessMessage(''), 5000);
    }
    if (wallet.depositSuccess) {
      setSuccessMessage(wallet.depositSuccess.message);
      setTimeout(() => setSuccessMessage(''), 5000);
    }
    if (wallet.error) {
      setErrorMessage(wallet.error);
      setTimeout(() => setErrorMessage(''), 5000);
    }
  }, [wallet.transferSuccess, wallet.depositSuccess, wallet.error]);


  const handleTopUpClick = () => {
    setIsTopUpFormOpen(!isTopUpFormOpen);
  };

  const handleWithdrawClick = () => {
    setIsWithdrawFormOpen(!isWithdrawFormOpen);
  };

  const handleTransferClick = () => {
    setIsTransferFormOpen(!isTransferFormOpen);
  };

  const getTransactionIcon = (iconType) => {
    switch(iconType) {
      case 'upload':
        return <UploadIcon className="w-5 h-5 text-green-500" />;
      case 'download':
        return <DownloadIcon className="w-5 h-5 text-red-500" />;
      case 'transfer':
        return <ArrowRightLeftIcon className="w-5 h-5 text-blue-500" />;
      case 'shuffle':
        return <ShuffleIcon className="w-5 h-5 text-purple-500" />;
      default:
        return <ShuffleIcon className="w-5 h-5 text-gray-500" />;
    }
  };


  return (
    <>
      <SubHeader title="Wallet"></SubHeader>
      
      {/* Success Message */}
      {successMessage && (
        <div className="fixed top-4 right-4 bg-green-600 text-white p-4 rounded-lg shadow-lg z-50 max-w-md">
          <div className="font-bold">Success!</div>
          <div>{successMessage}</div>
        </div>
      )}
      
      {/* Error Message */}
      {errorMessage && (
        <div className="fixed top-4 right-4 bg-red-600 text-white p-4 rounded-lg shadow-lg z-50 max-w-md">
          <div className="font-bold">Error!</div>
          <div>{errorMessage}</div>
        </div>
      )}
      <div className="flex items-center justify-center">
        <div className="w-1/2 h-[300px] border rounded-lg p-4">
          <div className="flex justify-between items-start">
            <div className="flex items-start gap-2">
              <div className="rounded-full pt-3">
                <Wallet2Icon className="w-8 h-8"></Wallet2Icon>
              </div>
              <div className="flex flex-col justify-start items-start">
                <p>My Wallet</p>
                <div className="flex items-center gap-2">
                  <span>#{wallet.userWallet?.id}</span>
                  <CopyIcon className="cursor-pointer hover:text-gray-500 w-4 h-4"></CopyIcon>
                </div>
              </div>
            </div>
            <div>
              <ReloadIcon className="w-8 h-8 cursor-pointer hover:text-gray-500" onClick={handleGetUserWallet}></ReloadIcon>
            </div>
          </div>
          <div className="flex justify-between items-center mt-4">
            <p className="text-2xl font-bold">${wallet.userWallet.balance}</p>
          </div>
            <div className="flex justify-start items-start gap-5 mt-4">
             <Card 
               className="flex flex-col items-center justify-center p-4 cursor-pointer hover:bg-gray-800 w-40 h-32"
               onClick={handleTopUpClick}
             >
               <UploadIcon className="w-8 h-8 mb-2" />
               <p className="text-sm font-medium">Add money</p>
             </Card>
             <Card className="flex flex-col items-center justify-center p-4 cursor-pointer hover:bg-gray-800 w-40 h-32"
              onClick={handleWithdrawClick}
             >
               <DownloadIcon className="w-8 h-8 mb-2" />
               <p className="text-sm font-medium">Withdraw money</p>
             </Card>
             <Card className="flex flex-col items-center justify-center p-4 cursor-pointer hover:bg-gray-800 w-40 h-32"
              onClick={handleTransferClick}
             >
               <ArrowRightLeftIcon className="w-8 h-8 mb-2" />
               <p className="text-sm font-medium">Transfer</p>
             </Card>
           </div>
        </div>
      </div>
      
      {/* Transaction History Section */}
      <div className="flex items-center justify-center mt-8">
        <div className="w-1/2">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Transaction history</h2>
              <ReloadIcon className="w-8 h-8 cursor-pointer hover:text-gray-500" onClick={handleGetWalletTransactions}></ReloadIcon>
          </div>
          <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
            {wallet.transactions.map((transaction) => (
              <Card key={transaction.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10 bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                      {getTransactionIcon(transaction.icon)}
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">{transaction.transactionType}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {transaction.transactionDate} at {transaction.transactionTime}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold ${
                      transaction.amount > 0 
                        ? 'text-green-600 dark:text-green-400' 
                        : 'text-red-600 dark:text-red-400'
                    }`}>
                      {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
           </div>
        </div>
      </div>
      
      <TopUpForm
        isOpen={isTopUpFormOpen} 
        onClose={handleTopUpClick}
      />
      <WithdrawForm
        isOpen={isWithdrawFormOpen}
        onClose={handleWithdrawClick}
      />
      <TransferForm
        isOpen={isTransferFormOpen}
        onClose={handleTransferClick}
      />
    </>
  );
};

export default Wallet;
