import React from 'react'
import { Card } from './Card'

const WorkerCard = () => {
    return (
        <Card className='px-3 pt-5'>
            <div className='flex flex-row justify-between items-end'>
                <div className='flex flex-col'>
                    <span>員工編號</span>
                    <span>#50500</span>
                </div>
                <div className='flex flex-col'>
                    <span>管理員</span>
                    <span>蔡英豪</span>
                </div>
                <div className='flex flex-col'>
                    <span>在職</span>
                    <span>客服</span>
                </div>
            </div>
            <div className='flex flex-row justify-between items-center'>
                <span>yinghautsai68@gmail.com</span>
                <span>0903558589</span>
            </div>
        </Card>
    )
}

export default WorkerCard