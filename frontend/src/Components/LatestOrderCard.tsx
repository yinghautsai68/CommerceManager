import React from 'react'
import PaymentStatus from './PaymentStatus'

export const LatestOrderCard = () => {
    return (
        <div className='flex flex-row justify-between items-center h-full  pb-2 border-b border-gray-300'>
            <div className='flex-1 flex flex-col justify-between items-start h-full  '>
                <span className='translate-y-2 text-sm text-gray-500 '>2026/03/23 15:30</span>
                <span className='translate-y-1  text-sm text-gray-500'>訂單編號 #73121</span>
                <span className='translate-y-1'>蔡英豪</span>
            </div>

            <div className='flex-1 flex flex-col justify-end items-end h-full'>
                <div className='translate-y-2 flex-1 flex flex-row gap-1  '>
                    <PaymentStatus />
                    <PaymentStatus />
                </div>
                <span className='translate-y-1.5 flex-1 text-xs '>3 件</span>
                <span className='translate-y-1 flex-1 text-xs font-medium'>NT$ 4500</span>
            </div>
        </div>
    )
}
