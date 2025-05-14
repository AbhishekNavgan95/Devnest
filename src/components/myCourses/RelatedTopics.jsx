import React from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

const RelatedTopics = ({
    data
}) => {

    const navigate = useNavigate()
    const { category } = useParams();

    return (
        <div>
            <h3 className='text-3xl font-medium border-b pb-6 border-dark-700'>Related Categories</h3>
            <div className='mt-6'>
                {
                    data?.length > 0 ? (
                        <div className='flex flex-wrap gap-2 md:gap-4'>
                            {
                                data?.map((topic) => (
                                    <span key={topic?._id} onClick={() => {
                                        navigate(`/courses/${category}/${topic?._id}`)
                                        window.scrollTo(0, 0)
                                    }} className='bg-white border shadow-sm shadow-transparent hover:shadow-dark-700 border-dark-600 py-1 md:py-2 cursor-pointer text-dark-900 px-4 md:px-8 rounded-md text-base'>{topic?.name}</span>
                                ))
                            }
                        </div>
                    ) : (
                        <div className='flex items-center justify-center h-[200px]'>
                            <span>No Related Topics found</span>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default RelatedTopics