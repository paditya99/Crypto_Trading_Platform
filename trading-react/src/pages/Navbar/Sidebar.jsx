import { Button } from '@/components/ui/button'
import { SheetClose } from '@/components/ui/sheet'
import { HomeIcon, ActivityLogIcon, DashboardIcon, PersonIcon } from '@radix-ui/react-icons'
import { ActivityIcon, BookmarkIcon, CreditCardIcon, LandmarkIcon, LogOutIcon, WalletIcon } from 'lucide-react'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../State/Auth/AuthAction'


const menus=[
    {
        name:"Home",
        icon:<HomeIcon />,
        path:"/"
    },
    {
        name:"Portfolio",
        icon:<DashboardIcon></DashboardIcon>,
        path:"/portfolio"
    },
    {
        name:"Watchlist",
        icon:<BookmarkIcon />,
        path:"/watchlist"
    },
    {
        name:"Wallet",
        icon:<WalletIcon />,
        path:"/wallet"
    },
    {
        name:"Payment Details",
        icon:<LandmarkIcon />,
        path:"/payment-details"
    },
    {
        name:"Withdrawal",
        icon:<CreditCardIcon />,
        path:"/withdrawal"
    },
    {
        name:"Activity",
        icon:<ActivityIcon />,
        path:"/activity"
    },
    {
        name:"Profile",
        icon:<PersonIcon />,
        path:"/profile"
    },
    {
        name:"Logout",
        icon:<LogOutIcon />,
        path:"/logout"
    }
]

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch();

  const handleMenuClick = (menu) => {
    if (menu.name === "Logout") {
      dispatch(logout());
      navigate("/login");
    } else {
      navigate(menu.path);
    }
  };

  return (
    <>
    <div className='space-y-1 flex flex-col'>
        {menus.map((menu, index) => (
            <div key={index}>
                <SheetClose>
                    <Button 
                        variant="ghost" 
                        className="w-full flex items-center justify-start gap-4 py-6 px-4 text-left hover:bg-accent"
                        onClick={() => handleMenuClick(menu)}
                    >
                        <span className="flex-shrink-0">
                            {menu.icon}
                        </span>
                        <p className="text-sm font-medium">{menu.name}</p>
                    </Button>
                </SheetClose>
            </div>
        ))}
    </div>
    </>
  )
}

export default Sidebar