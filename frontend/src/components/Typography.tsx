import React from 'react'

interface TitleProps {
    children: React.ReactNode,
    className?: string
}

export const Title = ({ className, children }: TitleProps) => {
    return <h1 className={`${className}  px-5  text-4xl  font-bold text-blue-900 `}> {children}</h1 >
}

export const FormTitle = ({ className, children }: TitleProps) => {
    return <h1 className={`${className} text-2xl font-bold  `}>{children}</h1>
}

export const SubTitle = ({ className, children }: TitleProps) => {
    return <h1 className={`${className} text-lg font-medium `}> {children}</h1>
}