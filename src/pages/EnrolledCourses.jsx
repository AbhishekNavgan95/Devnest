import CourseCard from '@/components/enrolled-courses/CourseCard';
import { Button } from '@/components/ui/button';
import { useUserStore } from '@/stores/useUserStore'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useTopicsStore } from '@/stores/useTopicsStore';
import { IoIosClose } from 'react-icons/io';

const EnrolledCourses = () => {

  const { topics } = useTopicsStore()
  const { user } = useUserStore()
  const [courses, setCourses] = useState(user?.courses)
  const [selectedTopic, setSelectedTopic] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const navigate = useNavigate();

  useEffect(() => {
    let filteredCourses = user?.courses

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
  }, [selectedTopic, searchTerm, user?.courses])

  return (
    <div>
      <div className='bg-white p-2 px-4 rounded-md flex flex-col md:flex-row gap-4 justify-between items-center border border-dark-500 mb-4 md:mb-8'>
        <h2 className='text-xl lg:text-2xl font-medium '>My Courses</h2>

        <div className='flex'>
          <div className='flex flex-row items-start md:items-center gap-4'>
            {/* Category Filter */}
            <div className='space-y-1 w-full md:w-max'>
              {/* <Label className='text-xs'>Category</Label> */}
              <div className='flex items-center gap-x-2 border border-dark-700 w-full md:w-max pr-2 rounded-md'>
                <Select value={selectedTopic} onValueChange={val => setSelectedTopic(val)}>
                  <SelectTrigger className="md:w-[180px] w-full h-8 outline-none ring-0 border-none border-dark-600">
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
                  className=' w-full md:w-[160px] px-3 py-1 h-8 rounded-md text-sm outline-none'
                />
                <button className='mr-2' onClick={() => setSearchTerm("")}>
                  <IoIosClose className='text-lg' />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div> 

      {
        courses.length === 0 ? (
          <div className='w-full bg-white border border-dark-400 rounded-md min-h-[540px] flex justify-center items-center'>
            <div className='flex flex-col items-center gap-y-2'>
              <h5 className='text-lg text-dark-700'>No courses found</h5>
              <Link to='/courses'>
                <Button>
                  Explore courses
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center gap-4 w-full relative'>
            {
              courses?.map((course) => (
                <CourseCard course={course} key={course._id} />
              ))
            }
          </div>
        )
      }
    </div>
  )
}

export default EnrolledCourses