import { FaStar } from 'react-icons/fa';
import Container from '@/components/common/Container'
import { api } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FaRegListAlt } from "react-icons/fa";
import { MdOndemandVideo } from "react-icons/md";
import { PiStudentBold } from "react-icons/pi";
import { MdCurrencyRupee } from "react-icons/md";
import { Button } from '@/components/ui/button'
import { GiPlainCircle } from "react-icons/gi";
import CourseContentCarousel from '@/components/courseDetails/CourseContentCarousel'
import { HiMiniQuestionMarkCircle } from "react-icons/hi2";
import { FaRegCircle } from "react-icons/fa";
import { IoShareSocialSharp } from "react-icons/io5";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { useToast } from '@/hooks/use-toast'
import FAQCarousel from '@/components/courseDetails/faqCarousel'
import { FaCirclePlay } from "react-icons/fa6";
import { useUserStore } from '@/stores/useUserStore';
import { ToastAction } from '@/components/ui/toast';
import { useCartStore } from '@/stores/useCartStore';
import BuyCourseButton from '@/components/courseDetails/BuyCourseButton';
import CreateRating from '@/components/courseDetails/CreateRating';
import Stars from '@/components/common/Stars';

const fetchCourseDetails = async (id) => {
    const res = await api.get('/course/getCourseDetails/' + id)
    if (res.data?.success === false) {
        throw new Error(res.data?.message)
    }
    return res.data?.data
}

const CourseDetails = () => {

    const [currentTab, setCurrentTab] = useState('details')
    const [showPlayButton, setShowPlayButton] = useState(true);
    const videoRef = useRef(null)
    const { courseId } = useParams()
    const { toast } = useToast();
    const navigate = useNavigate();
    const { user, isLoggedIn } = useUserStore();
    const { addToCart, removeFromCart, cart } = useCartStore()

    const { data: course, isPending } = useQuery({
        queryKey: ['courseDetails', courseId],
        queryFn: () => fetchCourseDetails(courseId)
    })

    if (isPending) {
        return (
            <div className='min-h-screen grid place-items-center'>
                Loading...
            </div>
        )
    }

    const HandlePlayVideo = () => {
        if (videoRef.current) {
            videoRef.current.play()
            setShowPlayButton(false)
        }
    }

    const handleSave = () => {
        if (!isLoggedIn) {
            toast({
                title: "Login required",
                description: 'Failed to save, login is required',
                action: (
                    <ToastAction
                        onClick={() => {
                            navigate('/login')
                        }}
                        altText="login"
                    >Login</ToastAction>
                ),
            })
            return
        }

        if (user?.accountType === 'Instructor') {
            toast({
                title: "Instructor can't save course",
                description: 'Failed to save, instructor can\'t save course',
            })
            return;
        }

        const alreadyExist = cart.find((item) => item._id === course._id)
        if (alreadyExist) {
            removeFromCart(course._id)
            toast({
                title: "Course removed from saved",
                description: 'Course removed from saved successfully',
            })
        } else {
            addToCart(course)
            toast({
                title: "Course saved",
                description: 'Course saved successfully',
            })
        }
    }

    const avgRating = course?.ratingAndReviews?.reduce((acc, curr) => (
        acc + curr?.rating
    ), 0) / course?.ratingAndReviews?.length;

    const totalModuels = course?.courseContent?.length || 0
    const totalLectures = course?.courseContent?.reduce((acc, curr) => {
        return acc + curr?.subSection?.length
    }, 0) || 0
    const totalStudents = course?.studentsEnrolled?.length || 0

    return (
        <div className='max-w-[1280px] w-full mx-auto px-4 my-8'>
            {/* page header */}
            <div className='flex lg:items-center gap-y-4 flex-col lg:flex-row justify-between gap-x-4 w-full'>
                <div>
                    <h2 className='text-2xl font-medium line-clamp-2'>{course?.title}</h2>
                    <div className='flex items-center gap-x-4 mt-2'>
                        <p className='text-sm  text-dark-800'>{course?.category?.name}</p>
                        <span className='flex gap-x-2 items-center text-sm'>
                            <Stars count={avgRating} />
                        </span>
                    </div>
                    <div className='flex mt-3 gap-x-4'>
                        <span className='flex gap-x-2 items-center text-sm'>
                            <span className='p-2 bg-main-400 text-xs text-dark-50 rounded-full'>
                                <FaRegListAlt className='' />
                            </span>
                            {totalModuels} Modules
                        </span>
                        <span className='flex gap-x-2 items-center text-sm'>
                            <span className='p-2 bg-main-400 text-xs text-dark-50 rounded-full'>
                                <PiStudentBold className='' />
                            </span>
                            {totalLectures} Lectures
                        </span>
                        <span className='flex gap-x-2 items-center text-sm'>
                            <span className='p-2 bg-main-400 text-xs text-dark-50 rounded-full'>
                                <MdOndemandVideo className='' />
                            </span>
                            {totalStudents} Learners
                        </span>
                    </div>

                </div>
                <div className='flex justify-between flex-row gap-y-2 lg:items-center gap-x-4'>

                    <div className='flex items-center gap-x-1'>
                        <span className='flex items-center font-medium text-lg'>
                            <MdCurrencyRupee /> {course?.actualPrice}
                        </span>
                        <span className='flex items-center line-through text-sm text-dark-700'>
                            <MdCurrencyRupee /> {course?.price}
                        </span>
                    </div>

                    <div className='flex items-center gap-x-4'>
                        <div className='flex justify-start items-center gap-x-4'>
                            <button onClick={() => {
                                navigator.clipboard.writeText(window.location.href)
                                toast({
                                    title: "Link copied to clipboard",
                                    description: "You can now share this course with your friends and family.",
                                })
                            }} className='text-2xl '>
                                <IoShareSocialSharp />
                            </button>

                            {
                                user?.accountType === 'Student' && !user?.courses?.find((c) => c._id === courseId) &&
                                <button onClick={handleSave} className='text-2xl '>
                                    {
                                        !cart?.find((item) => item._id === course._id) ? <FaRegBookmark /> : <FaBookmark className='text-main-400' />
                                    }
                                </button>
                            }
                        </div>
                        {
                            user?.accountType === 'Student' ? !user?.courses?.find((c) => c._id === courseId)
                                ? <BuyCourseButton course={course} />
                                : !(course?.ratingAndReviews?.find(r => r?.user._id === user?._id)) ? <CreateRating courseId={courseId} /> : <Button onClick={() => navigate('/dashboard/enrolled-courses')}>View course</Button>
                                : null
                        }
                    </div>
                </div>
            </div>

            <div className='relative grid grid-cols-1 w-full lg:grid-cols-3 gap-x-8 gap-y-4 mt-8'>

                <div className='col-span-2 w-full'>
                    <div className='relative'>
                        <video ref={videoRef} muted controls className='rounded-md w-full aspect-video' src={course?.introVideo?.url}></video>
                        {
                            showPlayButton && (
                                <button onClick={HandlePlayVideo} className='absolute top-[50%] bg-white p-2 text-4xl rounded-full text-main-400 left-[50%] translate-x-[-50%] translate-y-[-50%]'>
                                    <FaCirclePlay />
                                </button>
                            )
                        }
                    </div>

                    {/* tags */}
                    <div className='mt-4 flex flex-wrap gap-y-2 gap-x-2 justify-center md:justify-start'>
                        {
                            course?.tags?.map((tag, index) => (
                                <span key={index} className='text-xs text-dark-50 capitalize bg-main-400 px-4 py-1 rounded-md'>{tag}</span>
                            ))
                        }
                    </div>

                    {/* course content */}
                    <div className='mt-4'>
                        <CourseContentCarousel data={course?.courseContent} />
                    </div>

                    <div className='mt-4 flex justify-start gap-x-4 items-center px-4 '>
                        <button onClick={() => setCurrentTab('details')} className={`font-medium py-2 rounded-md text-xs transition-color duration-200 px-4 ${currentTab === 'details' ? "bg-main-400 text-white" : "text-dark-950"}`}>About</button>
                        <button onClick={() => setCurrentTab('reviews')} className={`font-medium py-2 rounded-md text-xs transition-color duration-200 px-4 ${currentTab === 'reviews' ? " bg-main-400 text-white" : "text-dark-950"}`}>Reviews</button>
                        <button onClick={() => setCurrentTab('faqs')} className={`font-medium py-2 rounded-md text-xs transition-color duration-200 px-4 ${currentTab === 'faqs' ? " bg-main-400 text-white" : "text-dark-950"}`}>FAQs</button>
                    </div>

                    {
                        currentTab === 'details' && (
                            <div className='p-6 border border-dark-500 flex flex-col gap-y-4 mt-4 rounded-md'>

                                {/* description */}
                                <div className=' rounded-md'>
                                    <h2 className='text-lg font-medium '>Description</h2>
                                    <div className='mt-2'>
                                        <p className='text-sm'>{course?.description}</p>
                                    </div>
                                </div>

                                {/* What you will learn */}
                                <div className=' rounded-md'>
                                    <h2 className='text-lg font-medium '>What you will learn</h2>
                                    <div className='mt-2 flex flex-col items-start gap-y-2'>
                                        {
                                            course?.whatYouWillLearn?.map((e, i) => (
                                                <span key={i} className='flex items-start gap-x-3'>
                                                    <HiMiniQuestionMarkCircle size={10} className='text-base text-main-400 mt-[3px]' />
                                                    <p className='text-sm'>{e}</p>
                                                </span>
                                            ))
                                        }
                                    </div>
                                </div>

                                {/* requirements */}
                                <div className=' rounded-md'>
                                    <h2 className='text-lg font-medium '>Requirements / Instructions</h2>
                                    <div className='mt-2 flex flex-col items-start gap-y-2'>
                                        {
                                            course?.requirements?.map((e, i) => (
                                                <span key={i} className='flex items-start gap-x-3'>
                                                    <FaRegCircle size={8} className='text-base text-main-400 mt-[3px]' />
                                                    <p className='text-sm'>{e}</p>
                                                </span>
                                            ))
                                        }
                                    </div>
                                </div>

                                {/* who's this course for */}
                                <div className=' rounded-md'>
                                    <h2 className='text-lg font-medium '>Who is this course for?</h2>
                                    <div className='mt-2 flex flex-col items-start gap-y-2'>
                                        {
                                            course?.whoThisCourseIsFor?.map((e, i) => (
                                                <span key={i} className='flex items-start gap-x-3'>
                                                    <FaRegCircle size={8} className='text-base text-main-400 mt-[3px]' />
                                                    <p className='text-sm'>{e}</p>
                                                </span>
                                            ))
                                        }
                                    </div>
                                </div>

                            </div>
                        )
                    }

                    {
                        currentTab === 'faqs' && (
                            <div className='p-6 border border-dark-500 flex flex-col gap-y-4 mt-4 rounded-md'>
                                <div className=' rounded-md'>
                                    <h2 className='text-lg font-medium mb-3'>FAQs</h2>
                                    {
                                        !course?.faqs?.length > 0 ? (
                                            <div className='w-full h-[200px] flex items-center justify-center'>
                                                <span>
                                                    <p>No FAQs found</p>
                                                </span>
                                            </div>
                                        ) : (
                                            <FAQCarousel data={course?.faqs} />
                                        )
                                    }
                                </div>
                            </div>
                        )
                    }

                    {
                        currentTab === 'reviews' && (
                            <div className='p-6 border border-dark-500 flex flex-col gap-y-4 mt-4 rounded-md'>
                                <div className=' rounded-md'>
                                    <h2 className='text-lg font-medium mb-3'>Reviews</h2>
                                    {
                                        course?.reviews?.length === 0 ? (
                                            <div className='w-full h-[200px] flex items-center justify-center'>
                                                <span>
                                                    <p>No Reviews found</p>
                                                </span>
                                            </div>
                                        ) : (
                                            <div className='flex flex-col gap-y-4'>
                                                {
                                                    course?.ratingAndReviews?.slice(0, 5)?.map((e, i) => (
                                                        <div key={i} className='flex flex-col gap-y-4 bg-white border border-dark-500 p-4 rounded-md'>
                                                            <div className='flex items-center gap-x-4'>
                                                                <img src={e?.user?.image?.url} className='w-10 aspect-square rounded-full border border-dark-500' alt="" />
                                                                <div>
                                                                    <h5 className='font-medium text-base'>{e?.user?.firstName} {e?.user?.lastName}</h5>
                                                                    <Stars count={e?.rating} />
                                                                </div>
                                                            </div>
                                                            <p className='text-sm text-dark-900 leading-relaxed'>{e?.review}</p>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        )
                    }
                </div>

                <div className='sticky h-max top-4 col-span-2 md:col-span-1 md:cols-span-1 w-full flex flex-col gap-y-4'>
                    {/* whats included */}
                    <div className='p-4 border w-full border-dark-400 rounded-md'>
                        <h2 className='text-sm font-medium'>What's included</h2>
                        <div className='mt-2 flex flex-col items-start gap-y-1'>
                            {
                                course?.whatsIncluded?.map((e, i) => (
                                    <span key={i} className='flex items-start gap-x-3'>
                                        <GiPlainCircle size={10} className='text-xs text-main-400' />
                                        <p className='text-sm'>{e}</p>
                                    </span>
                                ))
                            }
                        </div>
                    </div>

                    {/* Instructor */}
                    <div className='p-4 border w-full border-dark-400 rounded-md'>
                        {/* <h2 className='text-sm font-medium text-center'>Instructor</h2> */}
                        <div className='mt-2 flex flex-col items-center gap-y-1'>
                            <div>
                                <img src={course?.instructor?.image?.url} className='w-28 rounded-full border border-dark-700' alt="" />
                            </div>
                            <button onClick={() => {
                                navigate('/instructor/'+course?.instructor?._id)
                            }} className='mt-2 font-medium cursor-pointer hover:underline'>{course?.instructor?.firstName} {course?.instructor?.lastName}</button>
                            <p className='text-xs text-center w-[80%]'>{course?.instructor?.additionalDetails?.experience}</p>
                            {course?.instructor?.additionalDetails?.niche?.length > 0 && (
                                <div className='flex justify-center items-center gap-2 mt-2 flex-wrap'>
                                    {
                                        course?.instructor?.additionalDetails?.niche?.slice(0,4)?.map((n, i) => (
                                            <span key={i} className='text-xs px-4 py-1 rounded-md bg-main-400 text-dark-50'>
                                                {n}
                                            </span>
                                        ))
                                    }
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CourseDetails