import React from 'react'

interface FormInputProps {
    name: string,
    type: string,
    value: string,
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}
const FormInput = ({ name, type, value, handleChange }: FormInputProps) => {
    return (
        <div className='flex flex-col w-full'>
            <label htmlFor={name} className='capitalize text-gray-500'>{name}</label>
            <input id={name} name={name} value={value} type={type} onChange={(e) => handleChange(e)} required className='pl-2 py-1 border border-gray-300 rounded-lg' />
        </div>
    )
}

export default FormInput