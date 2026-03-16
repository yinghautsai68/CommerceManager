import React, { useState } from 'react'
import FormInput from '../components/FormInput'
import { FormTitle } from '../components/Typography'
import { Button } from '../components/Button'

interface FormDataProps {
    username: string,
    password: string,
    confirmPassword: string
}

const Register = () => {
    const [formData, setFormData] = useState<FormDataProps>({
        username: "",
        password: "",
        confirmPassword: ""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData((prev) => ({ ...prev, [name]: value }));
        console.log(formData);
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            if (!response.ok) {
                return console.log(data.message);
            }

            console.log(data.message);
            setFormData({
                username: "",
                password: "",
                confirmPassword: ""
            });
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='flex flex-col justify-center items-center w-full h-screen'>
            <form onSubmit={handleSubmit} className='flex flex-col justify-between items-center gap-2 w-[80%] h-[50%] px-5 py-10 border  '>
                <FormTitle className='h-[10%] text-center'>Register</FormTitle>
                <div className='flex flex-col justify-center items-center w-full'>
                    <FormInput label='username' name='username' type='text' value={formData.username} handleChange={handleChange}></FormInput>
                    <FormInput label='password' name='password' type='password' value={formData.password} handleChange={handleChange}></FormInput>
                    <FormInput label='confirm password' name='confirmPassword' type='password' value={formData.confirmPassword} handleChange={handleChange}></FormInput>
                </div>

                <Button className=''>Register!</Button>

            </form>
        </div>
    )
}

export default Register