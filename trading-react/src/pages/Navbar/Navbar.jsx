import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ButtonIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";

import { Menu, X } from "lucide-react";
import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { useSelector, useDispatch } from "react-redux";
import store from "../State/Store";
import { searchCoin } from "../State/CoinList/CoinAction";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user, coin} = useSelector(store=>store);
  
  // Extract first name from fullname
  const firstName = user.user ? user.user.fullname.trim().split(" ")[0] : "";

  //Extract initials from fullname
  const getInitials=(fullname)=>{
    const namearr = (fullname || "").trim().split(" ").filter(Boolean);
    if (namearr.length === 0) return "NA";
    if (namearr.length === 1) return namearr[0][0].toUpperCase();
    return namearr[0][0].toUpperCase() + namearr[namearr.length - 1][0].toUpperCase();
  }

  // Handle search functionality
  const handleSearchClick = () => {
    setIsSearchOpen(true);
  };

  const handleSearchClose = () => {
    setIsSearchOpen(false);
    setSearchQuery("");
    setSearchResults([]);
  };

  const handleSearchInput = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.length >= 2) {
      setIsSearching(true);
      dispatch(searchCoin(query));
    } else {
      setSearchResults([]);
      setIsSearching(false);
    }
  };

  const handleCoinClick = (coin) => {
    navigate(`/stock/${coin.id}`);
    handleSearchClose();
  };

  // Update search results when coin state changes
  useEffect(() => {
    if (coin.searchCoinList && coin.searchCoinList.length > 0) {
      setSearchResults(coin.searchCoinList);
      setIsSearching(false);
    }
  }, [coin.searchCoinList]);
  
  return (
    <>
      <div className="px-2 py-1 border-b z-50 bg-background bg-opacity-0 sticky top-0 left-0 right-0 flex justify-between items-center h-14">
        <div className="flex items-center gap-3">
          <Sheet>
            <SheetTrigger>
              <Button variant="ghost" size="lg" className="px-3 py-2">
                <Menu className="size-8" />
              </Button>
            </SheetTrigger>
            <SheetContent
              className="w-80 flex flex-col justify-center items-center"
              side="left"
            >
              <SheetHeader>
                <SheetTitle className="text-2xl font-bold flex justify-center items-center gap-2">
                  <Avatar className="size-10">
                    <AvatarImage src="https://cdn.pixabay.com/photo/2022/03/03/16/35/nft-7045692_1280.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="flex">
                    <span className="text-2xl font-bold text-orange-500">
                      Trade
                    </span>
                    <span className="text-2xl font-bold text-white-500">
                      Crypto
                    </span>
                  </div>
                </SheetTitle>
              </SheetHeader>
              <Sidebar></Sidebar>
            </SheetContent>
          </Sheet>
          <p className="text-sm cursor-pointer">TradeCrypto</p>
          <Button 
            variant="outline" 
            className="px-3 py-2 flex items-center gap-2"
            onClick={handleSearchClick}
          >
            <MagnifyingGlassIcon className="size-6" />
            <span>Search</span>
          </Button>
        </div>
        <div className="flex items-center gap-2">
          {firstName && (
            <span className="text-base font-medium text-white mr-2">{`Welcome ${firstName}`}</span>
          )}
        <Avatar className="size-10  shadow-md cursor-pointer transition hover:shadow-lg active:scale-95">
          {/* Fetching initials from fullname */}
        <AvatarFallback className="bg-blue-500 text-white">
          {
            getInitials(user.user?.fullname)
          }
        </AvatarFallback>
        </Avatar>
        </div>
      </div>

      {/* Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg w-96 max-h-[80vh] relative">
            <button
              onClick={handleSearchClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-200"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-white mb-4">Search Coins</h2>
              
              <div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchInput}
                  placeholder="Search for coins..."
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoFocus
                />
              </div>
              
              {/* Search Results */}
              <div className="max-h-64 overflow-y-auto">
                {isSearching ? (
                  <div className="text-center text-gray-400 py-4">
                    Searching...
                  </div>
                ) : searchResults.length > 0 ? (
                  <div className="space-y-2">
                    {searchResults.map((coin) => (
                      <div
                        key={coin.id}
                        onClick={() => handleCoinClick(coin)}
                        className="flex items-center gap-3 p-3 bg-gray-700 rounded cursor-pointer hover:bg-gray-600 transition-colors"
                      >
                        <img 
                          src={coin.large} 
                          alt={coin.name}
                          className="w-8 h-8 rounded-full"
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                        <div className="flex-1">
                          <div className="text-white font-medium">{coin.name}</div>
                          <div className="text-gray-400 text-sm">{coin.symbol?.toUpperCase()}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-white text-sm">
                            ${coin.market_cap_rank ? `#${coin.market_cap_rank}` : 'N/A'}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : searchQuery.length >= 2 ? (
                  <div className="text-center text-gray-400 py-4">
                    No coins found
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
