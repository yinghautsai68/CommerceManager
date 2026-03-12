import React from 'react'

type status = 'active' | 'archived';
interface ActiveStatusProps {
    className?: string,
    status: status
}

const activeStatusMap = {
    active: "上架中",
    archived: "未上架"
}

const classNameMap = {
    active: 'bg-green-500',
    archived: 'bg-red-400'
}
const ActiveStatus = ({ className, status }: ActiveStatusProps) => {
    return (
        <div className={`${classNameMap[status]} flex flex-row items-center px-2 py-2 `}>
            <span className=' text-white'>{activeStatusMap[status]}</span>
        </div>
    )
}

export default ActiveStatus