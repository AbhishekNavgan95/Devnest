import { useEffect, useState } from 'react';
import React from 'react'
import { MdOutlineManageSearch } from "react-icons/md";
import { Input } from '../ui/input';
import { useQuery } from '@tanstack/react-query';
import { api, getCloudinaryUrl } from '@/lib/utils';
import { IoIosClose } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

const fetchSearchResults = async (searchTerm) => {
    const res = await api.post('/course/search', {
        searchParam: searchTerm
    });
    return res.data;
}

const SearchBar = () => {

    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate()

    const { data, isPending } = useQuery({
        queryKey: ['search', debouncedSearchTerm],
        queryFn: () => fetchSearchResults(debouncedSearchTerm),
        enabled: debouncedSearchTerm.length > 0
    })

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm)
        }, 500)

        return () => {
            clearTimeout(timer)
        }
    }, [searchTerm])


    return (
        <div className='relative '>
            <span className='flex w-full items-center justify-between border border-dark-700 px-2 rounded-sm transition-all focus-within:ring-1 focus-within:ring-dark-800'>
                <div className='flex items-center w-full'>
                    <MdOutlineManageSearch className=' text-base lg:text-2xl text-dark-950' />
                    <Input
                        onChange={(e) => setSearchTerm(e.target.value)}
                        value={searchTerm}
                        type="text"
                        placeholder="Search here..."
                        className='min-w-[180px] xl:w-[600px] h-7 md:h-9 bg-transparent placeholder:text-dark-700 text-dark-950 font-medium placeholder:text-xs lg:placeholder:text-base text-xs lg:text-base !border-none outline-none focus-visible:ring-0 !focus:ring-0 !focus:outline-none'
                    />
                </div>
                {
                    searchTerm &&
                    <button className=' text-2xl' onClick={() => setSearchTerm('')}>
                        <IoIosClose />
                    </button>
                }
            </span>

            {
                data && (
                    <div className='absolute top-[120%] shadow-sm shadow-dark-600 w-full bg-dark-50 p-2 lg:p-3 border border-dark-600 rounded-md z-50'>
                        {
                            data?.courses?.length === 0 ? (
                                <div className='flex flex-col gap-y-2'>
                                    <h2 className='text-xs lg:text-sm line-clamp-1 text-center font-medium  '>No results found</h2>
                                </div>
                            ) : (
                                <div className='flex flex-col gap-y-2'>
                                    {
                                        data?.courses?.map((course, index) => (
                                            <button onClick={() => {
                                                navigate(`/course-details/${course?._id}`)
                                                setSearchTerm('')
                                            }} key={index} className='flex items-center group gap-x-2'>
                                                <img src={getCloudinaryUrl(course.thumbnail?.url, { width: 400, height: 225 })} alt="thumbnail" className='w-6 h-6 lg:w-8 lg:h-8 object-cover rounded-md' />
                                                <div>
                                                    <h2 className='text-xs lg:text-sm text-start line-clamp-2 font-medium group-hover:underline'>{course.title}</h2>
                                                </div>
                                            </button>
                                        ))
                                    }
                                </div>
                            )}
                    </div>
                )
            }
        </div>
    );
};

export default SearchBar;
