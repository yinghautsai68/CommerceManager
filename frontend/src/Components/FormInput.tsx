import React from 'react'

interface FormInputProps {
    label: string,
    name: string,
    type: string,
    value: string,
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    readOnly?: boolean
}
const FormInput = ({ label, name, type, value, handleChange, readOnly }: FormInputProps) => {
    return (
        <div className='flex flex-col w-full'>
            <label htmlFor={name} className='capitalize  lg:text-lg text-gray-500 font-semibold'>{label}</label>
            <input id={name} name={name} value={value} type={type} onChange={(e) => handleChange(e)} required readOnly={readOnly} className={`${readOnly ? 'pl-5 py-2 focus:outline-none' : 'pl-5 py-2 border border-gray-300 rounded-lg'} lg:text-lg `} />
        </div>
    )
}

export default FormInput