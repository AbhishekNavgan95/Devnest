import React from 'react'
import { MdCurrencyRupee } from "react-icons/md";
import { MdOutlineVideoCameraBack } from "react-icons/md";
import { PiStudentDuotone } from "react-icons/pi";
import { MdOutlineRateReview } from "react-icons/md";

const StatsCards = ({
    data
}) => {

    return (
        <div className='bg-white grid grid-cols-2 border rounded-xl shadow-sm shadow-dark-400 border-dark-600'>
            <div className='p-6 space-y-3 flex flex-col items-center justify-center border-b border-r border-dark-600'>
                <p className='text-sm font-medium text-dark-800'>Total Revenue</p>
                <p className='text-2xl flex items-center gap-x-2 font-semibold text-start text-main-400'>
                    <MdCurrencyRupee />
                    {((data?.totalRevenue || 0) / 100).toFixed(2)}
                </p>
            </div>
            <div className=' p-6 space-y-3 flex flex-col items-center justify-center border-b border-dark-600'>
                <p className='text-sm font-medium text-dark-800'>Total Courses</p>
                <p className='text-2xl flex items-center gap-x-2 font-semibold text-start text-main-400'>
                    <MdOutlineVideoCameraBack />
                    {data?.totalCourses}
                </p>
            </div>
            <div className=' p-6 space-y-3 flex flex-col items-center justify-center border-r border-dark-600'>
                <p className='text-sm font-medium text-dark-800'>Total Learners</p>
                <p className='text-2xl flex items-center gap-x-2 font-semibold text-start text-main-400'>
                    <PiStudentDuotone />
                    {data?.totalStudents}
                </p>
            </div>
            <div className=' p-6 space-y-3 flex flex-col items-center justify-center'>
                <p className='text-sm font-medium text-dark-800'>Total Revenue</p>
                <p className='text-2xl flex items-center gap-x-2 font-semibold text-start text-main-400'>
                    <MdOutlineRateReview />
                    {data?.totalReviews}
                </p>
            </div>
        </div>
    )
}

export default StatsCards