import React from 'react'
import { SubTitle, Title } from '../components/Typography'
import { Button } from '../components/Button'
import FormInput from '../components/FormInput'

import Sony from '../assets/sony_wh1000xm4.jpg'
const ProductDetails = () => {
    return (
        <div className='flex flex-col gap-3'>
            <div className='flex flex-row'>
                <div className='flex flex-col flex-1'>
                    <Title>商品資訊</Title>
                    <span className='pl-5 '>#10010</span>
                </div>
                <div className='flex flex-row justify-center items-end gap-1'>
                    <Button className='p-1'>編輯</Button>
                    <Button className='p-1'>編輯</Button>
                </div>
            </div>
            <div className='flex flex-row  items-center gap-20'>
                <div className='flex flex-col '>
                    <span className='text-gray-500'>創建時間</span>
                    <span className='-translate-y-2'>2026/03/03</span>
                </div>
                <div className='flex flex-col '>
                    <span className='text-gray-500'>創建時間</span>
                    <span className='-translate-y-2'>2026/03/03</span>
                </div>
            </div>
            <div className='flex flex-col gap-4'>
                <FormInput name='商品名稱' value='hotdog' type='text' />
                <FormInput name='商品分類' value='hotdog' type='text' />
                <FormInput name='上架狀態' value='hotdog' type='text' />
                <FormInput name='庫存量' value='hotdog' type='text' />
                <FormInput name='商品售價' value='hotdog' type='text' />
                <FormInput name='商品詳細描述' value='hotdog' type='text' />


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
            </div>
        </div>
    )
}

export default ProductDetails