import React from 'react'
import { Card } from './Card'


import Sony from '../assets/sony_wh1000xm4.jpg'
import PaymentStatus from './PaymentStatus'
import { Button } from './Button'
const ProductCard = () => {
    return (
        <Card className='flex flex-row items-center w-full hover:bg-gray-200 transition-all duration-300 '>
            <div className='flex flex-row items-center gap-2 flex-3'>
                <img src={Sony} alt="" className='w-10 aspect-square border border-gray-300' />
                <div className='flex flex-col justify-between items-start  h-full'>
                    <div className='flex flex-col items-start'>
                        <span className='text-xs'>商品編號 #10100</span>
                        <span className='text-xs font-medium'>Hypersonic Headphones Wireless Pro</span>
                        <span className='text-xs'>音響 </span>
                    </div>
                    <div className='flex flex-row items-center gap-3'>
                        <span className='text-xs'>NT$ 15000</span>
                        <span className='text-xs'>QTY. 1500</span>
                    </div>
                </div>
            </div>
            <div className='flex flex-col justify-between items-end flex-1 h-full'>
                <PaymentStatus></PaymentStatus>
                <div className='flex flex-row gap-1'>
                    <Button className='p-1 text-xs'>編輯</Button>
                    <Button className='p-1 text-xs'>編輯</Button>
                </div>
            </div>
        </Card>
    )
}

export default ProductCard