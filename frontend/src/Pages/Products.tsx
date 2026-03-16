import React, { useEffect, useState } from 'react'
import { Title } from '../components/Typography'
import ProductCard from '../components/ProductCard'
import { Button } from '../components/Button'
import type { Product } from '../types/types'
import { Link } from 'react-router-dom'


const Products = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const fetchProducts = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/products`, {
                method: 'GET'
            })
            const result = await response.json();
            if (!result.success) {
                return console.log(result.message);
            }
            console.log(result.data);
            setProducts(result.data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => { fetchProducts() }, []);
    return (
        <div className='flex flex-col gap-5 w-full lg:px-10  '>
            <div className='flex flex-row justify-between items-centers w-full '>
                <Title className=''>商品</Title>
                <Link to='/products/new'>
                    <Button className='p-2 font-bold'>新增商品</Button>
                </Link>

            </div>
            <div className='flex flex-col gap-1 '>
                {
                    products.map((item, index) => {
                        return (
                            <Link to={`/products/${item.id}`}>
                                <ProductCard key={index} product={item} />
                            </Link>

                        )
                    })
                }


            </div>
        </div>


    )
}

export default Products