import React from 'react'
import { Card } from './Card'

const WorkerCard = () => {
    return (
        <Card className='px-3 pt-3'>
            <div className='flex flex-row justify-between items-end'>
                <div className='flex flex-col'>
                    <span className='translate-y-1 text-sm font-bold text-gray-500 '>員工編號</span>
                    <span className='font-bold text-gray-500'>#50500</span>
                </div>
                <div className='flex flex-col items-center'>
                    <span className='text-sm font-bold'>員工</span>
                    <span className='font-bold'>蔡英豪</span>
                </div>
                <div className='flex flex-col'>
                    <div className='px-1 bg-green-300'>
                        <span className=' text-sm text-white font-medium' >在職</span>
                    </div>
                    <span className='font-bold'>客服</span>
                </div>
            </div>
            <div className='flex flex-row justify-between items-center'>
                <span className='text-sm'>yinghautsai68@gmail.com</span>
                <span className='text-sm'>0903558589</span>
            </div>
        </Card>
    )
}

export default WorkerCard