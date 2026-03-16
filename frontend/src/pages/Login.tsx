import React, { useState } from 'react'
import { FormTitle, SubTitle } from '../components/Typography'
import FormInput from '../components/FormInput'
import { Button } from '../components/Button'
import { useNavigate } from 'react-router-dom'
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
        <div className='flex flex-row justify-center items-center w-full h-screen'>
            <div className='flex flex-row justify-center items-center w-full  lg:w-[70%] lg:h-[80%] px-5 lg:px-0 rounded-xl lg:shadow-xl  '>
                <div className='hidden lg:flex flex-col justify-start gap-5 w-full lg:w-[50%] h-full pl-10 pr-10 pt-10 pb-30 bg-blue-500 rounded-tl-xl rounded-bl-xl'>
                    <FormTitle className='text-white'>CManger Dashboard</FormTitle>

                    <div className='flex flex-col justify-center gap-5 w-full h-full '>
                        <span className='text-3xl font-bold text-white'>歡迎參觀!</span>
                        <p className='text-white'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corrupti, quisquam. Dicta distinctio animi repudiandae, doloremque provident accusantium laborum praesentium maiores nisi. Vitae cum magnam, reprehenderit facere nisi natus esse ad.</p>
                    </div>
                </div>
                <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center gap-5 w-full md:w-[40%] lg:w-[50%] h-full px-10 lg:px-15 xl:px-25     py-10 border border-gray-300 rounded-tr-xl rounded-br-xl shadow-xl   '>
                    <FormTitle className=' text-center text-blue-400'>登入</FormTitle>
                    <div className='flex flex-col justify-center items-center gap-5 w-full'>
                        <FormInput label='使用者名稱' name='username' type='text' value={formData.username} handleChange={handleChange}></FormInput>
                        <FormInput label='密碼' name='password' type='password' value={formData.password} handleChange={handleChange}></FormInput>
                    </div>
                    <Button type='submit' className=''>登入!</Button>
                </form>
            </div>
        </div>
    )
}

export default Login