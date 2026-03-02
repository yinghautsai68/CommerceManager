import React from 'react'

interface ButtonProps {
    children: React.ReactNode,
    className?: string
}
export const Button = ({ className, children }: ButtonProps) => {
    return (
        <div className={`${className} p-2 rounded-lg bg-green-500 text-white hover:bg-green-800 transition-all cursor-pointer`}>{children}</div>
    )
}
