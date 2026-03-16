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
        <Card className='flex flex-row items-center w-full xl:w-[80%]  md:pr-10 hover:bg-gray-200 transition-all duration-300 '>
            <div className='flex flex-row justify-between items-center gap-2 w-[70%] '>
                <img src={product.image_url} alt="" className='w-[20%] xl:w-[15%] aspect-square object-cover border border-gray-300' />
                <div className='flex flex-col justify-between items-start w-[80%] h-full text-sm lg:text-base   '>
                    <div className='flex flex-col items-start '>
                        <span className=' '>商品編號 #{product.id}</span>
                        <span className='w-full truncate   font-medium   '>{product.name}</span>
                        <span className=''>{product.category}</span>
                    </div>
                    <div className='flex flex-row items-center gap-3'>
                        <span className=''>NT$ {product.price}</span>
                        <span className=''>QTY. {product.stock}</span>
                    </div>
                </div>
            </div>

            <div className='flex flex-col justify-start items-end gap-1 w-[30%] h-full lg:text-base  '>
                <ActiveStatus status={product.status} />
                <div className='hidden flex flex-row gap-1 w-full text-xs '>
                    <Button className='w-full px-2 py-2 '>編輯</Button>
                    <Button className='w-full px-2 py-2 bg-red-400 '>刪除</Button>
                </div>
            </div>
        </Card>
    )
}

export default ProductCard