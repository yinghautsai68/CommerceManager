import React, { useContext } from 'react'
import { Card } from './Card'
import { Button } from './Button'
import PaymentStatus from './PaymentStatus'
import ShipmentStatus from './ShipmentStatus'
import type { Order } from '../types/types'
import { UtilsContext } from '../context/UtilsContext'

interface OrderCardProps {
    order: Order
}
const OrderCard = ({ order }: OrderCardProps) => {
    const { formatDate } = useContext(UtilsContext);

    return (
        <Card className='flex flex-col gap-1 w-full xl:w-[80%]  px-3'>
            <div className='flex flex-row justify-between items-end'>
                <div className='flex flex-col'>
                    <span className='translate-y-2 text-xs lg:text-base xl:text-xl font-semibold'>訂單編號</span>
                    <span className='xl:text-lg font-semibold'>#{order.id}</span>
                </div>
                <span className='xl:text-lg font-semibold'>{order.customer_name}</span>
                <div className='flex flex-row gap-1'>
                    <PaymentStatus status={order.payment_status} />
                    <ShipmentStatus status={order.shipment_status} />
                </div>
            </div>
            <div className='flex flex-row justify-between items-center'>
                <span className='font-semibold text-gray-500 '>{formatDate(order.order_date)}</span>
                <span className='font-semibold'>{order.total_items} 件</span>
                <span className='font-semibold'>NT$ {order.total_amount}</span>
            </div>
        </Card>
    )
}

export default OrderCard