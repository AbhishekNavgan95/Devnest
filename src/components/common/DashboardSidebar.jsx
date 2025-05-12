import { useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import logo from '../../assets/logo/logo.png'
import { commonDashboardRoutes, userRoutes } from '@/lib/data'
import { useUserStore } from '@/stores/useUserStore'
import { Link, NavLink } from 'react-router-dom'
import { MdLogout } from "react-icons/md";
import axios from 'axios'
import { BASE_API_URL } from '@/lib/utils'
import { useToast } from '@/hooks/use-toast'
import ConfirmationModal from './ConfirmationModal'
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { motion, AnimatePresence } from 'framer-motion'
import { IoMdClose } from "react-icons/io";

const DashboardSidebar = () => {
    const { user, logout: logoutUser } = useUserStore();
    const [confirmationModal, setConfirmationModal] = useState(false)
    const [mobileNavOpen, setMobileNavOpen] = useState(false)
    const { toast } = useToast();
    const navigate = useNavigate();

    const logout = async () => {
        try {
            await axios.post(BASE_API_URL + '/auth/logout')
            toast({
                title: "Logged out successfully",
                description: "You have been logged out successfully"
            })
            logoutUser()
            navigate('/')
        } catch (error) {
            toast({
                title: "Error logging out",
                description: "There was an error logging out. Please try again later.",
                variant: "destructive"
            })
        }
    }

    const renderLinks = () => (
        <>
            {
                userRoutes[user?.accountType]?.map((route, index) => (
                    <NavLink
                        key={index}
                        to={route.route}
                        className={({ isActive }) =>
                            `${isActive ? 'bg-dark-300 border-dark-600' : "border-transparent"} border text-black rounded-md font-medium py-2 px-4 flex gap-x-4 items-center text-sm md:text-base`
                        }
                    >
                        <route.icon className='text-base' />
                        {route?.title}
                    </NavLink>
                ))
            }

            <div className='w-full hidden lg:block my-2 h-[1px] bg-dark-400'></div>

            <div className='hidden lg:block '>
                {
                    commonDashboardRoutes?.map((route, index) => (
                        <NavLink
                            key={index}
                            to={route.route}
                            className={({ isActive }) =>
                                `${isActive ? 'bg-dark-300 border-dark-600' : "border-transparent"} border text-black rounded-md font-medium py-2 px-4 flex gap-x-4 items-center text-base`
                            }
                        >
                            <route.icon className='text-base' />
                            {route?.title}
                        </NavLink>
                    ))
                }
            </div>

            <div className='w-full my-2 h-[1px] bg-dark-400'></div>

            <button onClick={() => setConfirmationModal(true)} className='text-black rounded-md font-medium py-2 px-4 flex gap-x-4 items-center text-sm md:text-base'>
                <MdLogout />
                <span className='text-start'>Logout</span>
            </button>

            {
                confirmationModal && (
                    <ConfirmationModal
                        onClose={() => setConfirmationModal(false)}
                        onConfirm={logout}
                        heading='Are you sure you want to logout?'
                        subheading="You will be logged out of your account and will have to login again."
                    />
                )
            }
        </>
    )

    return (
        <>
            {/* Desktop Sidebar */}
            <div className='px-4 hidden lg:block py-4 h-screen bg-white border-r border-dark-400 min-w-[280px]'>
                <Link to='/' className='my-4 mb-8 flex justify-center'>
                    <img src={logo} className='w-[180px]' alt="Logo" />
                </Link>
                <div className='flex flex-col gap-y-2'>
                    {renderLinks()}
                </div>
            </div>

            {/* Mobile Navbar Top Bar */}
            <div className='flex lg:hidden items-center justify-between px-4 py-4 border-b border-dark-700'>
                <Link to='/' className='flex justify-center'>
                    <img src={logo} className='w-[100px]' alt="Logo" />
                </Link>
                <button onClick={() => setMobileNavOpen(!mobileNavOpen)} className='text-xl'>
                    <AiOutlineMenuUnfold />
                </button>
            </div>

            {/* Mobile Nav with Framer Motion */}
            <AnimatePresence>
                {mobileNavOpen && (
                    <motion.div
                        className='fixed lg:hidden inset-0 z-50 bg-black/40'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setMobileNavOpen(false)}
                    >
                        <motion.div
                            className='w-[240px] bg-white h-screen py-6 px-4'
                            initial={{ x: -300 }}
                            animate={{ x: 0 }}
                            exit={{ x: -300 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className='flex flex-col gap-y-2'>
                                <div className='flex mb-4 justify-between'>
                                    <img src={logo} className='w-[100px]' alt="Logo" />
                                    <button onClick={() => setMobileNavOpen(!mobileNavOpen)} className='text-xl px-4'><IoMdClose /></button>
                                </div>
                                {renderLinks()}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

export default DashboardSidebar
