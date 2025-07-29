import axios from "axios";
import { ADD_PAYMENT_DETAILS_FAILURE, ADD_PAYMENT_DETAILS_REQUEST, ADD_PAYMENT_DETAILS_SUCCESS, GET_ALL_WITHDRAWALS_FAILURE, GET_ALL_WITHDRAWALS_REQUEST, GET_ALL_WITHDRAWALS_SUCCESS, GET_PAYMENT_DETAILS_FAILURE, GET_PAYMENT_DETAILS_REQUEST, GET_PAYMENT_DETAILS_SUCCESS, GET_WITHDRAWAL_HISTORY_FAILURE, GET_WITHDRAWAL_HISTORY_REQUEST, GET_WITHDRAWAL_HISTORY_SUCCESS, WITHDRAWAL_FAILURE, WITHDRAWAL_PROCEED_FAILURE, WITHDRAWAL_PROCEED_REQUEST, WITHDRAWAL_PROCEED_SUCCESS, WITHDRAWAL_REQUEST, WITHDRAWAL_SUCCESS } from "./WithdrawalConstants";
import { GET_WALLET_TRANSACTIONS_SUCCESS } from "../Wallet/WalletConstants";

export const getWithdrawalRequest=({amount, jwt})=>async(dispatch)=>{
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    try{
        dispatch({type: WITHDRAWAL_REQUEST});
        const res=await axios.post(`${baseUrl}/api/withdrawal/${amount}`, null, {
            headers : {
                Authorization: `Bearer ${jwt}` 
            }
        });
        console.log("Withdrawal Request--",res.data);
        dispatch({type: WITHDRAWAL_SUCCESS, payload: res.data});
        
        // Fetch updated transaction history after successful withdrawal request
        try {
            const transactionRes = await axios.get(`${baseUrl}/api/wallet/transactions`, {
                headers : {
                    Authorization: `Bearer ${jwt}` 
                }
            });
            console.log("Updated wallet transactions after withdrawal--",transactionRes.data);
            dispatch({type: GET_WALLET_TRANSACTIONS_SUCCESS, payload: transactionRes.data});
        } catch (transactionError) {
            console.log("Error fetching updated transactions after withdrawal:", transactionError);
        }
    }
    catch(error){
        const errorMsg =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      "Withdrawal failed";
        dispatch({type: WITHDRAWAL_FAILURE, payload: error.message})
        console.log(errorMsg);
    }
}

export const proceedWithdrawal=({id, accept, jwt})=>async(dispatch)=>{
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    try{
        dispatch({type: WITHDRAWAL_PROCEED_REQUEST});
        const res=await axios.put(`${baseUrl}/api/admin/withdrawal/${id}/proceed/${accept}`, null, {
            headers : {
                Authorization: `Bearer ${jwt}` 
            }
        });
        console.log("Withdrawal proceed--",res.data);
        dispatch({type: WITHDRAWAL_PROCEED_SUCCESS, payload: res.data});
    }
    catch(error){
        dispatch({type: WITHDRAWAL_PROCEED_FAILURE, payload: error.message})
        console.log(error);
    }
}

export const getWithdrawalHistory=({amount, jwt})=>async(dispatch)=>{
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    try{
        dispatch({type: GET_WITHDRAWAL_HISTORY_REQUEST});
        const res=await axios.get(`${baseUrl}/api/withdrawal/history`, {
            headers : {
                Authorization: `Bearer ${jwt}` 
            }
        });
        console.log("Withdrawal history--",res.data);
        dispatch({type: GET_WITHDRAWAL_HISTORY_SUCCESS, payload: res.data});
    }
    catch(error){
        dispatch({type: GET_WITHDRAWAL_HISTORY_FAILURE, payload: error.message})
        console.log(error);
    }
}

export const getAllWithdrawals=({jwt})=>async(dispatch)=>{
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    try{
        dispatch({type: GET_ALL_WITHDRAWALS_REQUEST});
        const res=await axios.get(`${baseUrl}/api/admin/withdrawal`, null, {
            headers : {
                Authorization: `Bearer ${jwt}` 
            }
        });
        console.log("All Withdrawal Requests--",res.data);
        dispatch({type: GET_ALL_WITHDRAWALS_SUCCESS, payload: res.data});
    }
    catch(error){
        dispatch({type: GET_ALL_WITHDRAWALS_FAILURE, payload: error.message})
        console.log(error);
    }
}

export const addPaymentDetails=({paymentDetailsRequest, jwt})=>async(dispatch)=>{
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    try{
        dispatch({type: ADD_PAYMENT_DETAILS_REQUEST});
        const res=await axios.post(`${baseUrl}/api/payment-details`, paymentDetailsRequest, {
            headers : {
                Authorization: `Bearer ${jwt}` 
            }
        });
        console.log("Add Payment details--",res.data);
        dispatch({type: ADD_PAYMENT_DETAILS_SUCCESS, payload: res.data});
    }
    catch(error){
        dispatch({type: ADD_PAYMENT_DETAILS_FAILURE, payload: error.message})
        console.log(error);
    }
}

export const getPaymentDetails=({jwt})=>async(dispatch)=>{
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    try{
        dispatch({type: GET_PAYMENT_DETAILS_REQUEST});
        const res=await axios.get(`${baseUrl}/api/payment-details`, {
            headers : {
                Authorization: `Bearer ${jwt}` 
            }
        });
        console.log("Get Payment details--",res.data);
        dispatch({type: GET_PAYMENT_DETAILS_SUCCESS, payload: res.data});
    }
    catch(error){
        dispatch({type: GET_PAYMENT_DETAILS_FAILURE, payload: error.message})
        console.log(error);
    }
}



