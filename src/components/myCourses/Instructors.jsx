import React from 'react'
import InstructorCard from './InstructorCard'

const Instructors = ({
    data
}) => {

    return (
        <div>
            <h3 className='text-3xl font-medium border-b pb-6 border-dark-700'>Instructors </h3>
            <div className='mt-6'>
                {
                    data?.length > 0 ? (
                        <div className='grid lg:grid-cols-3 gap-4 md:grid-cols-2 grid-cols-1 '>
                            {
                                data?.map((instructor) => (
                                    <InstructorCard data={instructor} key={instructor?._id} />
                                ))
                            }
                        </div>
                    ) : (
                        <div className='flex items-center justify-center h-[200px]'>
                            <span>No Instructors found</span>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Instructors