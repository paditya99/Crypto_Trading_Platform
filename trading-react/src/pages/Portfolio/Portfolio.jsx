import React, { useEffect } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import SubHeader from '../SubHeader/SubHeader'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { useDispatch, useSelector } from 'react-redux'
import { getUserAssets } from '../State/Asset/AssetActions'
import store from '../State/Store'

const Portfolio = () => {

  const dispatch=useDispatch();
  const {asset}=useSelector(store => store);

  useEffect(()=>{
    dispatch(getUserAssets({jwt: localStorage.getItem("jwt")}))
  },[])

  return (
    <div>
        <SubHeader title="PortFolio"></SubHeader>
        
        {!asset.userAsset || asset.userAsset.length === 0 ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-400 mb-2">No Assets Found</h3>
              <p className="text-gray-400">Please buy/sell crypto coins first to see your portfolio</p>
            </div>
          </div>
        ) : (
          <div className="w-full overflow-x-auto">
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px] text-left">ASSET</TableHead>
                  <TableHead className="w-[100px] text-left">SYMBOL</TableHead>
                  <TableHead className="w-[120px] text-right">PRICE</TableHead>
                  <TableHead className="w-[100px] text-right">UNIT</TableHead>
                  <TableHead className="w-[120px] text-right">CHANGE</TableHead>
                  <TableHead className="w-[140px] text-right">CHANGE(%)</TableHead>
                  <TableHead className="w-[120px] text-right">VALUE</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {asset.userAsset?.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={item.coin.image} alt={item.coin.name} />
                        </Avatar>
                        <span className="font-medium">{item.coin.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-left">{item.coin.symbol.toUpperCase()}</TableCell>
                    <TableCell className="text-right">${item.coin.current_price}</TableCell>
                    <TableCell className="text-right">{item.quantity}</TableCell>
                    <TableCell className="text-right">
                      <span className={item.coin.price_change_24h >= 0 ? 'text-green-600' : 'text-red-600'}>
                        {item.coin.price_change_24h >= 0 ? '+' : ''}{item.coin.price_change_24h}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <span className={item.coin.price_change_percentage_24h >= 0 ? 'text-green-600' : 'text-red-600'}>
                        {item.coin.price_change_percentage_24h >= 0 ? '+' : ''}{item.coin.price_change_percentage_24h}%
                      </span>
                    </TableCell>
                    <TableCell className="text-right font-medium">{item.coin.total_volume}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
    </div>
  )
}

export default Portfolio