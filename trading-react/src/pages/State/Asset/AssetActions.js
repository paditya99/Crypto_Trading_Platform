import axios from "axios";
import { GET_ASSET_DETAILS_FAILURE, GET_ASSET_DETAILS_REQUEST, GET_ASSET_DETAILS_SUCCESS, GET_ASSET_FAILURE, GET_ASSET_REQUEST, GET_ASSET_SUCCESS, GET_USER_ASSET_FAILURE, GET_USER_ASSET_REQUEST, GET_USER_ASSET_SUCCESS } from "./AssetConstants";

export const getAsset=({assetId, jwt})=>async(dispatch)=>{
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    try{
        dispatch({type: GET_ASSET_REQUEST});
        const res=await axios.get(`${baseUrl}/api/assets/${assetId}`, {
            headers : {
                Authorization: `Bearer ${jwt}` 
            }
        });
        console.log("Get Asset--",res.data);
        dispatch({type: GET_ASSET_SUCCESS, payload: res.data});
    }
    catch(error){
        dispatch({type: GET_ASSET_FAILURE, payload: error.message})
        console.log(error);
    }
}

export const getUserAssets=({jwt})=>async(dispatch)=>{
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    try{
        dispatch({type: GET_USER_ASSET_REQUEST});
        const res=await axios.get(`${baseUrl}/api/assets`, {
            headers : {
                Authorization: `Bearer ${jwt}` 
            }
        });
        console.log("Get User Assets--",res.data);
        dispatch({type: GET_USER_ASSET_SUCCESS, payload: res.data});
    }
    catch(error){
        dispatch({type: GET_USER_ASSET_FAILURE, payload: error.message})
        console.log(error);
    }
}

export const getAssetDetails=({jwt, coinId})=>async(dispatch)=>{
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    try{
        dispatch({type: GET_ASSET_DETAILS_REQUEST});
        const res=await axios.get(`${baseUrl}/api/assets/coin/${coinId}`, {
            headers : {
                Authorization: `Bearer ${jwt}` 
            }
        });
        console.log("Get Asset Details--",res.data);
        dispatch({type: GET_ASSET_DETAILS_SUCCESS, payload: res.data});
    }
    catch(error){
        dispatch({type: GET_ASSET_DETAILS_FAILURE, payload: error.message})
        console.log(error);
    }
}