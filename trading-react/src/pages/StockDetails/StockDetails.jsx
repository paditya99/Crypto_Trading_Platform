import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useParams } from 'react-router-dom';
import { TrendingUp, TrendingDown, Star, Plus, Minus, BarChart3, Activity, Building, Calendar, DotIcon, WatchIcon, BookmarkIcon, X } from 'lucide-react';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { BookmarkFilledIcon } from '@radix-ui/react-icons';
import StockChart from '../Home/StockChart';
import { useDispatch, useSelector } from 'react-redux';
import store from '../State/Store';
import { getCoinDetails } from '../State/CoinList/CoinAction';
import { getAssetDetails } from '../State/Asset/AssetActions';
import { getUserWallet } from '../State/Wallet/WalletAction';
import { payOrder } from '../State/Order/OrderActions';
import { addCoinToWatchList, getWatchList } from '../State/WatchList/WatchListActions';
import { existInWatchList } from '@/utils/existInWatchList';

const StockDetails = () => {
  const [isTradePopupOpen, setIsTradePopupOpen] = useState(false);
  const [tradeAmount, setTradeAmount] = useState('0');
  const [orderType, setOrderType] = useState('BUY');
  const [showInsufficientFunds, setShowInsufficientFunds] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [watchlistMessage, setWatchlistMessage] = useState(''); // Add message state

  const dispatch=useDispatch();
  const params=useParams();
  const {coin, wallet, asset, order, watchList}=useSelector(store => store);
  console.log("params.id-- "+params.id);
  
  const availableCash = wallet.userWallet?.balance;

  const calculateQuantity = (amount) => {
    if (!coin.coinDetails || !coin.coinDetails.market_data || !coin.coinDetails.market_data.current_price?.usd) {
      return 100; // or some default value
    }
    const price = coin.coinDetails?.market_data.current_price.usd;
    const volume = amount / price;
    const decimalPlaces= Math.max(2, price.toString().split('.')[0]?.length);
    return volume.toFixed(decimalPlaces);
  }

  const handleTradeClick = () => {
    setIsTradePopupOpen(true);
    setTradeAmount('0');
    setShowInsufficientFunds(false);
    // Clear any previous order errors
    dispatch({ type: 'CLEAR_ORDER_ERROR' });
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    setTradeAmount(value);
    
    // Check if amount exceeds available cash
    const numericValue = parseFloat(value) || 0;
    setShowInsufficientFunds(numericValue > availableCash);
  };

  const handleBuyClick = () => {
    const numericAmount = parseFloat(tradeAmount) || 0;
    if (numericAmount > availableCash) {
      return; // Don't proceed if insufficient funds
    }
    const quantity = calculateQuantity(numericAmount);
    setQuantity(quantity);
    dispatch(payOrder({jwt: localStorage.getItem("jwt"),orderData:{
      coinId: params.id,
      quantity: quantity,
      orderType: orderType,
    } ,amount: numericAmount }))
    console.log('Buy order:', { amount: tradeAmount, orderType: orderType, quantity: quantity});
    
  };

  const handleSellClick = () => {
    const numericAmount = parseFloat(tradeAmount) || 0;
    if (numericAmount > availableCash) {
      return; // Don't proceed if insufficient funds
    }
    const quantity = calculateQuantity(numericAmount);
    setQuantity(quantity);
    dispatch(payOrder({jwt: localStorage.getItem("jwt"),orderData:{
      coinId: params.id,
      quantity: quantity,
      orderType: orderType,
    } ,amount: numericAmount }))
    console.log('SELL order:', { amount: tradeAmount, orderType: orderType, quantity: quantity});
    
  };

  useEffect(() => {
    if (order.success) {
      setIsTradePopupOpen(false);
    }
  }, [order.success]);

  // Add useEffect for watchlist messages
  useEffect(() => {
    // Only show message for add/remove operations, not for initial load
    if (watchList.success && watchList.items && watchList.lastAction === 'ADD_COIN_TO_WATCHLIST') {
      setWatchlistMessage('Item added to watchlist');
      setTimeout(() => setWatchlistMessage(''), 3000);
    } else if (watchList.error && watchList.lastAction === 'ADD_COIN_TO_WATCHLIST') {
      setWatchlistMessage('Item not added');
      setTimeout(() => setWatchlistMessage(''), 3000);
    }
  }, [watchList.success, watchList.error, watchList.items, watchList.lastAction]);


  useEffect(() => {
    console.log("Inside useEffect,going to dispatch, coinId--"+params.id)
    dispatch(getCoinDetails({coinId: params.id, jwt: localStorage.getItem("jwt")}))
    //dispatch(getAssetDetails({jwt: localStorage.getItem("jwt"), coinId: params.id}))
    
    // Delay getUserWallet to avoid race condition
    setTimeout(() => {
      dispatch(getUserWallet(localStorage.getItem("jwt")))
      dispatch(getAssetDetails({jwt: localStorage.getItem("jwt"), coinId: params.id}))
      dispatch(getWatchList({jwt: localStorage.getItem("jwt")}))
    }, 1000); // 1 second delay
  }, [params.id])

  // useEffect(()=>{
  //   dispatch(getUserWallet({jwt: localStorage.getItem("jwt")}))
  // },[])

  const handleAddToWatchList=()=>{
    dispatch(addCoinToWatchList({coinId: params.id, jwt: localStorage.getItem("jwt")}))
  }

  return (
    <div className="p-6">
      <div className="flex items-center gap-2 relative">
          <div>
            <Avatar>
              <AvatarImage src={coin.coinDetails?.image.large}></AvatarImage>
            </Avatar>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p>{coin.coinDetails?.symbol.toUpperCase()}</p>
              <DotIcon className="text-gray-500"></DotIcon>
              <p className="text-gray-500">{coin.coinDetails?.name}</p>
            </div>
            <div className="flex items-end gap-2">
              <p className="text-xl font-bold">{coin.coinDetails?.market_data.current_price.usd}</p>
              <p className="text-red-600">
                <span>-{coin.coinDetails?.market_data.market_cap_change_24h}</span>
                <span>(-{coin.coinDetails?.market_data.market_cap_change_percentage_24h})</span>
              </p>
            </div>
          </div>

          <div className='flex items-center gap-2 absolute right-5 top-5'>
            {/* Watchlist message */}
            {watchlistMessage && (
              <div className={`px-4 py-2 rounded-md text-white font-medium ${
                watchlistMessage.includes('added to watchlist') 
                  ? 'bg-green-600' 
                  : 'bg-red-600'
              }`}>
                {watchlistMessage}
              </div>
            )}
            
            <Button className='text-right justify-end' variant="ghost" onClick={handleAddToWatchList}>
            {
              coin.coinDetails && existInWatchList(watchList.items, coin.coinDetails) ? 
                (<BookmarkFilledIcon className='w-10 h-10'></BookmarkFilledIcon>) : 
                coin.coinDetails ? 
                  (<BookmarkIcon className='w-10 h-10'></BookmarkIcon>) :
                  (<div className='w-10 h-10 bg-gray-600 rounded animate-pulse'></div>)
            }
            </Button>
            <Button 
              onClick={handleTradeClick}
              className='text-right justify-end bg-blue-500 text-white hover:bg-blue-800 hover:text-white'
            >
              Trade
            </Button>
          </div>
        </div>

              <div className="w-full h-[450px] mt-8" id="chart-timeline">
          <StockChart coinId={params.id}/>
      </div>

      {/* Trading Popup */}
      {isTradePopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-6 rounded-lg w-[420px] relative border border-gray-700">
            <button
              onClick={() => {
                setIsTradePopupOpen(false);
                setShowInsufficientFunds(false);
              }}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-200"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="space-y-5">
              <h2 className="text-lg font-bold text-white mb-2">How much do you want to spend?</h2>
              
              {/* Show error message if order fails */}
              {order.error && (
                <div className="text-red-600 font-bold mb-2">
                  {order.error}
                </div>
              )}
              
              <div className='mt-8'>
                <div className="flex items-center gap-4">
                  <label className="text-sm font-medium text-gray-400 w-28 flex-shrink-0">
                    Enter amount
                  </label>
                  <input
                    type="number"
                    value={tradeAmount}
                    onChange={handleAmountChange}
                    placeholder="0"
                    className={`flex-1 p-2 text-base bg-gray-800 border rounded text-white placeholder-gray-500 focus:outline-none focus:ring-1 text-right ${
                      showInsufficientFunds 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'border-gray-600 focus:ring-blue-500'
                    }`}
                  />
                </div>
                {showInsufficientFunds && (
                  <div className="ml-32 mt-1">
                    <p className="text-red-400 text-xs">Insufficient wallet balance to buy</p>
                  </div>
                )}
              </div>

              {/* Crypto Selection */}
              <div className="bg-gray-800 p-3 rounded border border-gray-600">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                    <img 
                      src={coin.coinDetails?.image?.large} 
                      alt={coin.coinDetails?.symbol}
                      className="w-6 h-6 rounded-full"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'block';
                      }}
                    />
                    <span className="text-white text-xs font-bold hidden">
                      {coin.coinDetails?.symbol?.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-white font-medium">{coin.coinDetails?.symbol?.toUpperCase() || 'COIN'}</span>
                      <span className="text-gray-400 text-sm">{coin.coinDetails?.name || 'Cryptocurrency'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-bold">${coin.coinDetails?.market_data?.current_price?.usd?.toFixed(2) || '0.00'}</span>
                      <span className={`text-sm ${
                        coin.coinDetails?.market_data?.price_change_percentage_24h >= 0 
                          ? 'text-green-400' 
                          : 'text-red-400'
                      }`}>
                        {coin.coinDetails?.market_data?.price_change_24h?.toFixed(2) || '0.00'} 
                        ({coin.coinDetails?.market_data?.price_change_percentage_24h?.toFixed(2) || '0.00'}%)
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Type */}
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium text-gray-400 w-28 flex-shrink-0">
                  Order Type
                </label>
                <select 
                  value={orderType}
                  onChange={(e) => setOrderType(e.target.value)}
                  className="flex-1 p-2 text-sm bg-gray-800 border border-gray-600 rounded text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="BUY">BUY</option>
                  <option value="SELL">SELL</option>
                </select>
              </div>

              {/* Available Cash */}
              <div className="flex justify-between items-center py-3 border-t border-gray-700">
                <span className="text-gray-400">{orderType === "BUY" ? "Available Cash" : "Available Quantity"}</span>
                <span className="text-white font-bold">{orderType === "BUY" ? `$${availableCash.toFixed(2)}` : `${asset.assetDetails?.quantity || 0}`}</span>
              </div>
              
              {/* Buy and Sell Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleBuyClick}
                  disabled={orderType !== 'BUY' || showInsufficientFunds}
                  className={`flex-1 py-3 px-4 rounded focus:outline-none focus:ring-1 transition-colors font-medium text-sm ${
                    orderType !== 'BUY' 
                      ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                      : showInsufficientFunds
                        ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                        : 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500'
                  }`}
                >
                  BUY
                </button>
                
                <button
                  onClick={handleSellClick}
                  disabled={orderType !== 'SELL'}
                  className={`flex-1 py-3 px-4 rounded focus:outline-none focus:ring-1 transition-colors font-medium text-sm ${
                    orderType !== 'SELL'
                      ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                      : 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500'
                  }`}
                >
                  SELL
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default StockDetails; 