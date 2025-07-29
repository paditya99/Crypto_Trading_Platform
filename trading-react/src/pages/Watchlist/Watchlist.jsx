import React, { useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button';
import { BookmarkFilledIcon } from '@radix-ui/react-icons';
import SubHeader from '../SubHeader/SubHeader';
import { useDispatch, useSelector } from 'react-redux';
import store from '../State/Store';
import { addCoinToWatchList, getWatchList } from '../State/WatchList/WatchListActions';

const Watchlist = () => {
  const dispatch=useDispatch();
  const {watchList} = useSelector(store=>store)

  useEffect(()=>{
    dispatch(getWatchList({jwt: localStorage.getItem("jwt")}))
  },[])

  // Add debugging
  console.log("Watchlist component - watchList:", watchList);
  console.log("Watchlist component - watchList.items:", watchList?.items);
  console.log("Watchlist component - watchList.items length:", watchList?.items?.length);

  const handleRemoveFromWatchList=(coinId)=>{
    dispatch(addCoinToWatchList({coinId, jwt: localStorage.getItem("jwt")}))
  }

  return (
    <div>
      <SubHeader title="Watchlist"></SubHeader>
      
      {!watchList.items || watchList.items.length === 0 ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No Watchlist Items Found</h3>
            <p className="text-gray-400">Add coins to your watchlist to see them here</p>
          </div>
        </div>
      ) : (
        <div className="w-full overflow-x-auto">
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px] text-left">COIN</TableHead>
                <TableHead className="w-[100px] text-left">SYMBOL</TableHead>
                <TableHead className="w-[120px] text-right">VOLUME</TableHead>
                <TableHead className="w-[140px] text-right">MARKET CAP</TableHead>
                <TableHead className="w-[100px] text-right">24H</TableHead>
                <TableHead className="w-[120px] text-right">PRICE</TableHead>
                <TableHead className="w-[100px] text-center">REMOVE</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {watchList.items?.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={item.image} alt={item.name} />
                      </Avatar>
                      <span className="font-medium">{item.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-left">{item.symbol?.toUpperCase()}</TableCell>
                  <TableCell className="text-right">{item.total_volume}</TableCell>
                  <TableCell className="text-right">{item.market_cap}</TableCell>
                  <TableCell className="text-right">
                    <span className={item.price_change_percentage_24h >= 0 ? 'text-green-600' : 'text-red-600'}>
                      {item.price_change_percentage_24h >= 0 ? '+' : ''}{item.price_change_percentage_24h}%
                    </span>
                  </TableCell>
                  <TableCell className="text-right font-medium">${item.current_price}</TableCell>
                  <TableCell className="text-center">
                    <Button variant="ghost" className="text-red-600 hover:text-red-700" onClick={()=>handleRemoveFromWatchList(item.id)}>
                      <BookmarkFilledIcon className="w-6 h-6" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default Watchlist; 