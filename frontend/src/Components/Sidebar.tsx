import React from 'react'
import { ListItem } from './ListItem'
import { Title } from './Typography'

import IconHome from '../assets/icons/icon-home.png'
import IconProduct from '../assets/icons/icon-product.png'
import IconCart from '../assets/icons/icon-cart.png'
import IconStaffs from '../assets/icons/icon-staffs.png'
interface SidebarProps {
    className: string,
    handleClose: (value: boolean) => void
}
const Sidebar = ({ className, handleClose }: SidebarProps) => {
    const features = [
        'Dashboard',
        'Orders',
        'Products',
        'Staff',
        'Settings'
    ]
    return (
        <div className={`${className}  md:block flex flex-col  w-full h-full  md:w-[35%] bg-blue-900`}>
            <div className='flex flex-col justify-around w-full h-[25%] px-5'>
                <div onClick={() => handleClose(false)} className='md:hidden flex flex-row justify-end '>back</div>
                <Title className='flex flex-col justify-center w-full  text-white '>Commerce Manager</Title>
            </div>
            <ul className='flex flex-col  gap-8 w-full h-[75%] px-10 '>
                {
                    features.map((item, index) => {
                        return (
                            <ListItem className=' text-2xl text-white' key={index}>{item}</ListItem>
                        )
                    })
                }
            </ul>

        </div>
    )
}

export default Sidebar