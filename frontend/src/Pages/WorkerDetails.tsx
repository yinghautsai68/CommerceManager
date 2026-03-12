import React, { useEffect, useState } from 'react'
import { SubTitle, Title } from '../components/Typography'
import FormInput from '../components/FormInput'
import { Button } from '../components/Button'
import { useNavigate, useParams } from 'react-router-dom'

interface formDataProps {
    name: string,
    email: string,
    phone: string,
    role: string,
    work: string,
    status: string,
    password: string,
};
const WorkerDetails = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<formDataProps>({
        name: "",
        email: "",
        phone: "",
        role: "",
        work: "",
        status: "",
        password: ""
    });



    const { id } = useParams<{ id: string }>();
    const [isEditing, setIsEditing] = useState<boolean>(!id);
    const fetchWorker = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/users/${id}`, {
                method: 'GET'
            });
            const result = await response.json();
            if (!result.ok) {
                console.log(result.message);
            }
            setFormData(result.data);
            console.log(result.data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => { if (id) { fetchWorker() } }, []);

    const handlechange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/users/${id}`, {
                method: 'DELETE'
            })

            const result = await response.json();
            if (!result.ok) {
                console.log(result.message);
            }
            console.log(result.message);
            alert(result.message);
            navigate('/workers');

        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch(!!id ? `http://localhost:5000/api/users/${id}` : 'http://localhost:5000/api/users', {
                method: !!id ? 'PATCH' : 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            const result = await response.json();
            if (!result.ok) {
                console.log(result.message);
            }
            console.log(result.message);
            if (!id) {
                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    role: "",
                    work: "",
                    status: "",
                    password: ""
                })
            } else if (!!id) {
                setIsEditing(false);
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='flex flex-col gap-5 md:px-10'>

            {!!id ?
                < div className='flex flex-row justify-between items-end'>
                    <div className='flex flex-col'>
                        <Title>員工資訊</Title>
                        <SubTitle className='px-5'>#{id}</SubTitle>
                    </div>
                    <div className='flex flex-row items-center gap-1'>
                        <Button onClick={() => { setIsEditing(!isEditing) }}>編輯</Button>
                        <Button onClick={() => handleDelete()} className='bg-red-400 hover:bg-red-600'>刪除</Button>
                    </div>
                </div>
                :
                < div className='flex flex-row justify-between items-end'>

                    <Title>員工資訊</Title>



                </div>
            }
            <form onSubmit={handleSubmit} className='flex flex-col gap-5 xl:w-[70%] px-2 overflow-auto'>
                <FormInput name='name' label='員工姓名' type='text' value={formData.name} handleChange={handlechange} readOnly={!isEditing} />
                <FormInput name='email' label='電子郵件' type='text' value={formData.email} handleChange={handlechange} readOnly={!isEditing} />
                <FormInput name='phone' label='連絡電話' type='text' value={formData.phone} handleChange={handlechange} readOnly={!isEditing} />
                <FormInput name='role' label='角色' type='text' value={formData.role} handleChange={handlechange} readOnly={!isEditing} />
                <FormInput name='work' label='工作崗位' type='text' value={formData.work} handleChange={handlechange} readOnly={!isEditing} />
                <FormInput name='status' label='狀態' type='text' value={formData.status} handleChange={handlechange} readOnly={!isEditing} />
                {
                    isEditing &&
                    < FormInput name='password' label='密碼' type='password' value={formData.password} handleChange={handlechange} readOnly={!isEditing} />


                }
                {
                    isEditing &&
                    <div className='flex flex-row justify-end items-center w-full'>
                        <Button className='w-[30%] lg:w-[15%]'>{!!id ? '編輯員工' : '新增員工'}</Button>
                    </div>
                }


            </form>
        </div >
    )
}

export default WorkerDetails