import React, { useContext, useEffect, useState } from 'react'
import { SubTitle, Title } from '../components/Typography'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import Details from '../components/Details'

import Sony from '../assets/sony_wh1000xm4.jpg'
import OrdersProductCard from '../components/OrdersProductCard'
import { useParams } from 'react-router-dom'
import type { Order, OrderItems } from '../types/types'
import { UtilsContext } from '../context/UtilsContext'
import PaymentStatus from '../components/PaymentStatus'
import ShipmentStatus from '../components/ShipmentStatus'
const OrderDetails = () => {
    const { formatDate } = useContext(UtilsContext);

    const { id } = useParams();
    const [order, setOrder] = useState<Order>({
        id: 0,
        order_date: "",
        payment_status: "",
        shipment_status: "",
        customer_name: "",
        customer_number: "",
        customer_address: "",
        shipping_method: "",
        shipping_fee: 0,
        tax: 0,
        total_amount: 0,
        remarks: ""
    });

    const fetchOrder = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/orders/${id}`, {
                method: 'GET'
            })
            const result = await response.json();
            if (!result.success) {
                return console.log(result.message);
            }
            console.log(result.data);
            setOrder(result.data)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => { fetchOrder() }, []);


    const [orderItems, setOrderItems] = useState<OrderItems[]>([]);
    const fetchOrderItems = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/orders/${id}/items`, {
                method: 'GET'
            })
            const result = await response.json();
            if (!result.success) {
                return console.log(result.message);
            }
            console.log(result.data);
            setOrderItems(result.data)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => { fetchOrderItems() }, []);

    const orderItemTotal = orderItems.reduce((sum, item) => {
        const orderItemSubTotal = item.quantity * item.price - item.discount;
        return sum + orderItemSubTotal;
    }, 0);

    const orderTotal = orderItemTotal + Number(order.shipping_fee) + Number(order.tax);
    return (
        <div className='w-full'>
            <div className='pl-10 pt-4 pb-2 rounded-tl-xl rounded-tr-xl  bg-blue-500'>
                <span className=' text-3xl font-bold text-white'>訂單詳細資訊</span>
            </div>

            <div className='flex flex-col gap-2 w-full min-h-screen px-2 pt-5 pb-10  border border-gray-300 '>
                <div className='flex flex-row justify-between items-end px-3'>
                    <div className='flex flex-col'>
                        <span className='xl:text-lg font-medium' >訂單編號</span>
                        <span className='xl:text-lg text-gray-500'>#{order.id}</span>
                    </div>

                    <div className='hidden flex flex-row gap-1'>
                        <Button className='p-1'>編輯</Button>
                        <Button className='p-1 bg-red-400'>取消訂單</Button>
                    </div>
                </div>

                <Card className='flex flex-col gap-2 px-4 py-6'>
                    <SubTitle className=''>訂單基本資訊</SubTitle>
                    <div className=''>
                        <Details label="訂單日期" value={formatDate(order.order_date)} />
                        <Details label="付款狀態" value={<PaymentStatus status={order.payment_status} />} />
                        <Details label="出貨狀態" value={<ShipmentStatus status={order.shipment_status} />} />
                        <Details label="訂單總金額" value={order.total_amount} />
                    </div>
                </Card>

                <Card className='flex flex-col gap-2 px-4 py-6'>
                    <SubTitle >收件資訊</SubTitle>
                    <div className='flex flex-col '>
                        <div className='flex flex-row gap-3'>
                            <span>{order.customer_name}</span>
                            <span>{order.customer_number}</span>
                            <span>{order.shipping_method}</span>
                        </div>
                        <span>{order.customer_address}</span>
                        <span className='text-gray-500'>" {order.remarks} "</span>
                    </div>
                </Card>

                <div className='flex flex-col lg:flex-row lg:items-start gap-2  w-full h-full'>
                    <Card className='lg:w-[50%] h-full px-4 pt-6'>
                        <SubTitle>訂單商品</SubTitle>
                        <div className='px-2'>
                            {
                                orderItems.map((item, index) => {
                                    return (
                                        <OrdersProductCard key={index} orderItem={item} />
                                    )
                                })
                            }
                        </div>
                    </Card>
                    <Card className='lg:w-[50%] h-full flex flex-col gap-3'>
                        <div className='pl-3 py-3 bg-blue-500 rounded-xl'>
                            <span className='text-white font-bold'>訂單金額</span>
                        </div>
                        <div className='px-3'>
                            <Details label="商品小計：" value={`NT$ ${orderItemTotal.toFixed(2)}`} />
                            <Details label="運費：" value={`NT$ ${order.shipping_fee}`} />
                            <Details label="稅金：" value={`NT$ ${order.tax}`} />
                            <Details label="訂單總金額：" value={`NT$ ${orderTotal.toFixed(2)}`} className='font-bold text-blue-500' />
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default OrderDetails