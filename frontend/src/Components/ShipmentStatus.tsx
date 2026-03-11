import React from 'react'

interface ShipmentStatusProps {
    children: React.ReactNode
}
const ShipmentStatus = ({ children }: ShipmentStatusProps) => {
    return (
        <div className='flex flex-row justify-center items-center p-1 rounded-md bg-green-400 text-sm text-white'>
            {children}
        </div>
    )
}

export default ShipmentStatus