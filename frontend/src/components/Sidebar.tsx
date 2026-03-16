import React from 'react'
import { ListItem } from './ListItem'
import { Title } from './Typography'

import IconHome from '../assets/icons/icon-home.png'
import IconProduct from '../assets/icons/icon-product.png'
import IconCart from '../assets/icons/icon-cart.png'
import IconStaffs from '../assets/icons/icon-staffs.png'

import IconHomeBLue from '../assets/icons/icon-home-blue.png'
import IconProductBlue from '../assets/icons/icon-product-blue.png'
import IconCartBlue from '../assets/icons/icon-cart-blue.png'
import IconStaffsBlue from '../assets/icons/icon-staffs-blue.png'

import { NavLink } from 'react-router-dom'
interface SidebarProps {
    className: string,
    handleClose: (value: boolean) => void
}
const Sidebar = ({ className, handleClose }: SidebarProps) => {
    const sidebarItems = [
        {
            to: '/dashboard',
            label: '儀錶板',
            image_url: IconHome,
            image_active: IconHomeBLue
        },
        {
            to: '/products',
            label: '商品',
            image_url: IconProduct,
            image_active: IconProductBlue
        },
        {
            to: '/orders',
            label: '訂單',
            image_url: IconCart,
            image_active: IconCartBlue
        },
        {
            to: '/workers',
            label: '員工',
            image_url: IconStaffs,
            image_active: IconStaffsBlue
        },
    ]
    return (
        <div className={`${className} flex flex-col   bg-blue-500`}>
            <div className='flex flex-col justify-around w-full h-[15%] px-5'>
                <div onClick={() => handleClose(false)} className='md:hidden flex flex-row justify-end '>back</div>
                <Title className='flex flex-col justify-center w-full lg:text-xl  text-white '>CMANAGER</Title>
            </div>
            <ul className='flex flex-col  gap-2 w-full h-[85%] px-5 '>
                {
                    sidebarItems.map((item, index) => {
                        return (
                            <NavLink to={item.to} className={({ isActive }) => `${isActive ? 'bg-white text-blue-950' : 'text-white hover:bg-gray-100/20 transition-all'} px-2 py-2 rounded-xl`}>
                                {
                                    ({ isActive }) => {
                                        return (
                                            <ListItem isActive={isActive} className={``} item={item} key={index} />
                                        )

                                    }
                                }

                            </NavLink>

                        )
                    })
                }
            </ul>

        </div>
    )
}

export default Sidebar