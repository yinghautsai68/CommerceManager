import React from 'react'

interface TitleProps {
    children: React.ReactNode,
    className?: string
}

export const FormTitle = ({ className, children }: TitleProps) => {
    return <h1 className={`${className} text-2xl font-bold  `}>{children}</h1>
}