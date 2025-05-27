import React from 'react'
import { MdCurrencyRupee } from "react-icons/md";
import { MdOutlineVideoCameraBack } from "react-icons/md";
import { PiStudentDuotone } from "react-icons/pi";
import { MdOutlineRateReview } from "react-icons/md";

const StatsCards = ({
    data
}) => {

    return (
        // <div className='bg-white grid grid-cols-2 border rounded-xl shadow-sm shadow-dark-400 border-dark-600'>
        <div className='grid grid-cols-2 gap-4'>
            <div className='p-8 space-y-3 flex flex-col items-start justify-center bg-white border border-dark-600 shadow-sm shadow-dark-400 '>
                <p className='text-4xl flex items-center gap-x-2 font-semibold text-start text-main-400'>
                    <MdCurrencyRupee />
                </p>
                <p className='text-xs font-medium text-dark-800'>Total Revenue</p>
                <p className='text-2xl font-semibold text-dark-800'>
                    {((data?.totalRevenue || 0) / 100).toFixed(2)}
                </p>
            </div>
            <div className=' p-8 space-y-3 flex flex-col items-start justify-center bg-white border border-dark-600 shadow-sm shadow-dark-400 '>
                <p className='text-4xl flex items-center gap-x-2 font-semibold text-start text-main-400'>
                    <MdOutlineVideoCameraBack />
                </p>
                <p className='text-xs font-medium text-dark-800'>Total Courses</p>
                <p className='text-2xl font-semibold text-dark-800'>
                    {data?.totalCourses}
                </p>
            </div>
            <div className=' p-8 space-y-3 flex flex-col items-start justify-center bg-white border border-dark-600 shadow-sm shadow-dark-400 '>
                <p className='text-4xl flex items-center gap-x-2 font-semibold text-start text-main-400'>
                    <PiStudentDuotone />
                </p>
                <p className='text-xs font-medium text-dark-800'>Total Learners</p>
                <p className='text-2xl font-semibold text-dark-800'>
                    {data?.totalStudents}
                </p>
            </div>
            <div className=' p-8 space-y-3 flex flex-col items-start justify-center bg-white border border-dark-600 shadow-sm shadow-dark-400 '>
                <p className='text-4xl flex items-center gap-x-2 font-semibold text-start text-main-400'>
                    <MdOutlineRateReview />
                </p>
                <p className='text-xs font-medium text-dark-800'>Total Revenue</p>
                <p className='text-2xl font-semibold text-dark-800'>
                    {data?.totalReviews}
                </p>
            </div>
        </div>
    )
}

export default StatsCards