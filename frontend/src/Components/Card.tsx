import React from 'react'

interface CardProps {
    children: React.ReactNode,
    className?: string
}
export const Card = ({ children, className }: CardProps) => {
    return (
        <div className={`${className} w-full px-3 py-3 border border-gray-300  bg-white shadow-md/20 rounded-lg`}>
            {children}
        </div>
    )
}
