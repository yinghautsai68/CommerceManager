import React from 'react'

interface ListItemProps {
    className?: string,
    icon?: string,
    children: React.ReactNode
}
export const ListItem = ({ className, icon, children }: ListItemProps) => {
    return (
        <li className={`${className}`}><img src={icon} alt="" /> {children}</li>
    )
}
