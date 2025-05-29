import React from 'react'
import CourseCard from '../courses/CourseCard'
const AllCoursesGrid = ({
    data
}) => {
    return (
        <div>
            <h3 className='text-xl md:text-3xl font-medium border-b pb-4 md:pb-6 border-dark-700'>All courses</h3>
            {
                data?.length > 0 ? (
                    <div className='md:mt-6 mt-4 w-full grid md:grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4'>
                        {
                            data?.map((course, i) => (
                                <CourseCard course={course} key={course?._id + i} />
                            ))
                        }
                    </div>
                ) : <div className='flex items-center justify-center h-[200px]'>
                    <span>No courses found</span>
                </div>
            }
        </div>
    )
}

export default AllCoursesGrid