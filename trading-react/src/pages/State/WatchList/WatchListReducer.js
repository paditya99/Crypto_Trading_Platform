
import { existInWatchList } from "@/utils/existInWatchList";
import { ADD_COIN_TO_WATCHLIST_FAILURE, ADD_COIN_TO_WATCHLIST_REQUEST, ADD_COIN_TO_WATCHLIST_SUCCESS, CLEAR_WATCHLIST_ERROR, GET_USER_WATCHLIST_FAILURE, GET_USER_WATCHLIST_REQUEST, GET_USER_WATCHLIST_SUCCESS } from "./WatchListConstants";
import { ADD_PAYMENT_DETAILS_FAILURE, ADD_PAYMENT_DETAILS_SUCCESS, GET_ALL_WITHDRAWALS_FAILURE, GET_ALL_WITHDRAWALS_REQUEST, GET_ALL_WITHDRAWALS_SUCCESS, GET_PAYMENT_DETAILS_FAILURE, GET_PAYMENT_DETAILS_SUCCESS, GET_WITHDRAWAL_HISTORY_FAILURE, GET_WITHDRAWAL_HISTORY_REQUEST, GET_WITHDRAWAL_HISTORY_SUCCESS, WITHDRAWAL_FAILURE, WITHDRAWAL_PROCEED_FAILURE, WITHDRAWAL_PROCEED_REQUEST, WITHDRAWAL_PROCEED_SUCCESS, WITHDRAWAL_REQUEST, WITHDRAWAL_SUCCESS } from "../Withdrawal/WithdrawalConstants";

const initialState = {
    watchList: null,
    error: null,
    isLoading: false,
    items: [],
    success: false,
    lastAction: null // Add this to track the last action
}

const watchListReducer=(state=initialState, action)=>{
    switch(action.type){
        case GET_USER_WATCHLIST_REQUEST:
        case ADD_COIN_TO_WATCHLIST_REQUEST:
            return {
                ...state,
                error: null,
                isLoading: true,
                success: false,
                lastAction: action.type
            }

        case GET_USER_WATCHLIST_SUCCESS:
            console.log("GET_USER_WATCHLIST_SUCCESS - action.payload:", action.payload);
            console.log("GET_USER_WATCHLIST_SUCCESS - coins:", action.payload.coins);
            return {
                ...state,
                error: null,
                isLoading: false,
                watchList: action.payload,
                items: action.payload.coins || [], // Changed from Objectcoins to coins
                success: true,
                lastAction: action.type
            }
            
        case ADD_COIN_TO_WATCHLIST_SUCCESS:

        console.log("Current state.items:", state.items);
        console.log("action.payload:", action.payload);
        console.log("existInWatchList result:", existInWatchList(state.items, action.payload));

            let updateditems=existInWatchList(state.items, action.payload) 
            ? state.items.filter(item => item.id !== action.payload.id)
            : [action.payload, ...state.items];
            return {
                ...state,
                error: null,
                isLoading: false,
                items: updateditems,
                success: true,
                lastAction: action.type
            }

        case ADD_COIN_TO_WATCHLIST_FAILURE:
        case GET_USER_WATCHLIST_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
                success: false,
                lastAction: action.type
            }

        case CLEAR_WATCHLIST_ERROR:
            return {
                ...state,
                error: null,
                success: false
            }

        default:
            return state;
    }
}


export default watchListReducer;