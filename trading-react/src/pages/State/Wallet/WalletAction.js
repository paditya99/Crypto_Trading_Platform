import axios from "axios";
import { DEPOSIT_MONEY_FAILURE, DEPOSIT_MONEY_REQUEST, DEPOSIT_MONEY_SUCCESS, GET_USER_WALLET_FAILURE, GET_USER_WALLET_REQUEST, GET_USER_WALLET_SUCCESS, GET_WALLET_TRANSACTIONS_FAILURE, GET_WALLET_TRANSACTIONS_REQUEST, GET_WALLET_TRANSACTIONS_SUCCESS, TRANSFER_MONEY_FAILURE, TRANSFER_MONEY_REQUEST, TRANSFER_MONEY_SUCCESS } from "./WalletConstants";
import { useNavigate } from "react-router-dom";

export const getUserWallet=(jwt)=>async(dispatch)=>{
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    try{
        dispatch({type: GET_USER_WALLET_REQUEST});
        const res=await axios.get(`${baseUrl}/api/wallet/get-wallet`, {
            headers : {
                Authorization: `Bearer ${jwt}` 
            }
        });
        console.log("User Wallet--",res.data);
        dispatch({type: GET_USER_WALLET_SUCCESS, payload: res.data});
    }
    catch(error){
        dispatch({type: GET_USER_WALLET_FAILURE, payload: error.message})
        console.log(error);
    }
}

export const getUserWalletTransactions=(jwt)=>async(dispatch)=>{
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    try{
        dispatch({type: GET_WALLET_TRANSACTIONS_REQUEST});
        const res=await axios.get(`${baseUrl}/api/wallet/transactions`, {
            headers : {
                Authorization: `Bearer ${jwt}` 
            }
        });
        console.log("User wallet transactions--",res.data);
        dispatch({type: GET_WALLET_TRANSACTIONS_SUCCESS, payload: res.data});
    }
    catch(error){
        dispatch({type: GET_WALLET_TRANSACTIONS_FAILURE, payload: error.message})
        console.log(error);
    }
}

export const depositMoneyToWallet=({jwt, paymentId, orderId, navigate})=>async(dispatch)=>{
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    console.log("$$$$$orderid"+orderId+" $$$$$$paymentId"+paymentId)
    try{
        dispatch({type: DEPOSIT_MONEY_REQUEST});
        const res=await axios.put(`${baseUrl}/api/wallet/deposit`, null, {
            params : {
                order_id: orderId,
                payment_id: paymentId
            },
            headers : {
                Authorization: `Bearer ${jwt}` 
            }
        });
        console.log("Deposit money--",res.data);
        
        // Create deposit info for success message
        const depositInfo = {
            amount: res.data.balance,
            message: "Money successfully added to wallet"
        };
        
        dispatch({type: DEPOSIT_MONEY_SUCCESS, payload: res.data, depositInfo: depositInfo});
        
        // Fetch updated transaction history after successful deposit
        try {
            const transactionRes = await axios.get(`${baseUrl}/api/wallet/transactions`, {
                headers : {
                    Authorization: `Bearer ${jwt}` 
                }
            });
            console.log("Updated wallet transactions--",transactionRes.data);
            dispatch({type: GET_WALLET_TRANSACTIONS_SUCCESS, payload: transactionRes.data});
        } catch (transactionError) {
            console.log("Error fetching updated transactions:", transactionError);
        }
        
        navigate("/wallet")
    }
    catch(error){
        const errorMsg = error.response?.data?.message || error.message || "Deposit failed";
        dispatch({type: DEPOSIT_MONEY_FAILURE, payload: errorMsg})
        console.log(error);
    }
}

//the below action is of PaymentController
export const paymentHandler=({jwt, amount, paymentMethod})=>async(dispatch)=>{
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    try{
        dispatch({type: DEPOSIT_MONEY_REQUEST});
        const res=await axios.post(`${baseUrl}/api/payment/${paymentMethod}/amount/${amount}`, null, {
            headers : {
                Authorization: `Bearer ${jwt}` 
            }
        });
        
        // Create deposit info for success message
        const depositInfo = {
            amount: amount,
            message: `Payment initiated for $${amount}. Redirecting to payment gateway...`
        };
        
        dispatch({type: DEPOSIT_MONEY_SUCCESS, payload: res.data, depositInfo: depositInfo});
        window.location.href=res.data.payment_url;
    }
    catch(error){
        const errorMsg = error.response?.data?.message || error.message || "Payment failed";
        dispatch({type: DEPOSIT_MONEY_FAILURE, payload: errorMsg})
        console.log(error);
    }
}

export const transferMoney=({jwt, walletId, reqData})=>async(dispatch)=>{
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    try{
        dispatch({type: TRANSFER_MONEY_REQUEST});
        const res=await axios.put(`${baseUrl}/api/wallet/${walletId}/transfer`, reqData, {
            headers : {
                Authorization: `Bearer ${jwt}` 
            }
        });        
        console.log("Transfer money--"+res.data);
        
        // Create transfer info for success message
        const transferInfo = {
            amount: reqData.amount,
            walletId: walletId,
            message: `Money transferred to wallet - ${walletId}`
        };
        
        dispatch({type: TRANSFER_MONEY_SUCCESS, payload: res.data, transferInfo: transferInfo});
        
        // Fetch updated transaction history after successful transfer
        try {
            const transactionRes = await axios.get(`${baseUrl}/api/wallet/transactions`, {
                headers : {
                    Authorization: `Bearer ${jwt}` 
                }
            });
            console.log("Updated wallet transactions after transfer--",transactionRes.data);
            dispatch({type: GET_WALLET_TRANSACTIONS_SUCCESS, payload: transactionRes.data});
        } catch (transactionError) {
            console.log("Error fetching updated transactions after transfer:", transactionError);
        }
    }
    catch(error){
        const errorMsg = error.response?.data?.message || error.message || "Transfer failed";
        dispatch({type: TRANSFER_MONEY_FAILURE, payload: errorMsg})
        console.log(error);
    }
}