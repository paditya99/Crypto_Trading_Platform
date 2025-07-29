import { ADD_PAYMENT_DETAILS_FAILURE, ADD_PAYMENT_DETAILS_SUCCESS, CLEAR_WITHDRAWAL_SUCCESS, GET_ALL_WITHDRAWALS_FAILURE, GET_ALL_WITHDRAWALS_REQUEST, GET_ALL_WITHDRAWALS_SUCCESS, GET_PAYMENT_DETAILS_FAILURE, GET_PAYMENT_DETAILS_SUCCESS, GET_WITHDRAWAL_HISTORY_FAILURE, GET_WITHDRAWAL_HISTORY_REQUEST, GET_WITHDRAWAL_HISTORY_SUCCESS, WITHDRAWAL_FAILURE, WITHDRAWAL_PROCEED_FAILURE, WITHDRAWAL_PROCEED_REQUEST, WITHDRAWAL_PROCEED_SUCCESS, WITHDRAWAL_REQUEST, WITHDRAWAL_SUCCESS } from "./WithdrawalConstants";

const initialState = {
    withdrawal: null,
    error: null,
    isLoading: false,
    history: [],
    allWithdrawalRequests: [],
    paymentDetails: null,
    success: false
}

const withdrawalReducer=(state=initialState, action)=>{
    switch(action.type){
        case WITHDRAWAL_REQUEST:
        case WITHDRAWAL_PROCEED_REQUEST:
        case GET_WITHDRAWAL_HISTORY_REQUEST:
        case GET_ALL_WITHDRAWALS_REQUEST:
            return {
                ...state,
                error: null,
                isLoading: true,
                success: false
            }

        case WITHDRAWAL_SUCCESS:
            return {
                ...state,
                error: null,
                isLoading: false,
                withdrawal: action.payload,
                success: true
            }
            
        case WITHDRAWAL_PROCEED_SUCCESS:
            return {
                ...state,
                error: null,
                isLoading: false,
                
            }

        case GET_WITHDRAWAL_HISTORY_SUCCESS:
            return {
                ...state,
                error: null,
                isLoading: false,
                history: action.payload
            }

        case GET_ALL_WITHDRAWALS_SUCCESS:
            return {
                ...state,
                error: null,
                isLoading: false,
                allWithdrawalRequests: action.payload
            }

        case ADD_PAYMENT_DETAILS_SUCCESS:
        case GET_PAYMENT_DETAILS_SUCCESS:
            return {
                ...state,
                error: null,
                isLoading: false,
                paymentDetails: action.payload
            }

        case WITHDRAWAL_FAILURE:
        case WITHDRAWAL_PROCEED_FAILURE:
        case GET_WITHDRAWAL_HISTORY_FAILURE:
        case GET_ALL_WITHDRAWALS_FAILURE:
        case ADD_PAYMENT_DETAILS_FAILURE:
        case GET_PAYMENT_DETAILS_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
                success: false
            }
            
        case CLEAR_WITHDRAWAL_SUCCESS:
            return {
                ...state,
                success: false
            }

        default:
            return state;
    }
}


export default withdrawalReducer;