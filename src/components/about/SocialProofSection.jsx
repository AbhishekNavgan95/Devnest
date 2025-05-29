import React from 'react'
import Container from '../common/Container'
import hands from '../../assets/images/aboutSocialSection.png'
import Fill from '../../assets/images/Fill.png'

const SocialProofSection = () => {
    return (
        <div className='w-full bg-second-100'>
            <Container>
                <div className='py-24 px-4 md:px-14 flex flex-col'>
                    <div className='flex flex-col-reverse lg:flex-row gap-y-4 items-start'>
                        <div className=''>
                            <h4 className='text-2xl lg:text-5xl font-medium mb-4 leading-snug'>
                                Launching Careers, Building Projects, Growing Communities
                            </h4>
                            <p className='text-sm lg:text-xl'>
                                - That's Devnest.
                            </p>
                        </div>
                        <img className='w-[150px] md:w-[200px] lg:w-auto' src={hands} alt="" />
                    </div>

                    <div className='relative z-[2] mt-8 w-max lg:self-end '>
                        <div className='flex flex-col md:flex-row bg-white px-12 py-6 border border-dark-700 rounded-xl items-start gap-y-4 md:items-center gap-x-20 relative z-[2]'>
                            <div>
                                <h5 className='text-2xl md:text-5xl font-semibold text-main-400'>5000+</h5>
                                <p className='mt-2 text-sm md:text-base text-dark-950'>Mentorship hours</p>
                            </div>
                            <div>
                                <h5 className='text-2xl md:text-5xl font-semibold text-main-400'>100+</h5>
                                <p className='mt-2 text-sm md:text-base text-dark-950'>Mentors Onboarded</p>
                            </div>
                            <div>
                                <h5 className='text-2xl md:text-5xl font-semibold text-main-400'>15000+</h5>
                                <p className='mt-2 text-sm md:text-base text-dark-950'>Community Members</p>
                            </div>
                        </div>
                        <img className='absolute hidden md:block z-[1] -top-[50%] left-[-10%]' src={Fill} alt="" />
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default SocialProofSection