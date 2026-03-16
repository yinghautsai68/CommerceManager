import { useState } from 'react'


import IconNext from '../assets/icons/icon-next.png'
import IconPrev from '../assets/icons/icon-prev.png'
import PageNumber from './PageNumber'


interface FilterOption {
    label: string,
    value: string
}
interface FilterItem {
    name: string,
    value: string,
    options: FilterOption[]
}

interface FilterProps {
    filters?: FilterItem[]

    totalPages: number,
    page: number,
    search: string,
    searchParams: URLSearchParams,
    setSearchParams: (params: Record<string, string>) => void;
}
const Filter = ({ filters = [], totalPages, page, search, searchParams, setSearchParams }: FilterProps) => {
    const [localSearch, setLocalSearch] = useState<string>(search);
    return (
        <div className='flex flex-col    gap-1 w-full  '>
            <div className='flex flex-row justify-between lg:justify-start items-center gap-1'>
                {
                    filters.map((item, index) => {
                        return (
                            <select
                                key={index}
                                value={item.value}
                                onChange={(e) => setSearchParams({
                                    ...Object.fromEntries([...searchParams]), [item.name]: e.target.value, page: '1'
                                })
                                }
                                className='w-full lg:w-[20%] pl-2 py-1 border rounded-lg'
                            >

                                {
                                    item.options.map((option, index) => {
                                        return (
                                            <option key={index} value={option.value}>{option.label}</option>
                                        );
                                    })
                                }
                            </select>
                        )
                    }
                    )
                }

                <input type="text" placeholder='Search' value={localSearch} onChange={(e) => setLocalSearch(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { setSearchParams({ ...Object.fromEntries([...searchParams]), search: localSearch }) } }} className='w-full lg:w-[40%] pl-3 py-1 border rounded-lg' />
            </div>

            {/*Pagination*/}
            <div className='flex flex-row md:inline-flex md:self-start   border rounded-xl'>
                <img
                    onClick={() => setSearchParams({ ...Object.fromEntries([...searchParams]), page: String(Math.max(1, page - 1)), limit: String(10) })}
                    src={IconPrev}
                    alt="" className=' w-10 h-10 p-3 rounded-tl-xl rounded-bl-xl  hover:bg-gray-300 transition-all'
                />

                {
                    Array.from({ length: totalPages }, (_, i) => i + 1).map((item, index) => {
                        return (
                            <PageNumber
                                onClick={() => setSearchParams({ ...Object.fromEntries([...searchParams]), page: String(item), limit: String(10) })}
                                active={item === page}
                            >
                                {item}
                            </PageNumber>
                        )
                    })
                }
                <img
                    onClick={() => setSearchParams({ ...Object.fromEntries([...searchParams]), page: String(Math.min(totalPages, page + 1)) })}
                    src={IconNext}
                    alt=""
                    className='flex flex-row justify-center items-center w-10 h-10 p-3 rounded-tr-xl rounded-br-xl    hover:bg-gray-300 transition-all'
                />
            </div>
        </div >

    )
}

export default Filter