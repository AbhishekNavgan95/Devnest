import React from 'react'
import { useNavigate } from 'react-router-dom'
import { IoIosClose } from "react-icons/io";
import Stars from '../common/Stars';
import { MdOutlineCurrencyRupee } from 'react-icons/md'
import { useCartStore } from '@/stores/useCartStore';
import { getCloudinaryUrl } from '@/lib/utils';

const CourseCard = ({
    course
}) => {

    const { removeFromCart } = useCartStore()

    const navigate = useNavigate()
    // console.log("course : ", course)

    return (
        <div className='border flex items-center gap-x-2 rounded-md overflow-hidden border-dark-600'>

            <img className='!aspect-video h-[140px]' src={getCloudinaryUrl(course?.thumbnail?.url, { width: 400, height: 225 })} alt="" />

            <div className='w-full p-2'>
                <div className='flex justify-between gap-x-4 w-full'>
                    <h4 onClick={() => navigate(`/course-details/${course?._id}`)} className='line-clamp-1 text-sm hover:underline cursor-pointer font-medium'>{course?.title}</h4>
                    <button onClick={() => removeFromCart(course?._id)} className='text-xl'>
                        <IoIosClose />
                    </button>
                </div>
                <p className='text-xs mt-1 text-dark-700'>{course?.category?.name}</p>
                <p onClick={() => navigate(`/instructor/${course?.instructor?._id}`)} className='text-xs my-1 text-dark-700 hover:text-dark-950 w-max cursor-pointer hover:underline'>
                    {course?.instructor?.firstName} {course?.instructor?.lastName}
                </p>
                <Stars count={4.6} />
                <div className='flex gap-x-2 mt-1'>
                    <span className='flex gap-x-1 items-center'>
                        <MdOutlineCurrencyRupee /> <p>{course?.actualPrice}</p>
                    </span>
                    <span className='flex text-xs line-through text-dark-700 gap-x-1 items-center'>
                        <MdOutlineCurrencyRupee /> <p>{course?.price}</p>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default CourseCard