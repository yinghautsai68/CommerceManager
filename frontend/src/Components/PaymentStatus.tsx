import React from 'react'

interface PaymentStatusProps {
    children: React.ReactNode
}
const PaymentStatus = ({ children }: PaymentStatusProps) => {
    return (
        <div className='flex flex-row justify-center items-center p-1 rounded-md bg-green-400 text-sm text-white'>
            {children}
        </div>
    )
}

export default PaymentStatus