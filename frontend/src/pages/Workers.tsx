import { useEffect, useState } from 'react'
import { Title } from '../components/Typography'
import Filter from '../components/Filter'
import { Button } from '../components/Button'

// Types
import type { Worker } from '../types/types'

import WorkerCard from '../components/WorkerCard'
import { Link, useSearchParams } from 'react-router-dom'

import { jwtDecode } from "jwt-decode";
const Workers = () => {
    const token = localStorage.getItem("token");
    let userRole = "";

    if (token) {
        const decoded: any = jwtDecode(token);
        userRole = decoded.role;
    }

    const [searchParams, setSearchParams] = useSearchParams();
    const role = searchParams.get("role") || "";
    const work = searchParams.get("work") || "";
    const status = searchParams.get("status") || "";
    const [totalPages, setTotalPages] = useState(0);
    const page = Number(searchParams.get("page")) || 0;
    const search = searchParams.get("search") || "";

    const workersFilters = [
        {
            name: "role",
            value: role,
            options: [
                { label: "角色", value: "" },
                { label: "管理員", value: "admin" },
                { label: "員工", value: "worker" },
            ]
        },
        {
            name: "work",
            value: work,
            options: [
                { label: "職位", value: "" },
                { label: "開發工程師", value: "developer" },
                { label: "客服", value: "desk" }
            ]
        },
        {
            name: "status",
            value: status,
            options: [
                { label: "狀態", value: "" },
                { label: "在職", value: "active" },
                { label: "離職", value: "inactive" },

            ]
        }
    ]

    const [workers, setWorkers] = useState<Worker[]>([]);
    const fetchWorkers = async () => {
        console.log("fetching workers!")
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users?search=${search}&page=${page}&role=${role}&work=${work}&status=${status}`, {
            method: "GET",

        });
        const result = await response.json();
        console.log(result.data);
        setWorkers(result.data);
        console.log(result.totalUsers);
        setTotalPages(Math.ceil(result.totalUsers / 10));

    }
    useEffect(() => {
        fetchWorkers()
    }, [searchParams])
    return (
        <div className='flex flex-col gap-5  lg:px-10'>
            <div className='flex flex-row justify-between w-full'>
                <Title>員工</Title>
                {
                    userRole === "admin" &&
                    <Link to='/workers/new'>
                        <Button className='p-2 font-bold'>新增員工</Button>
                    </Link>
                }


            </div>
            <div className='flex flex-col gap-2 w-full'>
                <Filter
                    page={page}
                    search={search}
                    filters={workersFilters}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    totalPages={totalPages}
                />
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