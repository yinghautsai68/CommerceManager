import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'

import IconHome from '../assets/icons/icon-home.png'
import IconProduct from '../assets/icons/icon-product.png'
import IconCart from '../assets/icons/icon-cart.png'
import IconStaffs from '../assets/icons/icon-staffs.png'
import { NavLink } from 'react-router-dom'
interface DashboardLayoutProps {
    children: React.ReactNode
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    const [showSidebar, setShowSidebar] = useState(false)

    return (
        <div className="flex flex-row w-full h-screen">


            <Sidebar handleClose={setShowSidebar} className={`fixed  z-50 transform ${showSidebar ? 'translate-x-0' : '-translate-x-full'} w-full h-screen  lg:w-[18%]   transition-transform duration-300 ease-in-out lg:translate-x-0 lg:relative lg:block`} />


            <div className='flex flex-col w-full h-full bg-white  '>
                <div className='w-full flex-1  px-2 pt-20 pb-20   overflow-y-scroll border'>
                    {children}
                </div>
                <div className='fixed lg:hidden left-0 bottom-0 flex flex-row justify-center items-center gap-6  w-full h-15 p-2 bg-blue-500'>
                    <NavLink to='/dashboard'><img src={IconHome} alt="" className='w-10 aspect-square ' /></NavLink>
                    <NavLink to='/products'><img src={IconProduct} alt="" className='w-10 aspect-square' /></NavLink>
                    <NavLink to='/orders'><img src={IconCart} alt="" className='w-10 aspect-square' /></NavLink>
                    <NavLink to='/workers'><img src={IconStaffs} alt="" className='w-10 aspect-square ' /></NavLink>
                </div>
            </div>

        </div >
    )
}

export default DashboardLayout