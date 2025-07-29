import { FETCH_COIN_BY_ID_FAILURE, FETCH_COIN_BY_ID_REQUEST, FETCH_COIN_BY_ID_SUCCESS, FETCH_COIN_DETAILS_FAILURE, FETCH_COIN_DETAILS_REQUEST, FETCH_COIN_DETAILS_SUCCESS, FETCH_COIN_LIST_FAILURE, FETCH_COIN_LIST_REQUEST, FETCH_COIN_LIST_SUCCESS, FETCH_MARKET_CHART_FAILURE, FETCH_MARKET_CHART_REQUEST, FETCH_MARKET_CHART_SUCCESS, FETCH_TOP_50_COINS_FAILURE, FETCH_TOP_50_COINS_REQUEST, FETCH_TOP_50_COINS_SUCCESS, SEARCH_COIN_FAILURE, SEARCH_COIN_REQUEST, SEARCH_COIN_SUCCESS } from "./CoinConstants"

const initialState={
    coinsList: [],
    top50Coins: [],
    searchCoinList: [],
    marketChart: {data: [], loading: false},
    coinById: null,
    coinDetails: null,
    error: null,
    isLoading: false
}

const coinsReducer=(state=initialState, action)=>{
    switch(action.type){
        case FETCH_COIN_LIST_REQUEST:
            case FETCH_COIN_BY_ID_REQUEST:
            case FETCH_COIN_DETAILS_REQUEST:
            case FETCH_TOP_50_COINS_REQUEST:
            case SEARCH_COIN_REQUEST:
                return {
                    ...state, isLoading: true, error: null
                }
        case FETCH_MARKET_CHART_REQUEST:
            return {
                ...state, error: null, marketChart: {loading: true, data: []}
            }
        case FETCH_COIN_LIST_SUCCESS:
            return {
                ...state, error: null, coinsList: action.payload, isLoading: false
            }
        case FETCH_TOP_50_COINS_SUCCESS:
            return {
                ...state, error: null, top50Coins: action.payload, isLoading: false
            }
        case FETCH_MARKET_CHART_SUCCESS:
            return {
                ...state, error: null, marketChart:{data: action.payload.prices, loading: false}
            }
        case SEARCH_COIN_SUCCESS:
            return {
                ...state, error: null, searchCoinList: action.payload.coins, isLoading: false
            }
        case FETCH_COIN_BY_ID_SUCCESS:
            return {
                ...state, error: null, coinDetails: action.payload, isLoading: false
            }
        case FETCH_COIN_DETAILS_SUCCESS:
            return {
                ...state, error: null, coinDetails: action.payload, isLoading: false
            }
        case FETCH_MARKET_CHART_FAILURE:
            return {
                ...state, marketChart: {data: [], loading: false}, error: action.payload
            }
        case FETCH_COIN_BY_ID_FAILURE:
        case FETCH_TOP_50_COINS_FAILURE:
        case FETCH_COIN_DETAILS_FAILURE:
        case FETCH_COIN_LIST_FAILURE:
        case SEARCH_COIN_FAILURE:
            return {
                ...state, error: action.payload, isLoading: false
            }
        default:
            return state;
    }
};

export default coinsReducer;