import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'

interface DashboardLayoutProps {
    children: React.ReactNode
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    const [showSidebar, setShowSidebar] = useState(false)

    return (
        <div className="flex flex-row w-full h-full">


            <Sidebar handleClose={setShowSidebar} className={`absolute z-50 transform ${showSidebar ? 'translate-x-0' : '-translate-x-full'}  transition-transform duration-300 ease-in-out md:translate-x-0 md:relative md:block`} />
            <div className='hidden absolute flex flex-row bg-blue-500 w-full h-[60px]'>
                <div onClick={() => setShowSidebar(!showSidebar)} className='w-15 aspect-square bg-green-500 z-15'>

                </div>
            </div>


            <div className=' w-full min-h-screen bg-white px-2 pt-20 pb-20 '>
                {children}
                <div className='fixed left-0 bottom-0 flex flex-row justify-center items-center gap-2 w-full p-2 bg-blue-500'>
                    <div className='w-10 aspect-square border'></div>
                    <div className='w-10 aspect-square border'></div>
                    <div className='w-10 aspect-square border'></div>
                    <div className='w-10 aspect-square border'></div>
                    <div className='w-10 aspect-square border'></div>
                </div>
            </div>

        </div >
    )
}

export default DashboardLayout