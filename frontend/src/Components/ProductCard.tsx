import React from 'react'
import { Card } from './Card'


import Sony from '../assets/sony_wh1000xm4.jpg'
import PaymentStatus from './PaymentStatus'
import { Button } from './Button'
import ActiveStatus from './ActiveStatus'
import type { Product } from '../types/types'

interface ProductCardProps {
    product: Product;
}
const ProductCard = ({ product }: ProductCardProps) => {
    return (
        <Card className='flex flex-row items-center w-full hover:bg-gray-200 transition-all duration-300 '>
            <div className='flex flex-row justify-between items-center gap-2 w-[70%] '>
                <img src={Sony} alt="" className='w-[20%] aspect-square border border-gray-300' />
                <div className='flex flex-col justify-between items-start w-[80%] h-full  '>
                    <div className='flex flex-col items-start '>
                        <span className='text-xs'>商品編號 #{product.id}</span>
                        <span className='w-full truncate text-xs font-medium   '>{product.name}</span>
                        <span className='text-xs'>{product.category}</span>
                    </div>
                    <div className='flex flex-row items-center gap-3'>
                        <span className='text-xs'>NT$ {product.price}</span>
                        <span className='text-xs'>QTY. {product.stock}</span>
                    </div>
                </div>
            </div>

            <div className='flex flex-col justify-start items-end gap-1 w-[30%] h-full  '>
                <ActiveStatus>{product.status}</ActiveStatus>
                <div className='hidden flex flex-row gap-1 w-full '>
                    <Button className='w-full px-2 py-2 text-xs'>編輯</Button>
                    <Button className='w-full px-2 py-2 bg-red-400 text-xs'>刪除</Button>
                </div>
            </div>
        </Card>
    )
}

export default ProductCard