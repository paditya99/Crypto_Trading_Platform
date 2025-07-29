import axios from "axios";
import { FETCH_COIN_BY_ID_FAILURE, FETCH_COIN_BY_ID_REQUEST, FETCH_COIN_BY_ID_SUCCESS, FETCH_COIN_DETAILS_FAILURE, FETCH_COIN_DETAILS_REQUEST, FETCH_COIN_DETAILS_SUCCESS, FETCH_COIN_LIST_FAILURE, FETCH_COIN_LIST_REQUEST, FETCH_COIN_LIST_SUCCESS, FETCH_MARKET_CHART_FAILURE, FETCH_MARKET_CHART_REQUEST, FETCH_MARKET_CHART_SUCCESS, FETCH_TOP_50_COINS_FAILURE, FETCH_TOP_50_COINS_REQUEST, FETCH_TOP_50_COINS_SUCCESS, SEARCH_COIN_FAILURE, SEARCH_COIN_REQUEST, SEARCH_COIN_SUCCESS } from "./CoinConstants"

export const getAllCoinsList=(page)=>async(dispatch)=>{
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    try{
        dispatch({type: FETCH_COIN_LIST_REQUEST});
        const res=await axios.get(`${baseUrl}/coins?page=${page}`);
        console.log("Coins list--",res.data);
        dispatch({type: FETCH_COIN_LIST_SUCCESS, payload: res.data});
    }
    catch(error){
        dispatch({type: FETCH_COIN_LIST_FAILURE, payload: error.message})
        console.log(error);
    }
}

export const getTop50CoinsList=()=>async(dispatch)=>{
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    try{
        dispatch({type: FETCH_TOP_50_COINS_REQUEST});
        const res=await axios.get(`${baseUrl}/coins/top50`);
        console.log("Top 50 Coins list--",res.data);
        dispatch({type: FETCH_TOP_50_COINS_SUCCESS, payload: res.data});
    }
    catch(error){
        dispatch({type: FETCH_TOP_50_COINS_FAILURE, payload: error.message})
        console.log(error);
    }
}

export const getMarketChart=({coinId, days, jwt})=>async(dispatch)=>{
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    try{
        dispatch({type: FETCH_MARKET_CHART_REQUEST});
        const res=await axios.get(`${baseUrl}/coins/${coinId}/chart?days=${days}`, {
            headers : {
                Authorization: `Bearer ${jwt}` 
            }
        });
        console.log("Coin market chart--",res.data);
        dispatch({type: FETCH_MARKET_CHART_SUCCESS, payload: res.data});
    }
    catch(error){
        dispatch({type: FETCH_MARKET_CHART_FAILURE, payload: error.message})
        console.log(error);
    }
}

export const getCoinById=({coinId})=>async(dispatch)=>{
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    try{
        dispatch({type: FETCH_COIN_BY_ID_REQUEST});
        const res=await axios.get(`${baseUrl}/coins/${coinId}`);
        console.log("Coin By ID--",res.data);
        dispatch({type: FETCH_COIN_BY_ID_SUCCESS, payload: res.data});
    }
    catch(error){
        dispatch({type: FETCH_COIN_BY_ID_FAILURE, payload: error.message})
        console.log(error);
    }
}

export const getCoinDetails=({coinId, jwt})=>async(dispatch)=>{
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    try{
        dispatch({type: FETCH_COIN_DETAILS_REQUEST});
        const res=await axios.get(`${baseUrl}/coins/details/${coinId}`, {
            headers : {
                Authorization: `Bearer ${jwt}` 
            }
        });
        console.log("Coin Details inside coinAction--",res.data);
        dispatch({type: FETCH_COIN_DETAILS_SUCCESS, payload: res.data});
    }
    catch(error){
        dispatch({type: FETCH_COIN_DETAILS_FAILURE, payload: error.message})
        console.log(error);
    }
}

export const searchCoin=(keyword)=>async(dispatch)=>{
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    try{
        dispatch({type: SEARCH_COIN_REQUEST});
        const res=await axios.get(`${baseUrl}/coins/search?q=${keyword}`);
        console.log("Search Coin--",res.data);
        dispatch({type: SEARCH_COIN_SUCCESS, payload: res.data});
    }
    catch(error){
        dispatch({type: SEARCH_COIN_FAILURE, payload: error.message})
        console.log(error);
    }
}

