import React from 'react'

import Sony from '../assets/sony_wh1000xm4.jpg'
const OrdersProductCard = () => {
    return (
        <div className='flex flex-row items-center justify-between gap-2 py-1 border-b border-gray-300 '>
            <img src={Sony} alt="" className='w-[20%] aspect-square border border-gray-300 rounded-lg' />
            <div className=' flex flex-col gap-1 w-[75%] h-full  '>
                <div className='flex flex-col'>
                    <span className="translate-y-1 w-[100%] text-md font-medium truncate ">
                        Hypersonic Headphones Wireless Pro
                    </span>
                    <div className=' flex flex-row justify-between items-center'>
                        <span className='text-sm text-gray-500'>#50050</span>
                        <span className='text-sm'>NT$ 1500 x1</span>
                    </div>
                </div>
                <span className='block w-full text-right text-sm' >NT$ 1500</span>
            </div>
        </div>
    )
}

export default OrdersProductCard