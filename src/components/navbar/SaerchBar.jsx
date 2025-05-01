import React from 'react'
import { MdOutlineManageSearch } from "react-icons/md";
import { Input } from '../ui/input';

const SearchBar = () => {
    return (
        <span className='flex items-center border border-dark-700 px-2 rounded-sm transition-all focus-within:ring-1 focus-within:ring-dark-800'>
            <MdOutlineManageSearch className='text-2xl text-dark-950' />
            <Input
                type="text"
                placeholder="Search here..."
                className='w-[600px] h-9 bg-transparent placeholder:text-dark-700 text-dark-950 font-medium placeholder:text-base text-base !border-none outline-none focus-visible:ring-0 !focus:ring-0 !focus:outline-none'
            />
        </span>
    );
};

export default SearchBar;
