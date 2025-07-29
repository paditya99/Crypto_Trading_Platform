import axios from "axios";
import { GET_ALL_ORDERS_FAILURE, GET_ALL_ORDERS_REQUEST, GET_ALL_ORDERS_SUCCESS, PAY_ORDER_FAILURE, PAY_ORDER_REQUEST, PAY_ORDER_SUCCESS } from "./OrderConstants";
import { GET_WALLET_TRANSACTIONS_SUCCESS } from "../Wallet/WalletConstants";

export const payOrder=({jwt, orderData, amount})=>async(dispatch)=>{
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    try{
        dispatch({type: PAY_ORDER_REQUEST});
        const res=await axios.post(`${baseUrl}/api/orders/pay`, orderData, {
            headers : {
                Authorization: `Bearer ${jwt}` 
            }
        });
        dispatch({type: PAY_ORDER_SUCCESS, payload: res.data, amount});
        console.log("Pay Order--",res.data);
        
        // Fetch updated transaction history after successful order
        try {
            const transactionRes = await axios.get(`${baseUrl}/api/wallet/transactions`, {
                headers : {
                    Authorization: `Bearer ${jwt}` 
                }
            });
            console.log("Updated wallet transactions after order--",transactionRes.data);
            dispatch({type: GET_WALLET_TRANSACTIONS_SUCCESS, payload: transactionRes.data});
        } catch (transactionError) {
            console.log("Error fetching updated transactions after order:", transactionError);
        }
    }
    catch(error){
        const errorMsg = error.response?.data?.message || 
                    error.response?.data?.error || 
                    error.message || 
                    "Order failed";
        dispatch({type: PAY_ORDER_FAILURE, payload: errorMsg})
        console.log(errorMsg);
    }
}

export const getAllOrders=({jwt})=>async(dispatch)=>{
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    try{
        dispatch({type: GET_ALL_ORDERS_REQUEST});
        const res=await axios.get(`${baseUrl}/api/orders/allOrders`, {
            headers : {
                Authorization: `Bearer ${jwt}` 
            }
        });
        console.log("Get all Orders--",res.data);
        dispatch({type: GET_ALL_ORDERS_SUCCESS, payload: res.data});
    }
    catch(error){
        dispatch({type: GET_ALL_ORDERS_FAILURE, payload: error.message})
        console.log(error);
    }
}