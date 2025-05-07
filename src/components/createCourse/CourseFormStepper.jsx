import { useCourseFormStore } from '@/stores/useCourseFormStore'
import React from 'react'

const CourseFormStepper = () => {

    const { step } = useCourseFormStore();

    return (
        <div className='flex items-center justify-between mb-8 w-full px-2 lg:px-8'>

            <div className={`${step >= 1 ? "bg-main-400 text-dark-50" : ""} border border-dark-700 px-2 lg:px-4 text-nowrap rounded-md py-1 lg:py-2`}>
                <span className='hidden md:flex flex-col items-center'>
                    <p>Course Details</p>
                </span>
                <span className='md:hidden block'>1</span>
            </div>

            <div className={`w-full h-[1px] border border-dashed ${step >= 2 ? "border-main-400" : "border-dark-600"}`}></div>

            <div className={`${step >= 2 ? "bg-main-400 text-dark-50" : ""} border border-dark-700 px-2 lg:px-4 text-nowrap rounded-md py-1 lg:py-2`}>
                <span className='hidden md:block'>Course Content</span>
                <span className='md:hidden block'>2</span>
            </div>

            <div className={`w-full h-[1px] border border-dashed ${step >= 3 ? "border-main-400" : "border-dark-600"}`}></div>

            <div className={`${step >= 3 ? "bg-main-400 text-dark-50" : ""} border border-dark-700 px-2 lg:px-4 text-nowrap rounded-md py-1 lg:py-2`}>
                <span className='hidden md:block'>Course Status</span>
                <span className='md:hidden block'>3</span>
            </div>

        </div>
    )
}

export default CourseFormStepper