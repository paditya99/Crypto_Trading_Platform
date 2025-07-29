import axios from "axios";
import { ADD_COIN_TO_WATCHLIST_FAILURE, ADD_COIN_TO_WATCHLIST_REQUEST, ADD_COIN_TO_WATCHLIST_SUCCESS, GET_USER_WATCHLIST_FAILURE, GET_USER_WATCHLIST_REQUEST, GET_USER_WATCHLIST_SUCCESS } from "./WatchListConstants";

export const getWatchList=({jwt})=>async(dispatch)=>{
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    try{
        dispatch({type: GET_USER_WATCHLIST_REQUEST});
        const res=await axios.get(`${baseUrl}/api/watchlist/user`, {
            headers : {
                Authorization: `Bearer ${jwt}` 
            }
        });
        console.log("Get WatchList--",res.data);
        dispatch({type: GET_USER_WATCHLIST_SUCCESS, payload: res.data});
    }
    catch(error){
        const errorMsg =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      "Get WatchList failed";
        dispatch({type: GET_USER_WATCHLIST_FAILURE, payload: error.message})
        console.log(errorMsg);
    }
}

export const addCoinToWatchList=({coinId, jwt})=>async(dispatch)=>{
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    try{
        dispatch({type: ADD_COIN_TO_WATCHLIST_REQUEST});
        const res=await axios.post(`${baseUrl}/api/watchlist/add/coin/${coinId}`, null, {
            headers : {
                Authorization: `Bearer ${jwt}` 
            }
        });
        console.log("Add Coin to WatchList--",res.data);
        dispatch({type: ADD_COIN_TO_WATCHLIST_SUCCESS, payload: res.data});
    }
    catch(error){
        const errorMsg =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      "Add Coin to WatchList failed";
        dispatch({type: ADD_COIN_TO_WATCHLIST_FAILURE, payload: error.message})
        console.log(errorMsg);
    }
}