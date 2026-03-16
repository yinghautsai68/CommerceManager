import { useEffect, useState } from 'react'
import KPICard from '../components/KPICard'

import { XAxis, YAxis, Area, ResponsiveContainer, CartesianGrid, Tooltip, AreaChart } from 'recharts'
import { SubTitle, Title } from '../components/Typography';
import { Card } from '../components/Card';


import { BestSellingCard } from '../components/BestSellingCard';
import { LatestOrderCard } from '../components/LatestOrderCard';
import LowStockCard from '../components/LowStockCard';
import type { Order, Product } from '../types/types';

const Dashboard = () => {

    //KPI CARDS
    const [totalRevenue, setTotalRevenue] = useState<number>(0);
    const fetchTotalRevenue = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/orders/total-revenue`, {
                method: "GET"
            });
            const result = await response.json();
            if (!result.success) {
                return console.log(result.message);
            }
            console.log(result.data);
            setTotalRevenue(result.data.total_revenue);
        } catch (error) {
            console.log(error);
        }
    }

    const [averageOrderAmount, setAverageOrderAmount] = useState<number>(0);
    const fetchAverageOrderAmount = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/orders/average-order-amount`, {
                method: "GET"
            });
            const result = await response.json();
            if (!result.success) {
                return console.log(result.message);
            }
            console.log(result.data);
            setAverageOrderAmount(Number(result.data.average_order_amount));
        } catch (error) {
            console.log(error);
        }
    }


    const [pendingShipmentOrders, setPendingShipmentOrders] = useState<number>(0);
    const fetchPendingShipmentOrders = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/orders/pending-shipment`, {
                method: "GET"
            });
            const result = await response.json();
            if (!result.success) {
                return console.log(result.message);
            }
            console.log(result.data);
            setPendingShipmentOrders(result.data.total_pending_shipment_orders);
        } catch (error) {
            console.log(error);
        }
    }

    //Graph
    interface RevenueByDate {
        date: string,
        revenue: string
    }
    const [revenueByDate, setRevenueByDate] = useState<RevenueByDate[]>([])
    const fetchRevenueByDate = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/orders/revenue-by-date`, {
                method: "GET"
            });
            const result = await response.json();
            if (!result.success) {
                return console.log(result.message);
            }
            console.log(result.data);
            setRevenueByDate(result.data);
        } catch (error) {
            console.log(error);
        }
    }

    //Tables
    const [lowStockProducts, setLowStockProducts] = useState<Product[]>([]);
    const fetchLowStockProducts = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/products/low-stock`, {
                method: "GET"
            });
            const result = await response.json();
            if (!result.success) {
                return console.log(result.message);
            }
            console.log(result.data);
            setLowStockProducts(result.data);
        } catch (error) {
            console.log(error);
        }
    }

    const [latestOrders, setLatestOrders] = useState<Order[]>([]);
    const fetchLatestOrders = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/orders/latest`, {
                method: "GET"
            });

            const result = await response.json();
            if (!result.success) {
                return console.log(result.message);
            }
            console.log(result.data);
            setLatestOrders(result.data);
        } catch (error) {
            console.log(error);
        }
    }


    const [topSelllingProducts, setTopSellingProducts] = useState<Product[]>([]);
    const fetchTopSellingProducts = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/products/top-selling`, {
                method: "GET"
            });

            const result = await response.json();
            if (!result.success) {
                return console.log(result.message);
            }
            console.log(result.data);
            setTopSellingProducts(result.data)
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        //KPI
        fetchTotalRevenue();
        fetchAverageOrderAmount();
        fetchPendingShipmentOrders();

        //Graph
        fetchRevenueByDate();

        //Tables
        fetchLowStockProducts();
        fetchLatestOrders();
        fetchTopSellingProducts();
    }, []);

    return (
        <div className='flex flex-col  gap-3 w-full '>
            <Title className=''>儀表板</Title>
            <div className='grid grid-rows-2 grid-cols-2 gap-2 w-full'>
                <KPICard title='總收入' value={`NT$ ${totalRevenue}`} />
                <KPICard title='今日訪客數' value={0} />
                <KPICard title='平均訂單金額' value={`NT$ ${averageOrderAmount.toFixed(2)}`} />
                <KPICard title='待出貨訂單數' value={pendingShipmentOrders} />
            </div>



            <div className='flex  flex-col lg:flex-row gap-3 lg:h-90'>
                <Card className='flex flex-col gap-3 h-80 lg:h-full px-3 py-5'>
                    <SubTitle className='w-full '>收入趨勢圖</SubTitle>
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={revenueByDate}>
                            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                            <XAxis dataKey="date" tick={{ fontSize: 15 }} tickFormatter={(date) => date.slice(5, 10)} />
                            <YAxis width="auto" tick={{ fontSize: 15 }} tickFormatter={(value) => value / 1000 + "k"} />
                            <Tooltip />
                            <Area type="monotone" dataKey="revenue" stroke="#8884d8" fill="rgba(136, 132, 216, 0.3)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </Card>
                <Card className='flex flex-col gap-2 px-4 pt-5'>
                    <SubTitle>熱銷商品</SubTitle>
                    <div className='flex flex-col w-full '>
                        {
                            topSelllingProducts.map((item, index) => {
                                return (
                                    <BestSellingCard product={item} rank={index + 1} key={index} />
                                )
                            })
                        }
                    </div>
                </Card>
            </div>



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
                    {
                        latestOrders.map((item, index) => {
                            return (
                                <LatestOrderCard order={item} key={index} />
                            )
                        })
                    }
                </div>
            </Card>

            <Card className='flex flex-col gap-2 pl-4 pr-3 pt-5'>
                <SubTitle>低庫存商品清單</SubTitle>
                <div className='flex flex-col w-full '>
                    {
                        lowStockProducts.map((item, index) => {
                            return (
                                <LowStockCard product={item} key={index}></LowStockCard>
                            )
                        })
                    }


                </div>
            </Card>
        </div >
    )
}

export default Dashboard