import ContactUsSection from '@/components/about/ContactUsSection'
import HeaderSection from '@/components/about/HeaderSection'
import OurGoals from '@/components/about/OurGoals'
import Reviews from '@/components/about/Reviews'
import SocialProofSection from '@/components/about/SocialProofSection'
import StorySection from '@/components/about/StorySection'
import React from 'react'

const AboutUs = () => {
    return (
        <div className=''>

            <header>
                <HeaderSection />
            </header>

            <StorySection />

            <OurGoals />

            <SocialProofSection />

            <Reviews />

            <ContactUsSection />

        </div>
    )
}

export default AboutUs