import React, { useState, useEffect } from 'react';
import Container from '../common/Container';
import { IoMdArrowDropright } from "react-icons/io";
import community from '../../assets/images/community.png';
import growth from '../../assets/images/growth.png';
import explore from '../../assets/images/explore.png';

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
            <div className='w-full flex flex-col lg:flex-row lg:px-14 gap-y-12 lg:gap-x-24 items-center py-12 lg:py-24'>
                {/* Steps Text Section */}
                <div className='flex flex-col items-center lg:items-start gap-y-8 w-full lg:w-[50%] lg:px-0'>
                    {featureData.map((feat, index) => {
                        const isActive = currentFeat.heading === feat.heading;

                        return (
                            <div key={index} className='flex gap-x-4 items-center'>
                                {/* Dot & Line */}
                                <div className='flex flex-col items-center gap-y-2'>
                                    <div className={`rounded-full w-6 h-6 lg:w-6 lg:h-6 border-4 p-1 transition-colors duration-500 ${isActive ? "border-main-400" : "border-main-50 !duration-100"}`}>
                                        <div className={`w-full h-full rounded-full transition-colors duration-500 ${isActive ? "bg-main-400" : "bg-main-50 !duration-100"}`}></div>
                                    </div>

                                    <div className="lg:h-32 h-32 w-[2px] sm:w-[3px] bg-main-50 overflow-hidden">
                                        <div
                                            className={`w-full transition-all roll ease-linear ${isActive ? "bg-main-400 h-full" : "bg-main-100 !duration-0 h-0"}`}
                                        ></div>
                                    </div>
                                </div>

                                {/* Text */}
                                <div>
                                    <h4 className='text-lg sm:text-xl font-semibold mb-2 sm:mb-4'>{feat.heading}</h4>
                                    <p className='text-xs lg:text-sm leading-5 lg:leading-6'>{feat.paragraph}</p>
                                    <button className='mt-2 sm:mt-4 text-xs lg:text-xs text-main-400 flex items-center gap-x-2 hover:gap-x-3 transition-all duration-200 font-medium'>
                                        {feat.linkTitle}
                                        <IoMdArrowDropright className='inline text-lg' />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Image Section */}
                <div className='w-full lg:w-[50%] h-full flex justify-center lg:justify-end relative px-4 sm:px-8 lg:px-0'>
                    <div className='rounded-2xl lg:rounded-l-3xl w-full max-w-md sm:max-w-xl overflow-hidden h-[320px] sm:h-[400px] lg:h-[480px] border border-dark-700 relative'>
                        <div className='w-full bg-white border-b border-main-700 py-2 sm:py-4 px-4 sm:px-6 flex gap-x-2'>
                            <div className='w-2 lg:w-3 h-2 lg:h-3 rounded-full bg-red-500'></div>
                            <div className='w-2 lg:w-3 h-2 lg:h-3 rounded-full bg-yellow-500'></div>
                            <div className='w-2 lg:w-3 h-2 lg:h-3 rounded-full bg-green-500'></div>
                        </div>

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
