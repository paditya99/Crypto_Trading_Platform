import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './pages/Navbar/Navbar'
import Home from './pages/Home/Home'
import { Route, Routes, useLocation } from 'react-router-dom'
import Portfolio from './pages/Portfolio/Portfolio'
import Watchlist from './pages/Watchlist/Watchlist'
import Wallet from './pages/Wallet/Wallet'
import PaymentDetails from './pages/PaymentDetails/PaymentDetails'
import Withdrawal from './pages/Withdrawal/Withdrawal'
import Activity from './pages/Activity/Activity'
import Profile from './pages/Profile/Profile'
import Logout from './pages/Logout/Logout'
import NotFound from './pages/NotFound/NotFound'
import SearchCoin from './pages/SearchCoin/SearchCoin'
import StockDetails from './pages/StockDetails/StockDetails'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import ForgotPassword from './pages/ForgotPassword/ForgotPassword'
import Auth from './pages/Auth/Auth'
import { useDispatch, useSelector } from 'react-redux'
import store from './pages/State/Store'
import { getUser } from './pages/State/Auth/AuthAction'
import { useNavigate } from 'react-router-dom'
import './setupAxios';

function App() {
  const [count, setCount] = useState(0)
  const location = useLocation();
  const hideNavbar = ["/login", "/register", "/forgot-password"].includes(location.pathname);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {user} = useSelector(store => store)
  
  useEffect(()=>{
    const jwt = user.jwt || localStorage.getItem('jwt');
    console.log("JWT being used:", jwt);
    console.log("User state:", user);
    
    if (jwt && jwt.trim() !== '') {
      dispatch(getUser(jwt));
    } else {
      console.log("No valid JWT found, user needs to login");
    }
  },[user.jwt]);

  useEffect(() => {
    const jwt = user.jwt || localStorage.getItem('jwt');
    if (!user.user && !jwt && !["/login", "/register", "/forgot-password"].includes(location.pathname)) {
      navigate('/register', { replace: true });
    }
  }, [user.user, user.jwt, location.pathname, navigate]);

  // Navigate to / after successful registration/login when user profile is loaded
  useEffect(() => {
    if (user.user && ["/login", "/register", "/forgot-password"].includes(location.pathname) && !user.isLogin2FARequired) {
      navigate('/', { replace: true });
    }
  }, [user.user, location.pathname, navigate, user.isLogin2FARequired]);

  console.log("auth user====", user);

  return (
    <>
     {!user.user ? <Auth/> : <div>
     {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/payment-details" element={<PaymentDetails />} />
        <Route path="/withdrawal" element={<Withdrawal />} />
        <Route path="/activity" element={<Activity />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/search-coin" element={<SearchCoin />} />
        <Route path="/stock/:id" element={<StockDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
     </div>}
    </>
  )
}

export default App
