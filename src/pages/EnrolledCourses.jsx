import CourseCard from '@/components/enrolled-courses/CourseCard';
import { Button } from '@/components/ui/button';
import { useUserStore } from '@/stores/useUserStore'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

const EnrolledCourses = () => {

  const { user } = useUserStore()
  const navigate = useNavigate();
  const courses = user?.courses || [];
  // console.log("user : ", user)
  // console.log("courses : ", courses)

  return (
    <div>
      <h2 className='text-xl xl:text-2xl font-medium mb-4 md:mb-8'>My Courses</h2>

      {
        courses.length === 0 ? (
          <div className='w-full bg-white border border-dark-400 rounded-md min-h-[540px] flex justify-center items-center'>
            <div className='flex flex-col items-center gap-y-2'>
              <h5 className='text-lg text-dark-700'>No courses found</h5>
              <Link to='/courses'>
                <Button>
                  Explore courses
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center gap-4 w-full relative'>
            {
              courses?.map((course) => (
                <CourseCard course={course} key={course._id} />
              ))
            }
          </div>
        )
      }
    </div>
  )
}

export default EnrolledCourses