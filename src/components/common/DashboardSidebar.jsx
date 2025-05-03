import React from 'react'
import logo from '@/assets/logo/logo.png'
import { commonDashboardRoutes, userRoutes } from '@/lib/data'
import { useUserStore } from '@/stores/useUserStore'
import { Link, NavLink } from 'react-router-dom'
import { MdLogout } from "react-icons/md";

const DashboardSidebar = () => {

    const { user } = useUserStore();
    console.log("user : ", user)

    return (
        <div className='px-4 py-4 h-screen border-r border-dark-400 min-w-[280px]'>
            <Link to={'/'} className='my-4 mb-8 flex justify-center'>
                <img src={logo} className='w-[180px]' alt="" />
            </Link>
            <div className='flex flex-col gap-y-2'>
                {
                    userRoutes[user?.accountType].map((route, index) => (

                        <NavLink className={({ isActive }) => `${isActive ? 'bg-dark-300 border-dark-600' : "border-transparent"} border  text-black rounded-md font-medium py-2 px-4 flex gap-x-4 items-center text-base`} to={route.route} key={index}>
                            <route.icon className='text-base' />
                            {
                                route?.title
                            }
                        </NavLink>
                    ))
                }

                <div className='w-[100%] my-2 mx-auto h-[1px] bg-dark-400'></div>

                {
                    commonDashboardRoutes.map((route, index) => (

                        <NavLink className={({ isActive }) => `${isActive ? 'bg-dark-300 border-dark-600' : "border-transparent"} border text-black rounded-md font-medium py-2 px-4 flex gap-x-4 items-center text-base`} to={route.route} key={index}>
                            <route.icon className='text-base' />
                            {
                                route?.title
                            }
                        </NavLink>
                    ))
                }

                <div className='w-[100%] my-2 mx-auto h-[1px] bg-dark-400'></div>

                <div className='text-black rounded-md font-medium py-2 px-4 flex gap-x-4 items-center text-base'>
                    <MdLogout />
                    <button className='text-start'>Logout</button>
                </div>

            </div >
        </div >
    )
}

export default DashboardSidebar