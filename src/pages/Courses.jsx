
import Container from '@/components/common/Container'
import RecentCourses from '@/components/courses/RecentCourses'
import TopRatedCourses from '@/components/courses/TopRatedCourses'
import AllCoursesGrid from '@/components/myCourses/AllCoursesGrid'
import Instructors from '@/components/myCourses/Instructors'
import RelatedTopics from '@/components/myCourses/RelatedTopics'
import CoursesSkeletonLoader from '@/components/skeletons/CoursesSkeletonLoader'
import { api } from '@/lib/utils'
import { useCategoryStore } from '@/stores/useCategoryStore'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const fetchTopicCourse = async (topicId) => {
    const res = await api.get('/course/getTopicPageDetails/' + topicId)
    return res.data
}

const Courses = () => {

    const { category, topic } = useParams();
    const { categories } = useCategoryStore();

    const currentCategory = categories?.filter((cat) => cat?._id === category)[0]

    const { data, isPending } = useQuery({
        queryKey: ['topic', topic],
        queryFn: () => fetchTopicCourse(topic)
    })

    // console.log("data : ", data)

    if (isPending) {
        return (
            <CoursesSkeletonLoader />
        )
    }

    return (
        <div className='py-14'>
            <Container>
                <div >
                    <TopRatedCourses data={data?.data?.topRatedCourses} />
                </div>
                <div className='mt-14'>
                    <RecentCourses data={data?.data?.recentCourses} />
                </div>

                <div className='mt-14'>
                    <AllCoursesGrid data={data?.data?.allCourses} />
                </div>

                <div className='mt-14'>
                    <Instructors data={data?.data?.instructorsWithSameNiche} />
                </div>

                <div className='mt-14'>
                    <RelatedTopics data={currentCategory?.topics} />
                </div>

            </Container>
        </div>
    )
}

export default Courses