import React from 'react'
import { Card } from './Card'
import { Button } from './Button'
import PaymentStatus from './PaymentStatus'
import ShipmentStatus from './ShipmentStatus'

const OrderCard = () => {
    return (
        <Card className='flex flex-col gap-1 px-3'>
            <div className='flex flex-row justify-between items-end'>
                <div className='flex flex-col'>
                    <span className='translate-y-2 text-xs font-semibold'>訂單編號</span>
                    <span className='font-semibold'>#55005</span>
                </div>
                <span className='font-semibold'>蔡英豪</span>
                <div className='flex flex-row gap-1'>
                    <PaymentStatus />
                    <ShipmentStatus />
                </div>
            </div>
            <div className='flex flex-row justify-between items-center'>
                <span className='font-semibold text-gray-500 '>2026/03/20 15:30</span>
                <span className='font-semibold'>5 件</span>
                <span className='font-semibold'>NT$ 4500</span>
            </div>
        </Card>
    )
}

export default OrderCard