import React from 'react'
import { Title } from '../components/Typography'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import OrderCard from '../components/OrderCard'

const Orders = () => {
    return (
        <div className='flex flex-col gap-5'>
            <Title>訂單</Title>

            <div className='flex flex-col gap-2 px-2'>
                <div className='flex flex-col'>
                    <div className='flex flex-row justify-between items-center'>
                        <select className='flex-1 pl-2 py-1 border rounded-lg'>
                            <option value="Pending" selected>Pending</option>
                            <option value="Pending" disabled>Pending</option>
                        </select>
                        <input type="text" placeholder='Search' className='flex-1 pl-3 py-1 border rounded-lg' />
                    </div>
                    <div className='grid grid-cols-7 w-full border'>
                        <div className=' aspect-square bg-green-500'></div>
                        <div className=' aspect-square bg-green-200'></div>
                        <div className=' aspect-square bg-green-200'></div>
                        <div className='aspect-square bg-green-200'></div>
                        <div className=' aspect-square bg-green-200'></div>
                        <div className=' aspect-square bg-green-500'></div>
                    </div>
                </div>

                <div className='flex flex-col gap-2'>
                    <OrderCard></OrderCard>
                    <OrderCard></OrderCard>
                    <OrderCard></OrderCard>
                    <OrderCard></OrderCard>
                    <OrderCard></OrderCard>
                </div>
            </div>
        </div >
    )
}

export default Orders