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

const TopRatedCourses = ({ data }) => {

    const plugin = React.useRef(
        Autoplay({ delay: 2000, stopOnInteraction: true })
    )

    const { topic } = useParams();
    const { topics } = useTopicsStore();
    const currentTopic = topics?.filter((top) => top?._id === topic)[0]

    return (
        <div>
            <h3 className='text-xl md:text-3xl font-medium border-b pb-4 md:pb-6 border-dark-700'>Top rated courses in <span className='text-main-400'>{currentTopic?.name}</span></h3>
            {
                data?.length > 0 ? (
                    <div className='md:mt-6 mt-4 w-full'>
                        <Carousel
                            plugins={[plugin.current]}
                            className="w-full"
                            onMouseEnter={plugin.current.stop}
                            onMouseLeave={plugin.current.reset}
                        >
                            <CarouselContent>
                                {data.map((course, index) => (
                                    <CarouselItem className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4" key={index}>
                                        <CourseCard course={course} />
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <div className='hidden md:block'>
                                <CarouselPrevious />
                                <CarouselNext />
                            </div>
                        </Carousel>
                    </div>
                ) : <div className='flex items-center justify-center h-[200px]'>
                    <span>No courses found</span>
                </div>
            }
        </div>
    )
}

export default TopRatedCourses