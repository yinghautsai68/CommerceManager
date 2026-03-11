import React from 'react'
import { Card } from './Card'
import { Button } from './Button'
import PaymentStatus from './PaymentStatus'
import ShipmentStatus from './ShipmentStatus'
import type { Order } from '../types/types'

interface OrderCardProps {
    order: Order
}
const OrderCard = ({ order }: OrderCardProps) => {
    return (
        <Card className='flex flex-col gap-1 w-full  px-3'>
            <div className='flex flex-row justify-between items-end'>
                <div className='flex flex-col'>
                    <span className='translate-y-2 text-xs font-semibold'>訂單編號</span>
                    <span className='font-semibold'>#{order.id}</span>
                </div>
                <span className='font-semibold'>{order.customer_name}</span>
                <div className='flex flex-row gap-1'>
                    <PaymentStatus >{order.payment_status}</PaymentStatus>
                    <ShipmentStatus >{order.shipment_status}</ShipmentStatus>
                </div>
            </div>
            <div className='flex flex-row justify-between items-center'>
                <span className='font-semibold text-gray-500 '>{order.order_date}</span>
                <span className='font-semibold'>--- 件</span>
                <span className='font-semibold'>NT$ {order.total_amount}</span>
            </div>
        </Card>
    )
}

export default OrderCard