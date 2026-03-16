import React from 'react'


interface FormSelectProps {
    label: string,
    name: string,
    value: string,
    handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void,
    isEditing: boolean,
    options: [{ label: string, value: string }]
}

const FormSelect = ({ label, name, value, handleChange, isEditing, options }: FormSelectProps) => {
    return (
        <div className='flex flex-col w-full'>
            <label className='capitalize  lg:text-xl text-gray-500 font-semibold'>{label}</label>
            <select name={name} value={value} onChange={(e) => handleChange(e)} disabled={!isEditing} className={`${isEditing ? 'border border-gray-300 rounded-lg' : 'appearance-none'} pl-5 py-2`}>
                {
                    options.map((item, index) => {
                        return (
                            <option key={index} value={item.value}>{item.label}</option>
                        )
                    })
                }
            </select>
        </div>
    )
}

export default FormSelect