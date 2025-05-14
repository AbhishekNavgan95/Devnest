import { useEffect, useState } from 'react';
import React from 'react'
import { MdOutlineManageSearch } from "react-icons/md";
import { Input } from '../ui/input';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/utils';
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
        <div className='relative'>
            <span className='flex items-center justify-between border border-dark-700 px-2 rounded-sm transition-all focus-within:ring-1 focus-within:ring-dark-800'>
                <div className='flex items-center'>
                    <MdOutlineManageSearch className='text-2xl text-dark-950' />
                    <Input
                        onChange={(e) => setSearchTerm(e.target.value)}
                        value={searchTerm}
                        type="text"
                        placeholder="Search here..."
                        className='w-[600px] h-9 bg-transparent placeholder:text-dark-700 text-dark-950 font-medium placeholder:text-base text-base !border-none outline-none focus-visible:ring-0 !focus:ring-0 !focus:outline-none'
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
                    <div className='absolute top-[120%] shadow-sm shadow-dark-600 w-full bg-dark-50 p-3 border border-dark-600 rounded-md z-50'>
                        <div className='flex flex-col gap-y-3'>
                            {
                                data?.courses?.map((course, index) => (
                                    <button onClick={() => {
                                        navigate(`/course-details/${course?._id}`)
                                        setSearchTerm('')
                                    }} key={index} className='flex items-center group gap-x-2'>
                                        <img src={course.thumbnail?.url} alt="thumbnail" className='w-8 h-8 object-cover rounded-md' />
                                        <div>
                                            <h2 className='text-sm font-medium group-hover:underline'>{course.title}</h2>
                                        </div>
                                    </button>
                                ))
                            }
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default SearchBar;
