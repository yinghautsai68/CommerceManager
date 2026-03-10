import React, { useEffect, useState } from 'react'
import { SubTitle, Title } from '../components/Typography'
import { Button } from '../components/Button'
import FormInput from '../components/FormInput'

import Sony from '../assets/sony_wh1000xm4.jpg'
import { useNavigate, useParams } from 'react-router-dom'
import type { Product } from '../types/types'
const ProductDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [formData, setFormdata] = useState<Product>({
        sku: "",
        name: "",
        category: "",
        description: "",
        price: 0,
        stock: 0,
        status: "",
        image_url: "DFASDF",
        created_at: "",
        updated_at: ""
    })

    if (id) {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/products/${id}`, {
                    method: 'GET'
                })
                const result = await response.json();
                if (!result.success) {
                    return console.log(result.message);
                }
                console.log(result.data);
                setFormdata(result.data);
            } catch (error) {
                console.log(error);
            }
        }
        useEffect(() => { fetchProduct() }, []);
    }


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormdata((prev) => ({ ...prev, [name]: value }));
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch(id ? `http://localhost:5000/api/products/${id}` : `http://localhost:5000/api/products`, {
                method: id ? 'PATCH' : 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            const result = await response.json();
            if (!result.success) {
                return console.log(result.message);
            }
            if (id) {
                alert("Edited product successfulyl!");
            } else if (!id) {
                alert("Created product successfulyl!");
            }
            navigate('/products')
        } catch (error) {
            console.log(error);
        }
    }

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/products/${id}`, {
                method: 'DELETE'
            })
            const result = await response.json();
            if (!result.success) {
                return console.log(result.message);
            }

            alert(result.message);
            navigate('/products');
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='flex flex-col gap-5'>
            <div className='flex flex-row'>
                <div className='flex flex-col flex-1'>
                    <Title>商品資訊</Title>
                    {
                        id &&
                        <span className='pl-5 '>#{id} {formData.sku}</span>
                    }

                </div>
                {
                    id &&
                    <div className='flex flex-row justify-center items-end gap-1'>

                        <Button className='p-1'>編輯</Button>
                        <Button onClick={() => handleDelete()} className='p-1 bg-red-400'>刪除</Button>
                    </div>
                }

            </div>

            {
                id &&
                <div className='flex flex-row  items-center gap-20'>
                    <div className='flex flex-col '>
                        <span className='text-gray-500'>創建時間</span>
                        <span className='-translate-y-2'>{formData.created_at}</span>
                    </div>
                    <div className='flex flex-col '>
                        <span className='text-gray-500'>創建時間</span>
                        <span className='-translate-y-2'>{formData.updated_at}</span>
                    </div>
                </div>
            }

            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <FormInput name='name' label='商品名稱' value={formData.name} handleChange={handleChange} type='text' />
                <FormInput name='category' label='商品分類' value={formData.category} handleChange={handleChange} type='text' />
                <FormInput name='status' label='上架狀態' value={formData.status} handleChange={handleChange} type='text' />
                <FormInput name='stock' label='庫存量' value={formData.stock} handleChange={handleChange} type='number' />
                <FormInput name='price' label='商品售價' value={formData.price} handleChange={handleChange} type='number' />
                <FormInput name='description' label='商品詳細描述' value={formData.description} handleChange={handleChange} type='text' />


                <div className='flex flex-col gap-2'>
                    <SubTitle className='text-gray-500'>照片</SubTitle>
                    <div className='grid grid-cols-5 gap-1 '>
                        <img src={Sony} alt="" className=' aspect-square border border-gray-300 rounded-lg' />
                        <img src={Sony} alt="" className=' aspect-square border border-gray-300 rounded-lg' />
                        <img src={Sony} alt="" className=' aspect-square border border-gray-300 rounded-lg' />
                        <img src={Sony} alt="" className=' aspect-square border border-gray-300 rounded-lg' />
                        <img src={Sony} alt="" className=' aspect-square border border-gray-300 rounded-lg' />
                    </div>
                    <input type="file" className='pl-5 py-1 border border-gray-300 rounded-lg' />
                </div>

                <div className='flex flex-row justify-end items-center'>
                    <Button type='submit' className='px-5'>{id ? '編輯' : '新增商品'}</Button>
                </div>
            </form>
        </div >
    )
}

export default ProductDetails