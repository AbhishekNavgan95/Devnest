import React from 'react'
import { useNavigate } from 'react-router-dom'

const InstructorCard = ({
    data
}) => {

    const navigate = useNavigate()

    return (
        <div className='p-4 border rounded-md border-dark-700 bg-white'>
            <div className='flex items-center h-full gap-x-4'>
                <img src={data?.image?.url} className='w-24 aspect-square rounded-full border border-dark-700' alt="" />
                <div>
                    <h4 onClick={() => navigate(`/instructor/${data?._id}`)} className='font-medium hover:underline text-lg cursor-pointer'>
                        {
                            data?.firstName
                        } {
                            data?.lastName
                        }
                    </h4>
                    <div className='mt-1 flex gap-x-2'>
                        <p className='text-sm text-dark-700'>{data?.profile?.followers} Followers</p>
                        <p className='text-sm text-dark-700'>{data?.courses?.length} Courses</p>
                    </div>
                    <div className='flex flex-wrap items-center gap-2 mt-2'>
                        {
                            data?.profile?.niche?.slice(0, 4).map((n, i) => (
                                <span className='text-xs p-1 bg-main-400 text-dark-50 rounded-md px-2'>
                                    {n}
                                </span>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InstructorCard