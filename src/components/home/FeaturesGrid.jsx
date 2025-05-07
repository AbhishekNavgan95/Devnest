import React from 'react'
import Container from '../common/Container'
import collaborativeCodingpng from '../../assets/images/collaborativeCodingpng.png'
import communityForum from '../../assets/images/communityForum.png'
import chatbotlogo from '../../assets/images/chatbotlogo.png'

const FeaturesGrid = () => {
    return (
        <Container>
            <div className='p-14 grid grid-cols-3 gap-8'>
                <div className='p-8 bg-main-400 rounded-2xl'>
                    <h5 className='text-3xl text-dark-100 font-semibold leading-snug'>Empower your development journey</h5>
                </div>

                <div className='w-full col-span-2'>
                    <div className='w-full overflow-hidden rounded-2xl'>
                        <img src={collaborativeCodingpng} className='w-full hover:scale-[102%] transition-all duration-100 ease-in-out' alt="" />
                    </div>
                    <div className='py-4'>
                        <h5 className='text-lg mb-2 font-semibold'>Collaborative Coding</h5>
                        <p className='text-sm'>Join the  live CodeSpaces to connect with Instructors and peers to learn in a collaborative enviroment.</p>
                    </div>
                </div>

                <div className='w-full  col-span-2'>
                    <div className='w-full overflow-hidden rounded-2xl'>
                        <img src={communityForum} className='w-full hover:scale-[102%] transition-all duration-100 ease-in-out' alt="" />
                    </div>
                    <div className='py-4'>
                        <h5 className='text-lg mb-2 font-semibold'>Community Forums</h5>
                        <p className='text-sm'>Dive into discussion zones — share knowledge, ask questions, and grow together.</p>
                    </div>
                </div>

                <div className='p-8 border bg-white border-dark-700 relative overflow-hidden rounded-2xl'>
                    <h5 className='text-lg text-dark-900 font-bold'>AI Assistant</h5>
                    <p className='text-sm mt-2'>Personal AI sidekick for seamless site navigation and real-time doubt clearing.</p>
                    <img src={chatbotlogo} className='absolute -bottom-4' alt="" />
                </div>
            </div>
        </Container>
    )
}

export default FeaturesGrid