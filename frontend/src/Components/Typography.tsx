import React from 'react'
import { classicNameResolver } from 'typescript'

interface TitleProps {
    children: React.ReactNode,
    className?: string
}

export const Title = ({ className, children }: TitleProps) => {
    return <h1 className={`${className}  px-5  text-4xl text-gray-700 font-bold text-blue-950 `}> {children}</h1 >
}

export const FormTitle = ({ className, children }: TitleProps) => {
    return <h1 className={`${className} text-2xl font-bold  `}>{children}</h1>
}

export const SubTitle = ({ className, children }: TitleProps) => {
    return <h1 className={`${className} text-xl `}> {children}</h1>
}