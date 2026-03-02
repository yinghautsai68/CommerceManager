import React, { useState } from 'react'
import FormInput from '../Components/FormInput'
import { FormTitle } from '../Components/Typography'
import { Button } from '../Components/Button'

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
            const response = await fetch(`http://localhost:5000/api/auth/register`, {
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
                    <FormInput name='username' type='text' value={formData.username} handleChange={handleChange}></FormInput>
                    <FormInput name='password' type='password' value={formData.password} handleChange={handleChange}></FormInput>
                    <FormInput name='confirmPassword' type='password' value={formData.confirmPassword} handleChange={handleChange}></FormInput>
                </div>

                <Button type='submit' className=''>Register!</Button>

            </form>
        </div>
    )
}

export default Register