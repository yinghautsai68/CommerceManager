import React from 'react'

interface ActiveStatusProps {
    children: React.ReactNode
}
const ActiveStatus = ({ children }: ActiveStatusProps) => {
    return (
        <div className='flex flex-row items-center px-2 py-2 bg-green-500'>
            <span className='text-xs text-white'>{children}</span>
        </div>
    )
}

export default ActiveStatus