import React, { useContext, useEffect, useState } from 'react'
import { SubTitle, Title } from '../components/Typography'
import FormInput from '../components/FormInput'
import { Button } from '../components/Button'
import { Form, useNavigate, useParams } from 'react-router-dom'
import FormSelect from '../Components/FormSelect'
import { UtilsContext } from '../context/UtilsContext'

interface formDataProps {
    name: string,
    email: string,
    phone: string,
    role: string,
    work: string,
    status: string,
    password: string,
    created_at: string,
    updated_at: string
};
const WorkerDetails = () => {
    const { formatDate } = useContext(UtilsContext);

    const navigate = useNavigate();
    const [formData, setFormData] = useState<formDataProps>({
        name: "",
        email: "",
        phone: "",
        role: "",
        work: "",
        status: "",
        password: "",
        created_at: "",
        updated_at: ""
    });

    const roleOptions = [
        {
            label: "", value: "",
        },
        {
            label: "管理員", value: "admin",
        },
        {
            label: "員工", value: "worker"
        }
    ]
    const workOptions = [
        {
            label: "未配分", value: ""
        },
        {
            label: "客服", value: "desk"
        },
        {
            label: "開發工程師", value: "developer"
        },

    ]

    const statusOptions = [
        {
            label: "", value: "",
        },
        {
            label: "在職", value: "active",
        },
        {
            label: "離職", value: "inactive",
        },

    ]



    const { id } = useParams<{ id: string }>();
    const [isEditing, setIsEditing] = useState<boolean>(!id);
    const fetchWorker = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/${id}`, {
                method: 'GET'
            });
            const result = await response.json();
            if (!result.success) {
                return console.log(result.message);
            }
            setFormData(result.data);
            console.log(result.data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => { if (id) { fetchWorker() } }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleDelete = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/${id}`, {
                method: 'DELETE'
            })

            const result = await response.json();
            if (!result.ok) {
                return console.log(result.message);
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
            const response = await fetch(!!id ? `${import.meta.env.VITE_BACKEND_URL}/api/users/${id}` : '${import.meta.env.VITE_BACKEND_URL}/api/users', {
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
            console.log(result.message);
            if (!id) {
                alert("Worker successfully added!");
                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    role: "",
                    work: "",
                    status: "",
                    password: "",
                    created_at: "",
                    updated_at: ""
                })
            } else if (id) {
                alert("Worker successfully edited!");
                setIsEditing(false);
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='flex flex-col gap-5 md:px-10'>

            {id ?
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

            <div className='flex flex-row  items-center gap-20'>
                <div className='flex flex-col '>
                    <span className='text-gray-500'>創建時間</span>
                    <span className='-translate-y-2'>{formatDate(formData.created_at)}</span>
                </div>
                <div className='flex flex-col '>
                    <span className='text-gray-500'>創建時間</span>
                    <span className='-translate-y-2'>{formatDate(formData.updated_at)}</span>
                </div>
            </div>

            <form onSubmit={handleSubmit} className='flex flex-col gap-5 xl:w-[70%] px-2 overflow-auto'>
                <FormInput name='name' label='員工姓名' type='text' value={formData.name} handleChange={handleChange} readOnly={!isEditing} />
                <FormInput name='email' label='電子郵件' type='text' value={formData.email} handleChange={handleChange} readOnly={!isEditing} />
                <FormInput name='phone' label='連絡電話' type='text' value={formData.phone} handleChange={handleChange} readOnly={!isEditing} />
                <FormSelect name='role' label='角色' value={formData.role} options={roleOptions} handleChange={handleChange} isEditing={isEditing} />
                <FormSelect name='work' label='工作崗位' value={formData.work} options={workOptions} handleChange={handleChange} isEditing={isEditing} />
                <FormSelect name='status' label='狀態' value={formData.status} options={statusOptions} handleChange={handleChange} isEditing={isEditing} />
                {
                    isEditing &&
                    < FormInput name='password' label='密碼' type='password' value={formData.password} handleChange={handleChange} readOnly={!isEditing} />
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