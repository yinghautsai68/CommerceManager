import React, { useEffect, useState } from 'react'
import { SubTitle, Title } from '../components/Typography'
import { Button } from '../components/Button'
import FormInput from '../components/FormInput'

import Sony from '../assets/sony_wh1000xm4.jpg'
import { useNavigate, useParams } from 'react-router-dom'
import type { Product } from '../types/types'
import FormSelect from '../Components/FormSelect'
const ProductDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [formData, setFormData] = useState<Product>({
        id: 0,
        sku: "",
        name: "",
        category: "",
        description: "",
        price: 0,
        stock: 0,
        status: 'active',
        image_url: "DFASDF",
        created_at: "",
        updated_at: ""
    })

    const statusOptions = [
        { label: "上架", value: "active" },
        { label: "下架", value: "archived" },

    ]
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
                setFormData({ ...result.data, price: Number(result.data.price), stock: Number(result.data.stock) });
            } catch (error) {
                console.log(error);
            }
        }
        useEffect(() => { fetchProduct() }, []);
    }


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData((prev) => ({ ...prev, [name]: value }));
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const payload = {
            ...formData,
            price: Number(formData.price),
            stock: Number(formData.stock)
        }
        try {
            const response = await fetch(id ? `http://localhost:5000/api/products/${id}` : `http://localhost:5000/api/products`, {
                method: id ? 'PATCH' : 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
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

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) {
            return;
        }
        const file = e.target.files[0];

        const formDataImage = new FormData();
        formDataImage.append("image", file);

        try {
            const response = await fetch("http://localhost:5000/api/upload", {
                method: "POST",
                body: formDataImage
            })
            const result = await response.json();
            if (!result.success) {
                return console.log(result.message);
            }

            console.log(result.imageUrl)
            setFormData((prev) => ({ ...prev, image_url: result.imageUrl }));
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


    useEffect(() => { console.log(formData) }, [formData]);
    return (
        <div className='flex flex-col gap-5 px-2 md:px-10'>
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

                        <Button onClick={() => setIsEditing(prev => !prev)} className='p-1'>編輯</Button>
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

            <form onSubmit={handleSubmit} className='flex flex-col gap-4 xl:w-[70%]'>
                <FormInput name='name' label='商品名稱' value={formData.name} handleChange={handleChange} type='text' readOnly={!isEditing} />
                <FormInput name='category' label='商品分類' value={formData.category} handleChange={handleChange} type='text' readOnly={!isEditing} />
                <FormSelect name='status' value={formData.status} handleChange={handleChange} label='狀態' options={statusOptions} isEditing={isEditing} />
                <FormInput name='stock' label='庫存量' value={formData.stock} handleChange={handleChange} type='number' readOnly={!isEditing} />
                <FormInput name='price' label='商品售價' value={formData.price} handleChange={handleChange} type='number' readOnly={!isEditing} />
                <FormInput name='description' label='商品詳細描述' value={formData.description} handleChange={handleChange} type='text' readOnly={!isEditing} />


                <div className='flex flex-col gap-2 lg:w-[80%] xl:w-[50%]'>
                    <SubTitle className='lg:text-xl font-semibold text-gray-500 '>照片</SubTitle>
                    <div className='grid grid-cols-5 gap-1  '>

                        <img src={formData.image_url} alt="" className=' aspect-square object-cover border border-gray-300 rounded-lg' />

                    </div>
                    {
                        isEditing &&
                        <input type="file" onChange={handleImageUpload} className='pl-5 py-1 border border-gray-300 rounded-lg' />
                    }

                </div>

                {
                    isEditing &&
                    <div className='flex flex-row justify-end items-center'>
                        <Button type='submit' className='px-5'>{id ? '儲存' : '新增商品'}</Button>
                    </div>
                }

            </form>
        </div >
    )
}

export default ProductDetails