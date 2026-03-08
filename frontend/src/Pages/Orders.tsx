import React from 'react'
import { Title } from '../components/Typography'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import OrderCard from '../components/OrderCard'

import Pagination from '../components/Pagination'
import Filter from '../components/Filter'
const Orders = () => {
    return (
        <div className='flex flex-col gap-5 w-full'>
            <Title>訂單</Title>

            <div className='flex flex-col gap-2 w-full '>
                <Filter />

                <div className='flex flex-col gap-2 w-full'>
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