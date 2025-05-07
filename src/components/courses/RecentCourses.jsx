import { useCategoryStore } from '@/stores/useCategoryStore';
import { useTopicsStore } from '@/stores/useTopicsStore';
import React from 'react'
import { useParams } from 'react-router-dom'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from 'embla-carousel-autoplay';
import CourseCard from './CourseCard';

const RecentCourses = ({ data }) => {

    const plugin = React.useRef(
        Autoplay({ delay: 2000, stopOnInteraction: true })
    )

    return (
        <div>
            <h3 className='text-3xl font-medium border-b pb-6 border-dark-700'><span className='text-main-400'>Recently launched</span> courses </h3>
            {
                data?.length > 0 ? (
                    <div className='mt-6 w-full'>
                        <Carousel
                            plugins={[plugin.current]}
                            className="w-full "
                            onMouseEnter={plugin.current.stop}
                            onMouseLeave={plugin.current.reset}
                        >
                            <CarouselContent className=''>
                                {data.map((course, index) => (
                                    <CarouselItem className="pl-1 md:basis-1/2 lg:basis-1/3 xl:basis-1/4 " key={index}>
                                        <div className="p-1">
                                            <CourseCard course={course} />
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious />
                            <CarouselNext />
                        </Carousel>
                    </div>
                ) : <div className='flex items-center justify-center h-[200px]'>
                    <span className='text-sm text-dark-400'>No courses found</span>
                </div>
            }
        </div>
    )
}

export default RecentCourses