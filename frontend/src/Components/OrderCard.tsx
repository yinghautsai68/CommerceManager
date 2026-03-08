import React from 'react'
import { Card } from './Card'
import { Button } from './Button'
import PaymentStatus from './PaymentStatus'

const OrderCard = () => {
    return (
        <Card className='flex flex-col gap-2'>
            <div className='flex flex-row justify-between items-end'>
                <div className='flex flex-col'>
                    <span className='translate-y-2'>訂單編號</span>
                    <span>#55005</span>
                </div>
                <span>蔡英豪</span>
                <div className='flex flex-row gap-1'>
                    <PaymentStatus></PaymentStatus>
                    <PaymentStatus></PaymentStatus>
                </div>
            </div>
            <div className='flex flex-row justify-between items-center'>
                <span>2026/03/20 15:30</span>
                <span>Items 5</span>
                <span>NT$ 4500</span>
            </div>
        </Card>
    )
}

export default OrderCard