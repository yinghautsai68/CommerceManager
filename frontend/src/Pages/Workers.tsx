import React from 'react'
import { Title } from '../components/Typography'
import Filter from '../components/Filter'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import WorkerCard from '../components/WorkerCard'

const Workers = () => {
    return (
        <div className='flex flex-col gap-5'>
            <div className='flex flex-row justify-between '>
                <Title>員工</Title>
                <Button>新增員工</Button>
            </div>
            <div className='flex flex-col gap-2'>
                <Filter></Filter>
                <div className='flex flex-col gap-1'>
                    <WorkerCard></WorkerCard>
                    <WorkerCard></WorkerCard>
                    <WorkerCard></WorkerCard>
                    <WorkerCard></WorkerCard>
                    <WorkerCard></WorkerCard>
                </div>
            </div>
        </div>
    )
}

export default Workers