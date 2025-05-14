import CourseGrid from '@/components/myCourses/CourseGrid'
import { api } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

const fetchCourses = async () => {
  const response = await api.get('/course/getInstructorCourses')
  return response.data
}

const MyCourses = () => {

  const { data, isPending } = useQuery({
    queryFn: fetchCourses,
    queryKey: ['my-courses']
  })

  // console.log("data : ", data?.data)
  const totalStudents = data?.data?.reduce((acc, course) => {
    return acc + course?.studentsEnrolled?.length
  }, 0)

  return (
    <div className='w-full min-h-screen'>

      <div className='flex flex-col md:flex-row gap-y-2 justify-between gap-x-4 w-full items-center rounded-md bg-white border px-2 py-2 border-dark-600'>

        <h4 className='text-xl font-medium ml-4'>My Courses</h4>

        <div className='flex justify-center gap-x-4 items-center'>

          <div className='py-1 md:py-2 px-4 md:px-8 border border-dark-600 bg-second-100 rounded-md flex justify-center items-center gap-x-2'>
            <p className='text-2xl font-bold text-main-400'>
              {
                data?.data?.length
              }
            </p>
            <span className='text-sm'>
              Courses
            </span>
          </div>

          <div className='py-1 md:py-2 px-4 md:px-8 border border-dark-600 bg-second-100 rounded-md flex justify-center items-center gap-x-2'>
            <p className='text-2xl font-bold text-main-400'>
              {
                totalStudents
              }
            </p>
            <span className='text-sm'>
              Students
            </span>
          </div>
        </div>

      </div>

      <CourseGrid isPending={isPending} data={data?.data} />

    </div>
  )
}

export default MyCourses