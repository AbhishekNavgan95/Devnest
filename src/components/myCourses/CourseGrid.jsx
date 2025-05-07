import React, { useEffect, useState } from 'react'
import CourseCard from './CourseCard'
import { Label } from '../ui/label'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from '../ui/select'
import { useTopicsStore } from '@/stores/useTopicsStore'
import { IoIosClose } from "react-icons/io";

const CourseGrid = ({ data, isPending }) => {
    const [courses, setCourses] = useState(data)
    const [selectedTopic, setSelectedTopic] = useState("")
    const [searchTerm, setSearchTerm] = useState("")
    const { topics } = useTopicsStore()

    useEffect(() => {
        let filteredCourses = data

        // Filter by topic
        if (selectedTopic) {
            filteredCourses = filteredCourses?.filter(course =>
                course?.category?._id === selectedTopic
            )
        }

        // Filter by search
        if (searchTerm.trim()) {
            filteredCourses = filteredCourses?.filter(course =>
                course?.title?.toLowerCase().includes(searchTerm.toLowerCase())
            )
        }

        setCourses(filteredCourses)
    }, [selectedTopic, searchTerm, data])

    return (
        <>
            <div className='my-8 border border-dark-600 bg-white px-4 py-4'>
                <div className='flex flex-col md:flex-row items-start md:items-center gap-4'>
                    {/* Category Filter */}
                    <div className='space-y-1 w-full md:w-max'>
                        {/* <Label className='text-xs'>Category</Label> */}
                        <div className='flex items-center gap-x-2 border border-dark-700 w-full md:w-max pr-2 rounded-md'>
                            <Select disabled={isPending} value={selectedTopic} onValueChange={val => setSelectedTopic(val)}>
                                <SelectTrigger className="md:w-[240px] w-full h-10 outline-none ring-0 border-none border-dark-600">
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Category</SelectLabel>
                                        {
                                            topics?.map(topic => (
                                                <SelectItem key={topic?._id} value={topic?._id}>
                                                    {topic.name}
                                                </SelectItem>
                                            ))
                                        }
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <button onClick={() => setSelectedTopic("")}>
                                <IoIosClose className='text-lg' />
                            </button>
                        </div>
                    </div>

                    {/* Search Filter */}
                    <div className='w-full space-y-1 '>
                        {/* <Label htmlFor="search" className='text-xs'>Search</Label> */}
                        <div className='flex gap-x-2 w-full rounded-md items-center md:w-max border border-dark-700'>
                            <input
                                id="search"
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search by course name..."
                                className=' w-full md:w-[240px] px-3 py-1 h-10 rounded-md text-sm outline-none'
                            />
                            <button className='mr-2' onClick={() => setSearchTerm("")}>
                                <IoIosClose className='text-lg' />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {
                !isPending && courses?.length > 0 ? (
                    <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-8'>
                        {
                            courses?.map((course) => (
                                <CourseCard key={course?._id} course={course} />
                            ))
                        }
                    </div>
                ) : isPending ? (
                    <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-8'>
                        {
                            Array.from({ length: 9 }).map((_, index) => (
                                <div key={index} className='w-full flex items-center justify-center min-h-[240px]'>
                                    <div className='w-full h-full animate-pulse bg-dark-400 rounded-lg' />
                                </div>
                            ))
                        }
                    </div>
                ) : (
                    <div className='w-full flex items-center justify-center min-h-[500px]'>
                        <h4 className='text-xl font-medium'>
                            No Courses Found
                        </h4>
                    </div>
                )
            }
        </>
    )
}

export default CourseGrid
