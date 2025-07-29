import { CLEAR_ORDER_ERROR, GET_ALL_ORDERS_FAILURE, GET_ALL_ORDERS_REQUEST, GET_ALL_ORDERS_SUCCESS, GET_ORDER_FAILURE, GET_ORDER_REQUEST, GET_ORDER_SUCCESS, PAY_ORDER_FAILURE, PAY_ORDER_REQUEST, PAY_ORDER_SUCCESS } from "./OrderConstants";

const initialState={
    allOrders: [],
    isLoading: false,
    error: null,
    order: null,
    success: false, // Add this
}

const orderReducer=(state=initialState, action)=>{
    switch(action.type){
        case GET_ALL_ORDERS_REQUEST:
        case PAY_ORDER_REQUEST:
        case GET_ORDER_REQUEST:
            return{
                ...state,
                isLoading: true,
                error: null,
                success: false, // Reset success on request
            }
        case GET_ALL_ORDERS_SUCCESS:
            return{
                ...state,
                allOrders: action.payload,
                isLoading: false,
                error: null,
                success: true, // Set success on success
            }
        
        case PAY_ORDER_SUCCESS:
        case GET_ORDER_SUCCESS:
            return{
                ...state,
                order: action.payload,
                isLoading: false,
                error: null,
                success: true, // Set success on success
            }

        case GET_ALL_ORDERS_FAILURE:
        case PAY_ORDER_FAILURE:
        case GET_ORDER_FAILURE:
            return{
                ...state,
                error: action.payload,
                isLoading: false,
                success: false, // Reset success on failure
            }

        case CLEAR_ORDER_ERROR:
            return {
                ...state,
                error: null,
                success: false, // Also reset success when clearing error
            }

        default:
            return state;
    }
}

export default orderReducer;
