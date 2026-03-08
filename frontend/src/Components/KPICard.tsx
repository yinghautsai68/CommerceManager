import React from 'react'

interface KPICardProps {
    title: string,
    value: string,
}
const KPICard = ({ title, value }: KPICardProps) => {
    return (
        <div className='flex flex-row justify-around items-center w-full h-[80px] px-2 border border-gray-300 bg-white rounded-lg shadow-md/20 text-xs  hover:bg-gray-300 transition-all duration-300'>
            <div className='flex flex-col justify-center items-center w-full h-full'>
                <div>{title}</div>
                <div className='text-lg'>{value}</div>
            </div>

        </div>
    )
}

export default KPICard