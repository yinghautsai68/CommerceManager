import React from 'react'

interface FormInputProps {
    label: string,
    name: string,
    type: string,
    value: string | number,
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    readOnly?: boolean
}
const FormInput = ({ label, name, type, value, handleChange, readOnly }: FormInputProps) => {
    return (
        <div className='flex flex-col w-full'>
            <label htmlFor={name} className='capitalize  text-sm  lg:text-lg text-gray-500 font-semibold'>{label}</label>
            <input id={name} name={name} value={value} type={type} onChange={(e) => handleChange(e)} required readOnly={readOnly} className={`${readOnly ? ' focus:outline-none' : 'border border-gray-300 rounded-lg'} pl-3 py-1 lg:text-lg `} />
        </div>
    )
}

export default FormInput