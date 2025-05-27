import React from 'react'
import Container from '../common/Container'
import collaborativeCodingpng from '../../assets/images/collaborativeCodingpng.png'
import communityForum from '../../assets/images/communityForum.png'
import chatbotlogo from '../../assets/images/chatbotlogo.png'
import progress from '../../assets/images/progress.png'

const FeaturesGrid = () => {
    return (
        <Container>
            <div className='lg:p-14 px-0 grid grid-cols-2 w-full lg:grid-cols-3 gap-4 lg:gap-8 '>
                <div className='p-8 bg-main-400 rounded-3xl aspect-video lg:aspect-auto w-full col-span-2 lg:col-span-1 relative overflow-hidden'>
                    <h5 className='text-2xl lg:text-3xl text-dark-100 font-semibold leading-snug'>Empower your development journey</h5>
                    <img src={progress} className='absolute w-[200px] lg:w-full right-0 -bottom-8 mix-blend-overlay opacity-50' alt="" />
                </div>

                <div className='w-full relative col-span-2 overflow-hidden aspect-video lg:aspect-auto rounded-3xl'>
                    <div className='w-full h-full lg:h-auto overflow-hidden rounded-2xl'>
                        <img src={collaborativeCodingpng} className='w-full hover:scale-[102%] h-full transition-all duration-100 ease-in-out' alt="" />
                    </div>
                    <div className='px-8 py-8 lg:py-4 lg:px-0 absolute lg:static rounded-xl bottom-0 h-full bg-black/60 lg:bg-transparent text-dark-50 lg:text-dark-900'>
                        <h5 className='text-lg mb-2 font-semibold'>Collaborative Coding</h5>
                        <p className='text-sm text-dark-400 lg:text-dark-700'>Join the  live CodeSpaces to connect with Instructors and peers to learn in a collaborative enviroment.</p>
                    </div>
                </div>

                <div className='w-full relative  col-span-2 overflow-hidden aspect-video lg:aspect-auto rounded-3xl'>
                    <div className='w-full h-full lg:h-auto overflow-hidden rounded-2xl'>
                        <img src={communityForum} className='w-full hover:scale-[102%] h-full transition-all duration-100 ease-in-out' alt="" />
                    </div>
                    <div className='px-8 py-8 lg:py-4 lg:px-0 absolute lg:static rounded-xl bottom-0 h-full bg-black/60 lg:bg-transparent text-dark-50 lg:text-dark-900'>
                        <h5 className='text-lg mb-2 font-semibold'>Community Forums</h5>
                        <p className='text-sm text-dark-400 lg:text-dark-700'>Dive into discussion zones — share knowledge, ask questions, and grow together.</p>
                    </div>
                </div>

                <div className='p-8 border bg-white border-dark-700 relative overflow-hidden rounded-3xl aspect-video lg:aspect-auto w-full col-span-2 lg:col-span-1 '>
                    <h5 className='text-2xl text-main-400 font-bold '>Nestor</h5>
                    <p className='text-sm mt-2 relative z-[2]'>Blazing fast personal AI assistant for seamless site navigation and real-time doubt clearing.</p>
                    <img src={chatbotlogo} className='absolute w-[200px] lg:w-auto right-0 -bottom-4' alt="" />
                </div>
            </div>
        </Container>
    )
}

export default FeaturesGrid