import React, { useEffect, useState } from 'react';
import { Title } from '../components/Typography';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import OrderCard from '../components/OrderCard';


import Pagination from '../components/Pagination';
import Filter from '../components/Filter';
import type { Order } from '../types/types';
import { Link } from 'react-router-dom';

import { useSearchParams } from 'react-router-dom';
const Orders = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;
    const paymentStatus = searchParams.get("paymentStatus") || "";
    const shipmentStatus = searchParams.get("shipmentStatus") || "";
    const search = searchParams.get("search") || "";

    const ordersFilters = [
        {
            name: "paymentStatus",
            value: paymentStatus,
            options: [
                { label: '未付款', value: 'pending' },
                { label: '已付款', value: 'paid' },
                { label: '退款', value: 'Refund' },
            ]
        },
        {
            name: "shipmentStatus",
            value: shipmentStatus,
            options: [
                { label: '未出貨', value: 'pending' },
                { label: '已出貨', value: 'shipped' },
                { label: '已送達', value: 'completed' },
            ]
        }
    ]

    const [orders, setOrders] = useState<Order[]>([]);
    const [totalPages, setTotalPages] = useState(0);
    const fetchOrders = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/orders?page=${page}&limit=${limit}&paymentStatus=${paymentStatus}&shipmentStatus=${shipmentStatus}&search=${search}`, {
                method: 'GET'
            })
            const result = await response.json();
            if (!result.success) {
                return console.log(result.message);
            }
            console.log(result)
            console.log(result.data);
            setOrders(result.data);

            const totalOrders = result.total.total_orders;
            setTotalPages(Math.ceil(totalOrders / limit));
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => { fetchOrders(); console.log([...searchParams]) }, [page, limit, paymentStatus, shipmentStatus, search]);
    return (
        <div className='flex flex-col gap-5 w-full md:px-10'>
            <Title >訂單</Title>
            <div className='flex flex-col gap-2 w-full '>
                <Filter filters={ordersFilters} totalPages={totalPages} page={page} search={search} searchParams={searchParams} setSearchParams={setSearchParams} />

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