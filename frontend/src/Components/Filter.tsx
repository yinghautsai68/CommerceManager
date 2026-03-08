import React from 'react'

const Filter = () => {
    return (
        <div className='flex flex-col'>
            <div className='flex flex-row justify-between items-center'>
                <select className='flex-1 pl-2 py-1 border rounded-lg'>
                    <option value="Pending" selected>Pending</option>
                    <option value="Pending" disabled>Pending</option>
                </select>
                <input type="text" placeholder='Search' className='flex-1 pl-3 py-1 border rounded-lg' />
            </div>
            <div className='grid grid-cols-7 w-full border'>
                <div className=' aspect-square bg-green-500'></div>
                <div className=' aspect-square bg-green-200'></div>
                <div className=' aspect-square bg-green-200'></div>
                <div className='aspect-square bg-green-200'></div>
                <div className=' aspect-square bg-green-200'></div>
                <div className=' aspect-square bg-green-500'></div>
            </div>
        </div>

    )
}

export default Filter