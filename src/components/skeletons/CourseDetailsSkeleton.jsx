import React from 'react';
import Container from '../common/Container';

const CourseDetailsSkeleton = () => {
    return (
        <Container>
            <div className="p-4 my-8 animate-pulse space-y-6">
                {/* Top Header */}
                <div className="h-6 w-2/3 bg-dark-200 rounded" />
                <div className="h-4 w-2/6 bg-dark-200 rounded" />

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="h-6 w-20 bg-dark-200 rounded-full" />
                    ))}
                </div>

                <div className='flex-col md:flex-row flex gap-4'>
                    {/* Video section */}
                    <div className="md:w-[70%] aspect-video bg-dark-200 rounded-lg" />

                    {/* Sidebar details */}
                    <div className="fkex md:w-[30%] flex-col w-full space-y-4">
                        <div className="col-span-2 space-y-4">
                            {/* Modules, Lectures, Learners */}
                            <div className="flex gap-4">
                                <div className="h-4 w-20 bg-dark-200 rounded" />
                                <div className="h-4 w-20 bg-dark-200 rounded" />
                                <div className="h-4 w-20 bg-dark-200 rounded" />
                            </div>

                            {/* Course Content Section */}
                            <div className="space-y-2">
                                {[...Array(4)].map((_, i) => (
                                    <div key={i} className="h-4 w-full bg-dark-200 rounded" />
                                ))}
                            </div>
                        </div>

                        {/* Right Sidebar */}
                        <div className="space-y-4">

                            {/* Instructor */}
                            <div className="flex items-center space-x-4">
                                <div className="h-16 w-16 rounded-full bg-dark-200" />
                                <div className="space-y-2">
                                    <div className="h-4 w-32 bg-dark-200 rounded" />
                                    <div className="h-3 w-48 bg-dark-200 rounded" />
                                </div>
                            </div>

                            {/* Skill tags */}
                            <div className="flex flex-wrap gap-2">
                                {[...Array(4)].map((_, i) => (
                                    <div key={i} className="h-5 w-16 bg-dark-200 rounded-full" />
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </Container>
    );
};

export default CourseDetailsSkeleton;
