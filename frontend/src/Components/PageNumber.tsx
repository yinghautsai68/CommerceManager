import React from 'react'

interface PageNumberProps {
    children: React.ReactNode
}
const PageNumber = ({ children }: PageNumberProps) => {
    return (
        <div className='flex flex-row justify-center items-center  w-full h-full   bg-gray-100 hover:bg-gray-300 transition-all duration-300'>
            {children}
        </div>
    )
}

export default PageNumber