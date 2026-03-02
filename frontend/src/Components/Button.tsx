import React from 'react'

interface ButtonProps {
    type: string,
    children: React.ReactNode,
    className?: string
}
export const Button = ({ type, className, children }: ButtonProps) => {
    return (
        <button className={`${className} p-2 rounded-lg bg-green-500 text-white hover:bg-green-800 transition-all cursor-pointer`}>{children}</button>
    )
}
