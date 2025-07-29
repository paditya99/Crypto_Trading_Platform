import React, { useEffect } from 'react';
import SubHeader from '../SubHeader/SubHeader';
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
import store from '../State/Store';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrders } from '../State/Order/OrderActions';
import { calculateProfit } from '@/utils/calculateProfit';

const Activity = () => {

  const dispatch=useDispatch();
  const {order} = useSelector(store=>store)

  useEffect(()=>{
    dispatch(getAllOrders({jwt: localStorage.getItem("jwt")}))
  },[])

  // Function to format timestamp
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return { date: 'N/A', time: 'N/A' };
    
    try {
      const date = new Date(timestamp);
      const dateStr = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
      const timeStr = date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });
      
      return { date: dateStr, time: timeStr };
    } catch (error) {
      return { date: 'Invalid Date', time: 'Invalid Time' };
    }
  };

  // Filter orders that have orderItem
  const filteredOrders = order.allOrders?.filter(item => item.orderItem) || [];

  return (
    <div>
      <SubHeader title="Trading History"></SubHeader>
      
      {!order.allOrders || order.allOrders.length === 0 ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No Trade history found</h3>
            <p className="text-gray-400">Your trading history will appear here</p>
          </div>
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No Orders found</h3>
            <p className="text-gray-400">No completed orders to display</p>
          </div>
        </div>
      ) : (
        <Table className="relative">
          <TableHeader className="sticky top-0 z-10">
            <TableRow>
              <TableHead className="w-[100px]">DATE & TIME</TableHead>
              <TableHead className='pl-10'>TRADING PAIR</TableHead>
              <TableHead className='pl-10'>BUY PRICE</TableHead>
              <TableHead className='pl-4'>SELLING PRICE</TableHead>
              <TableHead className='pl-6'>ORDER TYPE</TableHead>
              <TableHead className='pl-8'>PROFIT/LOSS</TableHead>
              <TableHead className='pl-8'>VALUE</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              filteredOrders.map((item, index) => (
                  <TableRow key={index} className="overflow-hidden">
                    <TableCell className="font-medium">
                      <div>
                        <p>{formatTimestamp(item.timestamp).date}</p>
                        <p className='text-sm text-gray-500'>{formatTimestamp(item.timestamp).time}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                        <div className="flex items-center gap-2">
                            <Avatar> 
                                <AvatarImage className='w-10 h-10' src={item.orderItem?.coin.image}></AvatarImage>
                            </Avatar>
                            <span className='text-sm font-medium'>{item.orderItem?.coin.name}</span>
                        </div>
                    </TableCell>
                    <TableCell>{item.orderItem?.buyprice}</TableCell>
                    <TableCell>{item.orderItem?.sellprice}</TableCell>
                    <TableCell>{item.orderType}</TableCell>
                    <TableCell>{calculateProfit(item)}</TableCell>
                    <TableCell className="text-right">${item.price}</TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default Activity; 