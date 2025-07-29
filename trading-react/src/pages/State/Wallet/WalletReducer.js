import { CLEAR_DEPOSIT_SUCCESS, CLEAR_TRANSFER_SUCCESS, CLEAR_WALLET_ERROR, DEPOSIT_MONEY_FAILURE, DEPOSIT_MONEY_REQUEST, DEPOSIT_MONEY_SUCCESS, GET_USER_WALLET_FAILURE, GET_USER_WALLET_REQUEST, GET_USER_WALLET_SUCCESS, GET_WALLET_TRANSACTIONS_REQUEST, GET_WALLET_TRANSACTIONS_SUCCESS, TRANSFER_MONEY_FAILURE, TRANSFER_MONEY_REQUEST, TRANSFER_MONEY_SUCCESS } from "./WalletConstants"


const initialState = {
    userWallet: {},
    error: null,
    isLoading: false,
    transactions: [],
    transferSuccess: null,
    depositSuccess: null,
    withdrawalSuccess: null
}

const walletReducer = (state=initialState, action)=>{
    switch(action.type){
        case GET_USER_WALLET_REQUEST:
        case GET_WALLET_TRANSACTIONS_REQUEST:
        case DEPOSIT_MONEY_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null
            }
            
        case TRANSFER_MONEY_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null,
                transferSuccess: null
            }

        case GET_WALLET_TRANSACTIONS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                transactions: action.payload
            }

        case GET_USER_WALLET_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                userWallet: action.payload
            }
            
        case DEPOSIT_MONEY_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                userWallet: action.payload,
                depositSuccess: action.depositInfo || null
            }
            
        case TRANSFER_MONEY_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                userWallet: action.payload,
                transferSuccess: action.transferInfo || null
            }

        case GET_USER_WALLET_FAILURE:
        case DEPOSIT_MONEY_FAILURE:
        case TRANSFER_MONEY_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
            
        case CLEAR_TRANSFER_SUCCESS:
            return {
                ...state,
                transferSuccess: null
            }
            
        case CLEAR_DEPOSIT_SUCCESS:
            return {
                ...state,
                depositSuccess: null
            }
            
        case CLEAR_WALLET_ERROR:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}


export default walletReducer;