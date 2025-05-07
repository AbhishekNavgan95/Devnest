import React from 'react'
import CourseCard from '../courses/CourseCard'
const AllCoursesGrid = ({
    data
}) => {
    return (
        <div>
            <h3 className='text-3xl font-medium border-b pb-6 border-dark-700'>All courses</h3>
            {
                data?.length > 0 ? (
                    <div className='mt-6 w-full grid md:grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4'>
                        {
                            data?.map((course, i) => (
                                <>
                                    <CourseCard course={course} key={i} />
                                </>
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