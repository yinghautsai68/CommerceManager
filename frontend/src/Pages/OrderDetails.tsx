import React from 'react'
import { SubTitle, Title } from '../components/Typography'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import Details from '../components/Details'

import Sony from '../assets/sony_wh1000xm4.jpg'
import OrdersProductCard from '../components/OrdersProductCard'
const OrderDetails = () => {
    return (
        <div className='w-full h-full'>
            <div className='pl-10 pt-4 pb-2 rounded-tl-xl rounded-tr-xl  bg-blue-500'>
                <span className=' text-3xl font-bold text-white'>訂單詳細資訊</span>
            </div>
            <div className='flex flex-col gap-2 px-2 pt-5 border border-gray-300 h-full'>
                <div className='flex flex-row justify-between items-end px-3'>
                    <div className='flex flex-col'>
                        <span>訂單編號</span>
                        <span>#50500</span>
                    </div>
                    <div className='flex flex-row gap-1'>
                        <Button className='p-1'>編輯</Button>
                        <Button className='p-1'>編輯</Button>
                    </div>
                </div>

                <Card className='flex flex-col gap-2'>
                    <SubTitle>收件資訊</SubTitle>
                    <div>
                        <Details></Details>
                        <Details></Details>
                        <Details></Details>
                        <Details></Details>
                    </div>
                </Card>

                <Card className='flex flex-col gap-2'>
                    <SubTitle>收件資訊</SubTitle>
                    <div className='flex flex-col'>
                        <div className='flex flex-row gap-3'>
                            <span>蔡英豪</span>
                            <span>0903621658</span>
                            <span>宅配</span>
                        </div>
                        <span>桃園市中壢區中北路200號</span>
                        <span className='text-gray-500'>" 請下午三點再送過來謝謝! "</span>
                    </div>
                </Card>

                <Card>
                    <SubTitle>訂單商品</SubTitle>
                    <div className='px-2'>
                        <OrdersProductCard></OrdersProductCard>
                        <OrdersProductCard></OrdersProductCard>
                        <OrdersProductCard></OrdersProductCard>
                        <OrdersProductCard></OrdersProductCard>
                        <OrdersProductCard></OrdersProductCard>
                    </div>
                </Card>

                <Card className='flex flex-col gap-3'>
                    <div className='pl-3 py-3 bg-blue-500 rounded-xl'>
                        <span className='text-white font-bold'>訂單金額</span>
                    </div>
                    <div className='px-3'>
                        <Details></Details>
                        <Details></Details>
                        <Details></Details>
                        <Details></Details>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default OrderDetails