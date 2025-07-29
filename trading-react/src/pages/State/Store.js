import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";
import authReducer from "./Auth/AuthReducer";
import coinsReducer from "./CoinList/CoinReducer";
import walletReducer from "./Wallet/WalletReducer";
import withdrawalReducer from "./Withdrawal/WithdrawalReducer";
import orderReducer from "./Order/OrderReducer";
import assetReducer from "./Asset/AssetReducer";
import watchListReducer from "./WatchList/WatchListReducer";

const rootReducer = combineReducers({
    user: authReducer,
    coin: coinsReducer,
    wallet: walletReducer,
    withdrawal: withdrawalReducer,
    order: orderReducer,
    asset: assetReducer,
    watchList: watchListReducer
})

const store = legacy_createStore(rootReducer, applyMiddleware(thunk));


export default store;