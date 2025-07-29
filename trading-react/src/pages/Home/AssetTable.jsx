import React from 'react'
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
import { useNavigate } from 'react-router-dom';

const AssetTable = ({coin, category}) => {
  const navigate = useNavigate();
  return (
    <div className="h-140 overflow-y-auto border rounded-lg">
      <Table className="relative">
        <TableHeader className="sticky top-0 z-10">
          <TableRow>
            <TableHead className="w-[100px]">COIN</TableHead>
            <TableHead className='pl-10'>SYMBOL</TableHead>
            <TableHead className='pl-10'>VOLUME</TableHead>
            <TableHead className='pl-4'>MARKETCAP</TableHead>
            <TableHead className='pl-6'>24H</TableHead>
            <TableHead className='pl-8'>PRICE</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            coin.map((item, index)=>(
                    <TableRow key={item.id} className="overflow-hidden">
                    <TableCell className="font-medium flex items-center gap-2 cursor-pointer"
                    onClick={() => navigate(`/stock/${item.id}`)}>
                        <Avatar className='-z-10'> 
                            <AvatarImage className='w-10 h-10' src={item.image}></AvatarImage>
                        </Avatar>
                        <span className='text-sm font-medium'>{item.name}</span>
                    </TableCell>
                    <TableCell>{item.symbol}</TableCell>
                    <TableCell>{item.total_volume}</TableCell>
                    <TableCell>{item.market_cap}</TableCell>
                    <TableCell>{item.price_change_percentage_24h}</TableCell>
                    <TableCell className="text-right">${item.current_price}</TableCell>
                </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </div>
  )
}

export default AssetTable