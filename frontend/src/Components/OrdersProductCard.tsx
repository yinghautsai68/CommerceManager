import React from 'react'

import Sony from '../assets/sony_wh1000xm4.jpg'
import type { OrderItems } from '../types/types'

interface OrdersProductCardProps {
    orderItem: OrderItems
}
const OrdersProductCard = ({ orderItem }: OrdersProductCardProps) => {
    return (
        <div className='flex flex-row items-center justify-between lg:justify-start gap-2 py-1 border-b border-gray-300 '>
            <img src={orderItem.image_url} alt="" className='w-[20%] md:w-[15%] lg:w-[15%] xl:w-[12%]  aspect-square border border-gray-300 rounded-lg' />
            <div className=' flex flex-col  gap-1 w-[75%] lg:w-full h-full  '>
                <div className='flex flex-col'>
                    <span className="translate-y-1 w-[100%] text-md font-medium truncate ">
                        {orderItem.name}
                    </span>
                    <div className=' flex flex-row justify-between items-center'>
                        <span className='text-sm text-gray-500'>#{orderItem.product_id}</span>
                        <span className='text-sm'>NT$ {orderItem.price} x{orderItem.quantity}</span>
                    </div>
                </div>
                <span className='block w-full text-right text-sm' >NT$ {orderItem.price * orderItem.quantity}</span>
            </div>
        </div>
    )
}

export default OrdersProductCard