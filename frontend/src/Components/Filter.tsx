import React from 'react'
import Pagination from './Pagination'

const Filter = () => {
    return (
        <div className='flex flex-col gap-1'>
            <div className='flex flex-row justify-between items-center gap-1'>
                <select className='w-full pl-2 py-1 border rounded-lg'>
                    <option value="Pending"  >已付款</option>
                    <option value="Pending" >未付款</option>
                    <option value="Pending" >退款</option>
                    <option value="Pending" >未出貨</option>
                    <option value="Pending" >已出貨</option>
                    <option value="Pending" >已送達</option>

                </select>
                <input type="text" placeholder='Search' className='w-full pl-3 py-1 border rounded-lg' />
            </div>
            <Pagination />
        </div>

    )
}

export default Filter