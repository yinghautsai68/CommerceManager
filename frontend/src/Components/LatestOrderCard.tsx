import React from 'react'
import PaymentStatus from './PaymentStatus'
import type { Order } from '../types/types'
import ShipmentStatus from './ShipmentStatus'

interface LatestOrderCardProps {
    order: Order
}
export const LatestOrderCard = ({ order }: LatestOrderCardProps) => {
    return (
        <div className='flex flex-row justify-between items-center h-full  pb-2 border-b border-gray-300'>
            <div className='flex-1 flex flex-col justify-between items-start h-full  '>
                <span className='translate-y-2 text-sm text-gray-500 '>{order.order_date}</span>
                <span className='translate-y-1  text-sm text-gray-500'>訂單編號 #{order.id}</span>
                <span className='translate-y-1'>{order.customer_name}</span>
            </div>

            <div className='flex-1 flex flex-col justify-end items-end h-full'>
                <div className='translate-y-2 flex-1 flex flex-row gap-1  '>
                    <PaymentStatus status={order.payment_status} />
                    <ShipmentStatus status={order.shipment_status} />
                </div>
                <span className='translate-y-1.5 flex-1 text-xs '>{order.total_items} 件</span>
                <span className='translate-y-1 flex-1 text-xs font-medium'>NT$ {order.total_amount}</span>
            </div>
        </div>
    )
}
