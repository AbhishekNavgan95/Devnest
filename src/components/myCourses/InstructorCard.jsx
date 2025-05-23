import React from 'react'
import { useNavigate } from 'react-router-dom'

const InstructorCard = ({
    data
}) => {

    const navigate = useNavigate()

    return (
        <div className='p-4 border rounded-md border-dark-700 bg-white flex flex-col gap-y-4'>
            <div className='flex items-center h-full gap-x-4'>
                <img src={data?.image?.url} className='w-12 md:w-16 aspect-square rounded-full border border-dark-700' alt="" />
                <div>
                    <h4 onClick={() => navigate(`/instructor/${data?._id}`)} className='font-medium hover:underline text-sm md:text-base cursor-pointer'>
                        {
                            data?.firstName
                        } {
                            data?.lastName
                        }
                    </h4>
                    <div className='mt-1 flex gap-x-2'>
                        {/* <p className='text-sm text-dark-700'>{data?.profile?.followers} Followers</p> */}
                        <p className='md:text-sm text-xs text-dark-700'>{data?.courses?.length} Courses</p>
                    </div>
                </div>
            </div>
            <div className='flex flex-wrap items-center gap-2 '>
                {
                    data?.profile?.niche?.slice(0, 5).map((n, i) => (
                        <span key={i} className='text-xs p-1 bg-main-400 text-dark-50 rounded-md px-2'>
                            {n}
                        </span>
                    ))
                }
            </div>
        </div>
    )
}

export default InstructorCard