import React from 'react'
import type { Order } from '../types/types'

interface DetailsProps {
    label: string,
    value: string | number | React.ReactNode,
    className?: string
}
const Details = ({ label, value, className }: DetailsProps) => {
    return (
        <div className={`${className} grid grid-cols-[1.5fr_2fr] py-2 border-b border-gray-300`}>
            <span>{label}</span>
            <div className='flex flex-row justify-end items-center'>{value}</div>
        </div>
    )
}

export default Details