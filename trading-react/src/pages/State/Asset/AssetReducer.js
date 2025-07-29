import { GET_ASSET_DETAILS_FAILURE, GET_ASSET_DETAILS_REQUEST, GET_ASSET_DETAILS_SUCCESS, GET_ASSET_FAILURE, GET_ASSET_REQUEST, GET_ASSET_SUCCESS, GET_USER_ASSET_FAILURE, GET_USER_ASSET_REQUEST, GET_USER_ASSET_SUCCESS } from "./AssetConstants"

const initialState={
    allAssets: [],
    isLoading: false,
    error: null,
    userAsset: null,
    assetDetails: null,
}

const assetReducer=(state=initialState, action)=>{
    switch(action.type){
        case GET_ASSET_REQUEST:
        case GET_ASSET_DETAILS_REQUEST:
        case GET_USER_ASSET_REQUEST:
            return{
                ...state,
                isLoading: true,
                error: null,
            }
        case GET_ASSET_SUCCESS:
            return{
                ...state,
                asset: action.payload,
                isLoading: false,
                error: null,
            }

        case GET_ASSET_DETAILS_SUCCESS:
            return{
                ...state,
                assetDetails: action.payload,
                isLoading: false,
                error: null,
            }
        case GET_USER_ASSET_SUCCESS:
            return{
                ...state,
                userAsset: action.payload,
                isLoading: false,
                error: null,
            }

            case GET_ASSET_FAILURE:
            case GET_USER_ASSET_FAILURE:
            case GET_ASSET_DETAILS_FAILURE:
            return{
                ...state,
                error: action.payload,
                isLoading: false,
            }

            default:
                return state;
    }
}

export default assetReducer;
