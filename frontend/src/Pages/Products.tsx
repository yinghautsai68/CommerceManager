import React from 'react'
import { Title } from '../components/Typography'
import ProductCard from '../components/ProductCard'
import { Button } from '../components/Button'

const products = [
    {
        id: "",
        name: "",
        category: "",
        description: "",
        price: "",
        stock: "",
        status: "",
        image_url: "",
        created_at: "",
        updated_at: ""
    }
]
const Products = () => {
    return (
        <div className='flex flex-col gap-5 w-full h-full '>
            <div className='flex flex-row justify-between items-centers w-full '>
                <Title className=''>商品</Title>
                <Button className='p-2 font-bold'>新增商品</Button>
            </div>
            <div className='flex flex-col gap-1 '>
                <ProductCard></ProductCard>
                <ProductCard></ProductCard>
                <ProductCard></ProductCard>
                <ProductCard></ProductCard>
                <ProductCard></ProductCard>
            </div>
        </div>


    )
}

export default Products