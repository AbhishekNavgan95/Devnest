import React, { useState, useEffect } from 'react';
import Container from '../common/Container';
import { IoMdArrowDropright } from "react-icons/io";
import community from '@/assets/images/community.png'
import growth from '@/assets/images/growth.png'
import explore from '@/assets/images/explore.png'

const featureData = [
    {
        heading: "Discover Courses That Fit Your Goals",
        paragraph:
            "Browse a variety of curated learning paths across tech, design, business, and more. Whether you're a beginner or upskilling pro, there's a course tailored to match your ambition and pace.",
        linkTitle: "Browse Courses",
        image: explore
    },
    {
        heading: "Engage with a Supportive Community",
        paragraph:
            "Connect with learners, mentors, and experts who share your passion. Join discussions, exchange knowledge, and grow together in a vibrant, collaborative space designed to keep you inspired.",
        linkTitle: "Join the Community",
        image: community
    },
    {
        heading: "Track and Celebrate Your Growth",
        paragraph:
            "Monitor your learning progress through a personalized dashboard. Earn badges, complete challenges, and showcase certificates that reflect your journey as you move from learner to expert, step by step.",
        linkTitle: "View Dashboard",
        image: growth
    }
];

const StepsSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prev => (prev + 1) % featureData.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const currentFeat = featureData[currentIndex];

    return (
        <Container>
            <div className='w-full px-14 gap-x-24 flex items-center py-24'>
                <div className='flex flex-col items-center gap-y-8 w-[50%]'>
                    {featureData.map((feat, index) => {
                        const isActive = currentFeat.heading === feat.heading;

                        return (
                            <div key={index} className='flex gap-x-4 items-center'>
                                {/* Dot & Line */}
                                <div className='flex flex-col items-center gap-y-2'>
                                    <div className={`rounded-full w-8 h-8 border-4 p-1 transition-colors duration-500 ${isActive ? "border-main-400" : "border-main-50 !duration-100"}`}>
                                        <div className={`w-full h-full rounded-full transition-colors duration-500 ${isActive ? "bg-main-400" : "bg-main-50 !duration-100"}`}></div>
                                    </div>

                                    {/* Animated Line */}
                                    <div className="h-32 w-[3px] bg-main-50 overflow-hidden">
                                        <div
                                            className={`w-full transition-all roll ease-linear ${isActive ? "bg-main-400 h-full" : "bg-main-100 !duration-0 h-0"}`}
                                        ></div>
                                    </div>
                                </div>

                                {/* Text */}
                                <div>
                                    <h4 className='text-xl font-semibold mb-4'>{feat.heading}</h4>
                                    <p className='text-sm leading-6'>{feat.paragraph}</p>
                                    <button className='mt-4 text-xs text-main-400 flex items-center gap-x-2 hover:gap-x-3 transition-all duration-200 font-medium'>
                                        {feat.linkTitle}
                                        <IoMdArrowDropright className='inline text-lg' />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className='w-[50%] h-full flex justify-end relative'>
                    <div className='rounded-l-3xl w-full overflow-hidden h-[480px] border border-dark-700 relative'>
                        <div className='w-full bg-white border-b border-main-700 py-4 px-6 flex gap-x-2'>
                            <div className='w-3 h-3 rounded-full bg-red-500'></div>
                            <div className='w-3 h-3 rounded-full bg-yellow-500'></div>
                            <div className='w-3 h-3 rounded-full bg-green-500'></div>
                        </div>

                        {/* Image Wrapper for smooth crossfade */}
                        <div className='relative h-full w-full'>
                            {featureData.map((feat, index) => {
                                const isActive = currentIndex === index;
                                return (
                                    <img
                                        key={index}
                                        src={feat.image}
                                        alt=""
                                        className={`absolute top-0 left-0 w-full h-full object-cover object-left transition-opacity duration-1000 ease-in-out ${isActive ? "opacity-100 z-10" : "opacity-0 z-0"}`}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default StepsSection;
