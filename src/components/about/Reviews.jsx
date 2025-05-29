import React from 'react'
import Container from '../common/Container'
import { aboutUsReviews } from '@/lib/data'
import { BsTwitterX } from "react-icons/bs";

const Reviews = () => {
  return (
    <Container>
      <div className='py-12 md:py-24'>
        <h4 className='text-center text-4xl mb-12 font-medium'>
          Words from <span className='text-main-400'>our Community</span>
        </h4>

        {/* Masonry-style layout using columns */}
        <div className='columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4'>
          {
            aboutUsReviews.map((rev, index) => (
              <ReviewCard review={rev} key={index} />
            ))
          }
        </div>
      </div>
    </Container>
  )
}

const ReviewCard = ({ review }) => {
  return (
    <div className='break-inside-avoid flex flex-col items-start border border-dark-400 rounded-xl p-6 bg-white shadow'>
      <div className='flex justify-between items-start w-full'>
        <div className='flex items-center gap-x-3'>
          <img src={review?.image} className='w-12 h-12 border border-dark-700 rounded-full object-cover' alt="user-image" loading='lazy' />
          <div>
            <h5 className='text-base font-medium'>{review?.name}</h5>
            <p className='text-sm font-normal capitalize text-dark-800'>{review?.role}</p>
          </div>
        </div>
        <BsTwitterX className='text-xl cursor-pointer' />
      </div>
      <p className='mt-4 text-sm leading-relaxed text-dark-900'>{review?.review}</p>
    </div>
  )
}

export default Reviews
