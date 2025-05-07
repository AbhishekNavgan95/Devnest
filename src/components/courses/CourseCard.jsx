import { useNavigate } from 'react-router-dom'
import React, { useRef, useState } from 'react'
import { BiCategory } from 'react-icons/bi'
import { MdOutlineCurrencyRupee } from 'react-icons/md'
import Stars from '../common/Stars'
import { AnimatePresence, motion } from 'framer-motion'

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
            className={`absolute pointer-events-none top-0 w-[300px] z-20 bg-white shadow-lg border border-dark-200 rounded-lg p-4 ${
              overlayPosition === 'right' ? 'left-full ml-2' : 'right-full mr-2'
            }`}
          >
            <h4 className='font-semibold text-base mb-2'>What you'll learn</h4>
            <ul className='list-disc pl-5 text-sm space-y-1'>
              {course?.whatYouWillLearn?.slice(0, 6).map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Card */}
      <div className='relative'>
        <img
          src={course?.thumbnail?.url}
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
          <Stars count={4.5} />
        </div>

        <div className='flex items-center mt-2 gap-x-1'>
          <div className='flex gap-x-1 items-center font-semibold'>
            <MdOutlineCurrencyRupee className='text-base' />
            <p>{course?.price}</p>
          </div>
          <div className='flex line-through text-sm items-center text-dark-700'>
            <MdOutlineCurrencyRupee className='text-base' />
            <span>{course?.actualPrice}</span>
          </div>
        </div>

        <div className='flex gap-1 flex-wrap mt-2'>
          {course?.tags.slice(0, 3)?.map((tag, index) => (
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
