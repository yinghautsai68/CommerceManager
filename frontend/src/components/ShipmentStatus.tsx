import React from 'react'

type ShipmentStatus = 'pending' | 'shipped' | 'completed' | 'cancelled';
interface ShipmentStatusProps {
    status: ShipmentStatus
}
const statusMap: Record<ShipmentStatus, string> = {
    pending: "待出貨",
    shipped: "已出貨",
    completed: '已送達',
    cancelled: '已取消',
}

const classNameMap: Record<ShipmentStatus, string> = {
    pending: "bg-orange-500",
    shipped: "bg-blue-500",
    completed: "bg-green-500",
    cancelled: "bg-red-400",
}

const ShipmentStatus = ({ status }: ShipmentStatusProps) => {
    return (
        <div className={`${classNameMap[status]} flex flex-row justify-center items-center p-1 rounded-md  text-sm text-white`}>
            {statusMap[status]}
        </div>
    )
}

export default ShipmentStatus