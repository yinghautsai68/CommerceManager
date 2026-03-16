import React from 'react'
import { Card } from './Card'

import type { Worker } from '../types/types';
import { SubTitle } from './Typography';
interface WorkerCardProps {
    worker: Worker;
}

interface StatusMapProps {
    active: string,
    inactive: string
}
const WorkerCard = ({ worker }: WorkerCardProps) => {
    const roleMap = {
        admin: '管理員',
        worker: '員工'
    }
    const workMap = {
        desk: "櫃台",
        developer: "工程師"
    }
    const statusMap: StatusMapProps = {
        active: "在職",
        inactive: "離職"
    };

    return (
        <Card className='px-3 pt-3 xl:w-[80%]'>
            <div className='flex flex-row justify-between items-end'>
                <div className='flex flex-col'>
                    <span className='translate-y-1 text-sm xl:text-lg font-bold text-gray-500 '>員工編號</span>
                    <span className='xl:text-lg font-bold text-gray-500'># {worker.id}</span>
                </div>
                <div className='flex flex-col items-center'>
                    <span className='text-sm xl:text-lg font-bold'>{roleMap[worker.role]}</span>
                    <span className='xl:text-lg font-bold'>{worker.name}</span>
                </div>
                <div className='flex flex-col'>
                    <div className={`${worker.status === 'active' ? 'bg-green-300' : 'bg-red-400'} flex flex-row justify-center px-1 `}>
                        <span className=' text-sm xl:text-lg text-white font-medium' >{statusMap[worker.status]}</span>
                    </div>
                    <span className='font-bold'>{workMap[worker.work] || "未分配"}</span>
                </div>
            </div>
            <div className='flex flex-row justify-between items-center'>
                <span className='text-sm xl:text-base'>{worker.email}</span>
                <span className='text-sm xl:text-base'>{worker.phone}</span>
            </div>
        </Card>
    )
}

export default WorkerCard