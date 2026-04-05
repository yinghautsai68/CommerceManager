import React, { useState } from 'react'
import { FormTitle } from '../components/Typography'
import FormInput from '../components/FormInput'
import { Button } from '../components/Button'
import { useNavigate } from 'react-router-dom'

import thumbnail from '../assets/thumbnail.png'
import thumbnail2 from '../assets/thumbnail2.png'
interface LoginFormDataProps {
    username: string,
    password: string
}
const Login = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState<LoginFormDataProps>({
        username: "",
        password: ""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        console.log(formData);
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })
            const data = await response.json();
            if (!response.ok) {
                return console.log(data.message);
            }
            console.log(data.message, data.token);


            setFormData({
                username: "",
                password: ""
            });

            localStorage.setItem("token", data.token);
            const response2 = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/me`, {
                method: "GET",
                headers: {
                    'Content-Type': "application/json",
                    'Authorization': `Bearer ${data.token}`
                }
            })

            const result2 = await response2.json();
            console.log(result2.data);
            navigate('/dashboard');

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='flex flex-row justify-center items-center w-full h-screen xl:px-10 xl:py-10  bg-gray-200 '>
            <div className='w-full xl:w-[80%] h-full xl:p-2 bg-gray-100 rounded-xl'>
                <div className='flex flex-row justify-center items-start  w-full h-full lg:p-4  bg-white rounded-xl    '>
                    <div className='hidden lg:flex flex-col justify-center items-center  w-full lg:w-[50%] h-full pl-10 pr-10 pt-10 pb-20   bg-blue-600 rounded-2xl '>
                        <div className='flex flex-col justify-end gap-1 w-full h-[30%] '>
                            <FormTitle className='text-white'>電商後台管理平台</FormTitle>
                            <span className='w-full text-gray-200'>無論在桌機或手機都能使用.</span>
                        </div>
                        <div className='relative flex flex-col justify-center gap-5 w-full h-full  '>
                            <img src={thumbnail} alt="" className='xl:w-120 xl:h-80 rounded-lg' />
                            <img src={thumbnail2} alt="" className='absolute right-0 w-38 xl:w-45 rounded-lg shadow-xl/30' />
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} className='flex flex-col gap-5 w-full md:w-[40%] lg:w-[50%] h-full px-5 lg:px-20 xl:px-30  pt-20  lg:pt-25 xl:pt-20  border-gray-300 rounded-tr-xl rounded-br-xl    '>
                        <div className='flex flex-row items-center gap-2 w-full'>
                            <div className='w-10 aspect-square bg-blue-500'></div>
                            <FormTitle className='w-full text-blue-500'>CManager</FormTitle>
                        </div>
                        <div className='flex flex-col w-full '>
                            <FormTitle className='w-full text-blue-400'>您好，歡迎回來!</FormTitle>
                            <span className='w-full text-gray-500'>請登入員工帳號以繼續.</span>
                        </div>
                        <div className='flex flex-col justify-center items-center gap-2 w-full '>
                            <FormInput label='使用者名稱' name='username' type='text' value={formData.username} handleChange={handleChange}></FormInput>
                            <FormInput label='密碼' name='password' type='password' value={formData.password} handleChange={handleChange}></FormInput>
                            <Button className='w-full '>登入!</Button>
                        </div>
                        <span className='w-full text-center text-sm text-blue-500 underline cursor-pointer'> 登入遇到問題？請聯絡 IT 支援.</span>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login