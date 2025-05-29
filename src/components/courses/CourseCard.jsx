import { useNavigate } from 'react-router-dom'
import React, { useRef, useState } from 'react'
import { MdOutlineCurrencyRupee } from 'react-icons/md'
import Stars from '../common/Stars'
import { AnimatePresence, motion } from 'framer-motion'
import { getCloudinaryUrl } from '@/lib/utils'

const CourseCard = ({ course }) => {
  const navigate = useNavigate();
  const cardRef = useRef(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const [overlayPosition, setOverlayPosition] = useState('right');

  const handleMouseEnter = () => {
    const cardRect = cardRef.current.getBoundingClientRect();
    const spaceRight = window.innerWidth - cardRect.right;
    const spaceLeft = cardRect.left;

    if (spaceRight < 320 && spaceLeft > 320) {
      setOverlayPosition('left');
    } else {
      setOverlayPosition('right');
    }

    setShowOverlay(true);
  };

  const handleMouseLeave = () => {
    setShowOverlay(false);
  };

  const avgRating = (course?.ratingAndReviews?.reduce((acc, curr) => (
    acc + curr?.rating
  ), 0) / course?.ratingAndReviews?.length) || 0;

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className='relative border border-dark-300 bg-white  flex flex-col rounded-lg'
    >
      {/* Overlay */}
      <AnimatePresence className=''>
        {showOverlay && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`absolute pointer-events-none top-0 w-[300px] z-20 bg-white shadow-lg border border-dark-200 rounded-lg p-4 ${overlayPosition === 'right' ? 'left-full ml-2' : 'right-full mr-2'
              }`}
          >
            <div className=''>
              <h4 className='text-lg font-medium capitalize'>{course?.title}</h4>
              <p className='text-sm mt-1 text-dark-800'>{course?.category?.name}</p>
            </div>

            <div className='h-[1px] my-3 bg-dark-800'></div>

            <div className=''>
              <p className='text-xs line-clamp-3'>{course?.description}</p>
            </div>

            <div className='h-[1px] my-3 bg-dark-600'></div>

            <div className='space-y-1'>
              {
                course?.whatsIncluded?.slice(0, 5)?.map((item, index) => (
                  <li key={index} className=' list-disc list-inside text-xs'>{item}</li>
                ))
              }
            </div>

            <div className='h-[1px] my-3 bg-dark-800'></div>

            <div className='flex gap-1'>
              <p className='text-xs font-medium'>last Updated : <span className='font-normal'>
                {
                  new Date(course?.updatedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })
                }
              </span>
              </p>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Card */}
      <div className='relative'>
        <img
          src={getCloudinaryUrl(course?.thumbnail?.url, { width: 400, height: 225 }) || 'https://placehold.co/400x225'}
          className='w-full border-b rounded-t-md border-dark-600 aspect-video object-cover'
          alt={course?.title}
        />
      </div>
      <div className='flex flex-col border h-full justify-between px-4 pt-2 pb-4'>
        <div className='h-full'>
          <h3
            onClick={() => navigate(`/course-details/${course?._id}`)}
            className='text-lg hover:underline cursor-pointer line-clamp-2 text-black font-medium'
          >
            {course?.title}
          </h3>
          <p
            onClick={() => navigate(`/instructor/${course?.instructor?._id}`)}
            className='text-sm w-max text-dark-700 hover:underline cursor-pointer line-clamp-1 mt-1'
          >
            {course?.instructor?.firstName} {course?.instructor?.lastName}
          </p>
        </div>

        <div className='flex gap-x-1 mt-2 items-center font-semibold'>
          <Stars count={avgRating} />
        </div>

        <div className='flex items-center mt-2 gap-x-1'>
          <div className='flex gap-x-1 items-center font-semibold'>
            <MdOutlineCurrencyRupee className='text-base' />
            <p>{course?.actualPrice}</p>
          </div>
          <div className='flex line-through text-sm items-center text-dark-700'>
            <MdOutlineCurrencyRupee className='text-base' />
            <span>{course?.price}</span>
          </div>
        </div>

        <div className='flex gap-1 flex-wrap mt-2'>
          {course?.tags?.slice(0, 3)?.map((tag, index) => (
            <span
              key={index}
              className='text-xs px-2 py-1 rounded-md bg-main-400 text-dark-50'
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
