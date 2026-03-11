import React from 'react'

interface KPICardProps {
    title: string,
    value: string | number,
}
const KPICard = ({ title, value }: KPICardProps) => {
    return (
        <div className='flex flex-row justify-around items-center w-full h-[70px] px-2 border border-gray-300 bg-white rounded-lg shadow-md/20 text-xs  hover:bg-gray-300 transition-all duration-300'>
            <div className='flex flex-col justify-center items-start w-full h-full pl-3'>
                <div className='translate-y-1 text-sm text-gray-500'>{title}</div>
                <div className='text-lg font-medium'>{value}</div>
            </div>

        </div>
    )
}

export default KPICard