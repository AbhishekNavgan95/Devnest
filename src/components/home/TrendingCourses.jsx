import React from 'react'
import Container from '../common/Container'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/utils'
import CourseCard from '../courses/CourseCard'

const fetchTrendingCourses = async () => {
    const response = await api.get('/course/getTopSellingCourses');
    return response?.data
}

const TrendingCourses = () => {

    const { data, isPending } = useQuery({
        queryKey: ['courses'],
        queryFn: fetchTrendingCourses,
    })

    return (
        <div className='mb-14'>
            <Container>
                <div className=''>
                    <h3 className='text-2xl md:text-3xl lg:text-4xl font-medium mb-8'>Currently trending on <span className='text-main-400'>Devnest</span></h3>

                    {isPending ? <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
                        {
                            Array.from({ length: 4 }).map((_, index) => (
                                <div key={index} className='w-full h-[340px] bg-dark-300 animate-pulse rounded-md'></div>
                            ))
                        }
                    </div>
                        : <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
                            {
                                data?.data?.map((course, index) => (
                                    <CourseCard key={course?._id} course={course} />
                                ))
                            }
                        </div>
                    }

                </div>
            </Container>
        </div>
    )
}

export default TrendingCourses