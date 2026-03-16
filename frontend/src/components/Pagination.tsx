import React from 'react'


import IconNext from '../assets/icons/icon-next.png'
import IconPrev from '../assets/icons/icon-prev.png'
import PageNumber from './PageNumber'
const Pagination = () => {
    return (
        <div className='grid grid-cols-7 w-[40%] md:w-[30%] xl:w-[20%]  border rounded-xl overflow-hidden'>
            <div className='flex flex-row justify-center items-center  w-full h-full p-3   hover:bg-gray-300 transition-all'><img src={IconPrev} alt="" /></div>
            <PageNumber>1</PageNumber>
            <PageNumber>2</PageNumber>
            <PageNumber>3</PageNumber>
            <PageNumber>4</PageNumber>
            <PageNumber>10</PageNumber>
            <div className='flex flex-row justify-center items-center  w-full h-full p-3    hover:bg-gray-300 transition-all'><img src={IconNext} alt="" /></div>
        </div>
    )
}

export default Pagination