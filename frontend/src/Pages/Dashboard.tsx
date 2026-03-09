import React from 'react'
import KPICard from '../components/KPICard'

import { LineChart, Line, XAxis, YAxis, Area, ResponsiveContainer, CartesianGrid, Tooltip, AreaChart } from 'recharts'
import { SubTitle, Title } from '../components/Typography';
import { Card } from '../components/Card';

import Sony from '../assets/sony_wh1000xm4.jpg'
import { BestSellingCard } from '../components/BestSellingCard';
import { LatestOrderCard } from '../components/LatestOrderCard';
import LowStockCard from '../components/LowStockCard';

const data = [
    { month: 'Jan', revenue: 24000 },
    { month: 'Feb', revenue: 25000 },
    { month: 'Mar', revenue: 24500 },
    { month: 'Apr', revenue: 10000 },
    { month: 'May', revenue: 11000 },
    { month: 'Jun', revenue: 13000 },
    { month: 'Jul', revenue: 9000 },
    { month: 'Aug', revenue: 17000 },
    { month: 'Sep', revenue: 19000 },
    { month: 'Oct', revenue: 16000 },
    { month: 'Nov', revenue: 26000 },
    { month: 'Dec', revenue: 32000 },
];


const Dashboard = () => {
    return (
        <div className='flex flex-col  gap-3 w-full h-full '>
            <Title className=''>儀表板</Title>
            <div className='grid grid-rows-2 grid-cols-2 gap-2 w-full'>
                <KPICard title='總收入' value='NT$ 5000.00' />
                <KPICard title='今日訪客數' value='5000' />
                <KPICard title='平均訂單金額' value='5000' />
                <KPICard title='待處理訂單數' value='5000' />
            </div>


            {/*Monthly Trends */}
            <Card className='flex flex-col gap-3 px-3 py-5'>
                <SubTitle className='w-full '>收入趨勢圖</SubTitle>
                <ResponsiveContainer width="100%" height={200}>
                    <AreaChart data={data}>
                        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                        <XAxis dataKey="month" tick={{ fontSize: 15 }} />
                        <YAxis width="auto" tick={{ fontSize: 15 }} tickFormatter={(value) => value / 1000 + "k"} />
                        <Tooltip />
                        <Area type="monotone" dataKey="revenue" stroke="#8884d8" fill="rgba(136, 132, 216, 0.3)" />
                    </AreaChart>
                </ResponsiveContainer>
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