import React, { useState } from 'react'
import { FormTitle } from '../Components/Typography'
import FormInput from '../Components/FormInput'
import { Button } from '../Components/Button'
interface LoginFormDataProps {
    username: string,
    password: string
}
const Login = () => {
    const [formData, setFormData] = useState<LoginFormDataProps>({
        username: "",
        password: ""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        console.log(formData);
    }
    return (
        <div className='flex flex-col justify-center items-center w-full h-screen'>
            <form action="" className='flex flex-col justify-between items-center gap-2 w-[80%] h-[50%] px-5 py-10 border  '>
                <FormTitle className='h-[10%] text-center'>Login</FormTitle>
                <div className='flex flex-col justify-center items-center w-full'>
                    <FormInput name='username' type='text' value={formData.username} handleChange={handleChange}></FormInput>
                    <FormInput name='password' type='password' value={formData.password} handleChange={handleChange}></FormInput>
                </div>

                <Button className=''>Login!</Button>

            </form>
        </div>
    )
}

export default Login