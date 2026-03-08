import React from 'react'
import KPICard from '../components/KPICard'

import { LineChart, Line, XAxis, YAxis } from 'recharts'
import { SubTitle, Title } from '../components/Typography';
import { Card } from '../components/Card';

import Sony from '../assets/sony_wh1000xm4.jpg'
import { BestSellingCard } from '../components/BestSellingCard';
import { LatestOrderCard } from '../components/LatestOrderCard';
import LowStockCard from '../components/LowStockCard';

const data = [
    { name: 'Jan', value: 400 },
    { name: 'Feb', value: 300 },
    { name: 'Mar', value: 500 },
    { name: 'Apr', value: 200 },
];

const data2 = [
    { name: 'Jeans', value: 5200 },
    { name: 'Shirts', value: 3100 },
    { name: 'Belts', value: 2800 },
    { name: 'Caps', value: 2500 },
    { name: 'Others', value: 1400 },
];

const orders = [
    {
        id: 73121,
        date: "2026/03/21",
        time: "17:53",
        status: "pending",
        orderItem: [
            { orderProduct: "Earphones", orderQuantity: 3, orderPrice: 500 },
            { orderProduct: "Microphone", orderQuantity: 2, orderPrice: 400 }
        ]
    },
    {
        id: 73121,
        date: "2026/03/21",
        time: "17:53",
        status: "pending",
        orderItem: [
            { orderProduct: "Earphones", orderQuantity: 3, orderPrice: 500 },
            { orderProduct: "Microphone", orderQuantity: 2, orderPrice: 400 }
        ]
    },
    {
        id: 73121,
        date: "2026/03/21",
        time: "17:53",
        status: "pending",
        orderItem: [
            { orderProduct: "Earphones", orderQuantity: 3, orderPrice: 500 },
            { orderProduct: "Microphone", orderQuantity: 2, orderPrice: 400 }
        ]
    }
];
const Dashboard = () => {
    return (
        <div className='flex flex-col  gap-3 w-full h-full '>
            <Title className=''>儀表板</Title>
            <div className='grid grid-rows-2 grid-cols-2 gap-2 w-full'>
                <KPICard title='總收入' value='NT$ 5000.00' />
                <KPICard title='Orders Count' value='5000' />
                <KPICard title='New Customers' value='5000' />
                <KPICard title='New Customers' value='5000' />
            </div>


            {/*Monthly Trends */}
            <Card className='flex flex-col gap-3 px-3 py-5'>
                <SubTitle className='w-full '>收入趨勢圖</SubTitle>
                <LineChart width={"100%"} height={200} data={data} responsive>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Line type="monotone" dataKey="value" stroke="#8884d8" />
                </LineChart>
            </Card>




            {/*Order Table*/}
            <Card className='flex flex-col gap-2 px-4 pt-5'>
                <SubTitle>熱銷商品</SubTitle>
                <div className='flex flex-col w-full '>
                    <BestSellingCard />
                    <BestSellingCard />
                    <BestSellingCard />
                    <BestSellingCard />
                    <BestSellingCard />
                </div>
            </Card>

            {
                /*
                 <Card>
                    <table>
                        <thead>
                            <tr>
    
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
    
                            </tr>
                        </tbody>
                    </table>
                </Card>
    
                 */
            }
            <Card className='flex flex-col gap-2 pl-4 pr-3 pt-5'>
                <SubTitle>最近訂單</SubTitle>
                <div className='flex flex-col w-full '>
                    <LatestOrderCard></LatestOrderCard>
                    <LatestOrderCard></LatestOrderCard>
                    <LatestOrderCard></LatestOrderCard>
                    <LatestOrderCard></LatestOrderCard>
                    <LatestOrderCard></LatestOrderCard>
                </div>
            </Card>

            <Card className='flex flex-col gap-2 pl-4 pr-3 pt-5'>
                <SubTitle>低庫存商品清單</SubTitle>
                <div className='flex flex-col w-full '>
                    <LowStockCard></LowStockCard>
                    <LowStockCard></LowStockCard>
                    <LowStockCard></LowStockCard>
                    <LowStockCard></LowStockCard>
                    <LowStockCard></LowStockCard>
                    <LowStockCard></LowStockCard>
                </div>
            </Card>
        </div >
    )
}

export default Dashboard