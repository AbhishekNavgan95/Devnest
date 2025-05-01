import CategoriesSection from '@/components/home/CategoriesSection'
import FeaturesGrid from '@/components/home/FeaturesGrid'
import HeroSection from '@/components/home/HeroSection'
import InstructorInviteSection from '@/components/home/InstructorInviteSection'
import StepsSection from '@/components/home/StepsSection'
import TestimonialsSection from '@/components/home/TestimonialsSection'
import React from 'react'

const Home = () => {
  return (
    <div className=''>
      <header>
        <HeroSection />
      </header>

      <CategoriesSection />

      <StepsSection />

      {/************ pending ->  category wise courses *******************/}
      {/* <CourseGrid /> */}

      <FeaturesGrid />

      {/************ pending ->  Top instructors section *******************/}
      {/* <TopInstructors /> */}

      <TestimonialsSection />

      <InstructorInviteSection />

    </div>
  )
}

export default Home