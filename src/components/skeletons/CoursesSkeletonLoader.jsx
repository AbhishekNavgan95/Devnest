import React from 'react';
import Container from '../common/Container';

const CourseSkeletonLoader = () => {
    return (
        <div className='my-24'>
            <Container>
                <div>
                    <div className='bg-dark-100 animate-pulse rounded-md h-12 w-2/3'></div>
                    <div className='grid grid-cols-3 mt-14 gap-x-4'>
                        {
                            Array.from({ length: 3 }).map((_, i) => (
                                <div className='relative border border-dark-300 bg-dark-100 animate-pulse flex flex-col rounded-lg'>
                                    {/* Image placeholder */}
                                    <div className='w-full aspect-video bg-dark-200 rounded-t-md' />

                                    <div className='flex flex-col border h-full justify-between px-4 pt-2 pb-4'>
                                        <div className='h-full'>
                                            {/* Title placeholder */}
                                            <div className='h-4 bg-dark-200 rounded w-3/4 mb-2' />
                                            {/* Instructor name placeholder */}
                                            <div className='h-3 bg-dark-200 rounded w-1/2 mb-4' />
                                        </div>

                                        {/* Stars placeholder */}
                                        <div className='flex gap-x-1 mt-2 items-center'>
                                            <div className='h-4 bg-dark-200 rounded w-24' />
                                        </div>

                                        {/* Price placeholders */}
                                        <div className='flex items-center mt-2 gap-x-4'>
                                            <div className='h-4 bg-dark-200 rounded w-12' />
                                            <div className='h-4 bg-dark-300 rounded w-10' />
                                        </div>

                                        {/* Tags placeholder */}
                                        <div className='flex gap-2 flex-wrap mt-2'>
                                            <div className='h-5 bg-dark-200 rounded w-16' />
                                            <div className='h-5 bg-dark-200 rounded w-12' />
                                            <div className='h-5 bg-dark-200 rounded w-10' />
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className='mt-14'>
                    <div className='bg-dark-100 animate-pulse rounded-md h-12 w-2/3'></div>
                    <div className='grid grid-cols-3 mt-14 gap-x-4'>
                        {
                            Array.from({ length: 3 }).map((_, i) => (
                                <div className='relative border border-dark-300 bg-dark-100 animate-pulse flex flex-col rounded-lg'>
                                    {/* Image placeholder */}
                                    <div className='w-full aspect-video bg-dark-200 rounded-t-md' />

                                    <div className='flex flex-col border h-full justify-between px-4 pt-2 pb-4'>
                                        <div className='h-full'>
                                            {/* Title placeholder */}
                                            <div className='h-4 bg-dark-200 rounded w-3/4 mb-2' />
                                            {/* Instructor name placeholder */}
                                            <div className='h-3 bg-dark-200 rounded w-1/2 mb-4' />
                                        </div>

                                        {/* Stars placeholder */}
                                        <div className='flex gap-x-1 mt-2 items-center'>
                                            <div className='h-4 bg-dark-200 rounded w-24' />
                                        </div>

                                        {/* Price placeholders */}
                                        <div className='flex items-center mt-2 gap-x-4'>
                                            <div className='h-4 bg-dark-200 rounded w-12' />
                                            <div className='h-4 bg-dark-300 rounded w-10' />
                                        </div>

                                        {/* Tags placeholder */}
                                        <div className='flex gap-2 flex-wrap mt-2'>
                                            <div className='h-5 bg-dark-200 rounded w-16' />
                                            <div className='h-5 bg-dark-200 rounded w-12' />
                                            <div className='h-5 bg-dark-200 rounded w-10' />
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default CourseSkeletonLoader;
