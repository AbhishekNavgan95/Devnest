import React from 'react'
import Container from '../common/Container'
import hands from '@/assets/images/aboutSocialSection.png'
import Fill from '@/assets/images/Fill.png'

const SocialProofSection = () => {
    return (
        <div className='w-full bg-second-100'>
            <Container>
                <div className='py-24 px-14 flex flex-col'>
                    <div className='flex items-start'>
                        <div className=''>
                            <h4 className='text-5xl font-medium mb-4 leading-snug'>
                                Launching Careers, Building Projects, Growing Communities
                            </h4>
                            <p className='text-xl'>
                                - That's Devnest.
                            </p>
                        </div>
                        <img src={hands} alt="" />
                    </div>

                    <div className='relative z-[2] mt-8 w-max self-end '>
                        <div className='flex bg-white px-12 py-6 border border-dark-700 rounded-xl items-center gap-x-20 relative z-[2]'>
                            <div>
                                <h5 className='text-5xl font-semibold text-main-400'>5000+</h5>
                                <p className='mt-2 text-dark-950'>Mentorship hours</p>
                            </div>
                            <div>
                                <h5 className='text-5xl font-semibold text-main-400'>100+</h5>
                                <p className='mt-2 text-dark-950'>Mentors Onboarded</p>
                            </div>
                            <div>
                                <h5 className='text-5xl font-semibold text-main-400'>15000+</h5>
                                <p className='mt-2 text-dark-950'>Community Members</p>
                            </div>
                        </div>
                        <img className='absolute z-[1] -top-[50%] left-[-10%]' src={Fill} alt="" />
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default SocialProofSection