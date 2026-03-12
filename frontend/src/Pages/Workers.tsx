import React, { useEffect, useState } from 'react'
import { Title } from '../components/Typography'
import Filter from '../components/Filter'
import { Button } from '../components/Button'

// Types
import type { Worker } from '../types/types'

import WorkerCard from '../components/WorkerCard'
import { Link, useNavigate } from 'react-router-dom'


const Workers = () => {


    const [workers, setWorkers] = useState<Worker[]>([]);
    const fetchWorkers = async () => {
        console.log("fetching workers!")
        const response = await fetch('http://localhost:5000/api/users', {
            method: "GET"
        });
        const result = await response.json();
        console.log(result.data);
        setWorkers(result.data);
    }
    useEffect(() => {
        fetchWorkers()
    }, [])
    return (
        <div className='flex flex-col gap-5  lg:px-10'>
            <div className='flex flex-row justify-between w-full'>
                <Title>員工</Title>
                <Link to='/workers/new'>
                    <Button className='p-2 font-bold'>新增員工</Button>
                </Link>

            </div>
            <div className='flex flex-col gap-2 w-full'>
                <Filter></Filter>
                <div className='flex flex-col gap-1 w-full '>
                    {
                        workers.map((item, index) => {
                            return (
                                <Link key={index} to={`/workers/${item.id}`}>
                                    <WorkerCard worker={item} />
                                </Link>

                            )

                        })
                    }


                </div>
            </div>
        </div>
    )
}

export default Workers