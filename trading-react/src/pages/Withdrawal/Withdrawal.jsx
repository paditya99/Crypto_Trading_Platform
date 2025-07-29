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
import { useDispatch, useSelector } from 'react-redux';
import store from '../State/Store';
import { getWithdrawalHistory } from '../State/Withdrawal/WithdrawalActions';


const Withdrawal = () => {

  const dispatch=useDispatch();
  const {withdrawal}= useSelector(store=>store);

  useEffect(()=>{
    dispatch(getWithdrawalHistory({jwt: localStorage.getItem("jwt")}));
  },[])

  return (
    <div className="p-6">
      <SubHeader title="Withdrawal History"></SubHeader>
      <div className="mt-6">
        <Table className="w-full">
          <TableHeader>
            <TableRow className="border-b border-gray-200 dark:border-gray-700">
              <TableHead className="w-1/4 text-left font-semibold text-gray-900 dark:text-gray-100 py-4">DATE</TableHead>
              <TableHead className="w-1/4 text-left font-semibold text-gray-900 dark:text-gray-100 py-4">METHOD</TableHead>
              <TableHead className="w-1/4 text-left font-semibold text-gray-900 dark:text-gray-100 py-4">AMOUNT</TableHead>
              <TableHead className="w-1/4 text-right font-semibold text-gray-900 dark:text-gray-100 py-4">STATUS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {withdrawal.history?.map((item, index) => (
              <TableRow key={index} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800">
                <TableCell className="w-1/4 text-left py-4 text-gray-700 dark:text-gray-300">{item.date}</TableCell>
                <TableCell className="w-1/4 text-left py-4 text-gray-700 dark:text-gray-300">Bank</TableCell>
                <TableCell className="w-1/4 text-left py-4 text-gray-700 dark:text-gray-300 font-medium">${item.amount}</TableCell>
                <TableCell className="w-1/4 text-right py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    item.status === 'SUCCESS' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : item.status === 'PENDING'
                      ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      : item.status === 'DECLINE'
                      ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                  }`}>
                    {item.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Withdrawal; 