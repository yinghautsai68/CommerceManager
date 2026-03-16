import React from 'react'

interface PageNumberProps {
    onClick: () => void,
    active: boolean,
    children: React.ReactNode
}
const PageNumber = ({ onClick, active, children }: PageNumberProps) => {
    return (
        <div onClick={onClick} className={`${active ? 'bg-blue-400 text-white' : 'bg-gray-100 hover:bg-gray-300'} flex flex-row justify-center items-center  w-full md:w-10    transition-all duration-300`}>
            {children}
        </div>
    )
}

export default PageNumber