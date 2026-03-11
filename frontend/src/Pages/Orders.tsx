import React, { useEffect, useState } from 'react'
import { Title } from '../components/Typography'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import OrderCard from '../components/OrderCard'

import Pagination from '../components/Pagination'
import Filter from '../components/Filter'
import type { Order } from '../types/types'
import { Link } from 'react-router-dom'
const Orders = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const fetchProducts = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/orders`, {
                method: 'GET'
            })
            const result = await response.json();
            if (!result.success) {
                return console.log(result.message);
            }
            console.log(result.data);
            setOrders(result.data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => { fetchProducts() }, []);
    return (
        <div className='flex flex-col gap-5 w-full'>
            <Title>訂單</Title>

            <div className='flex flex-col gap-2 w-full '>
                <Filter />

                <div className='flex flex-col gap-2 w-full'>
                    {
                        orders.map((item, index) => {
                            return (
                                <Link to={`/orders/${item.id}`}>
                                    <OrderCard order={item} key={index} />
                                </Link>

                            )

                        })
                    }

                </div>
            </div>
        </div >
    )
}

export default Orders