import React from 'react'

interface ButtonProps {
    onClick?: () => void,
    type?: string,
    children: React.ReactNode,
    className?: string
}
export const Button = ({ onClick, type, className, children }: ButtonProps) => {
    return (
        <button onClick={onClick} className={`${className} p-2 font- rounded-lg bg-green-400 text-white font-extrabold hover:bg-green-800 transition-all cursor-pointer`}>{children}</button>
    )
}
