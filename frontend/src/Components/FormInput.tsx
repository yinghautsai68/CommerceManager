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
            <label htmlFor={name} className='capitalize'>{name}</label>
            <input id={name} name={name} value={value} type={type} onChange={(e) => handleChange(e)} required className='pl-2 border border-black' />
        </div>
    )
}

export default FormInput