"use client"
import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Stars from '../common/Stars'
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";

const TopReviews = ({ data }) => {
    const [reviews, setReviews] = useState([])
    const [currentReview, setCurrentReview] = useState(data[0])
    const [direction, setDirection] = useState(1) // for animation direction

    useEffect(() => {
        setReviews(data)
        setCurrentReview(data[0])
    }, [data])

    useEffect(() => {
        let timerRef
        if (reviews.length > 0) {
            timerRef = setInterval(() => {
                handleNext()
            }, 5000)
        }

        return () => clearInterval(timerRef)
    }, [currentReview, reviews])

    const handleNext = () => {
        const index = reviews.indexOf(currentReview)
        setDirection(1)
        if (index === reviews.length - 1) {
            setCurrentReview(reviews[0])
        } else {
            setCurrentReview(reviews[index + 1])
        }
    }

    const handlePrev = () => {
        const index = reviews.indexOf(currentReview)
        setDirection(-1)
        if (index === 0) {
            setCurrentReview(reviews[reviews.length - 1])
        } else {
            setCurrentReview(reviews[index - 1])
        }
    }

    const variants = {
        enter: (dir) => ({
            x: dir > 0 ? 100 : -100,
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
            transition: { duration: 0.4 },
        },
        exit: (dir) => ({
            x: dir > 0 ? -100 : 100,
            opacity: 0,
            transition: { duration: 0.3 },
        }),
    }

    return (
        <div className="flex p-6 px-8 overflow-hidden flex-col gap-y-4 items-center justify-between border border-dark-600 rounded-xl bg-white shadow-sm shadow-dark-400 w-full">
            <h5 className='font-semibold text-center w-full'>Top Reviews</h5>

            <AnimatePresence custom={direction} mode="wait">
                <motion.div
                    key={currentReview?._id || currentReview?.user?._id}
                    className="flex flex-col items-center w-full"
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                >
                    <div className='flex gap-x-4 items-center'>
                        <img
                            className='w-[70px] border border-dark-600 object-cover rounded-full aspect-square'
                            src={currentReview?.user?.image?.url}
                            alt={`${currentReview?.user?.firstName}'s avatar`}
                        />
                        <div>
                            <h4 className='font-medium'>{currentReview?.user?.firstName} {currentReview?.user?.lastName}</h4>
                            <p className='text-xs text-dark-800 mt-1'>{currentReview?.course?.title}</p>
                            <div className='mt-1'><Stars count={currentReview?.rating} /></div>
                        </div>
                    </div>
                    <p className='text-center mt-4 line-clamp-5 text-dark-800 text-base'>
                        {currentReview?.review}
                    </p>
                </motion.div>
            </AnimatePresence>

            <div className="flex gap-4 mt-4">
                <button
                    onClick={handlePrev}
                    className="p-2 border-2 rounded-full text-main-400 border-main-400 transition"
                >
                    <MdKeyboardArrowLeft />
                </button>
                <button
                    onClick={handleNext}
                    className="p-2 border-2 rounded-full text-main-400 border-main-400 transition"
                >
                    <MdKeyboardArrowRight />
                </button>
            </div>
        </div>
    )
}

export default TopReviews
