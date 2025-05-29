import CategoriesSection from '@/components/home/CategoriesSection'
import FeaturesGrid from '@/components/home/FeaturesGrid'
import HeroSection from '@/components/home/HeroSection'
import InstructorInviteSection from '@/components/home/InstructorInviteSection'
import StepsSection from '@/components/home/StepsSection'
import TestimonialsSection from '@/components/home/TestimonialsSection'
import TrendingCourses from '@/components/home/TrendingCourses'
import { BASE_URL } from '@/lib/utils'
import { useUserStore } from '@/stores/useUserStore'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useEffect } from 'react'

const getCourses = async () => {

  const response = await axios.get(BASE_URL + '/api/v1/course/getTrendingCourses')
  return response?.data
}

const Home = () => {

  const { user } = useUserStore();
  // console.log("user : ", user)
  const { data, isPending, inError } = useQuery({
    queryKey: ['courses'],
    queryFn: getCourses,
  })

  // http://localhost:5173/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5hdmdhbmFiaGlzaGVrOTBAZ21haWwuY29tIiwiaWF0IjoxNzQ2MjU4NTc3LCJleHAiOjE3NDYyNjIxNzd9.5GxqathTQQHHfQa8xeIoKfcurbyVAUCCfdfx2H9N7LU

  if (!isPending) {
    // console.log("data : ", data)
  }


  useEffect(() => {
    document.title = 'DevNest - Home'
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className=''>
      <header>
        <HeroSection />
      </header>

      <CategoriesSection />

      <StepsSection />

      <TrendingCourses />

      <FeaturesGrid />

      {/************ pending ->  Top instructors section *******************/}
      {/* <TopInstructors /> */}

      <TestimonialsSection />

      <InstructorInviteSection />

    </div>
  )
}

export default Home