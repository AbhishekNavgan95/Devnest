import { api, BASE_API_URL } from '@/lib/utils'
import { useMutation, useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { IoChevronBackOutline } from "react-icons/io5";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight, MdKeyboardArrowDown } from "react-icons/md";
import { IoCheckmarkDone } from "react-icons/io5";
import { useToast } from '@/hooks/use-toast'
import { RiMenu3Line } from "react-icons/ri";
import { RiMenuUnfoldLine } from "react-icons/ri";
import { useUserStore } from '@/stores/useUserStore'

const fetchFullCourseDetails = async (id) => {
    const response = await api.get('/course/getFullCourseDetails/' + id)
    return response.data
}

const markAsCompletedfn = async (data) => {
    const response = await api.post('/course/updateCourseProgress', data)
    return response.data
}

const ViewCourse = () => {
    const [currentLecture, setCurrentLecture] = useState(null)
    const [modules, setModules] = useState([])
    const [completedLectures, setCompletedLectures] = useState([])
    const [menuOpen, setMenuOpen] = useState(true);
    const [openModuleIndex, setOpenModuleIndex] = useState(null)
    const { id } = useParams()
    const { toast } = useToast();
    const { user, setUser } = useUserStore()
    const navigate = useNavigate();

    const { data, isPending } = useQuery({
        queryKey: ['fullCourseDetails', id],
        queryFn: () => fetchFullCourseDetails(id)
    })

    const { mutate: markAsCompleted, isPending: markAsCompletedPending } = useMutation({
        mutationFn: markAsCompletedfn,
        onSuccess: (data) => {
            setCompletedLectures(data?.data.completedVideos || [])
            const currentCourseProgress = user?.courseProgress?.filter((p) => p.courseId === id)[0]
            currentCourseProgress.completedVideos = data?.data?.completedVideos;
            setUser({ ...user, courseProgress: [...user?.courseProgress, currentCourseProgress] })
            toast({
                title: "Marked as completed",
                description: "You have successfully marked this lecture as completed",
            })
        }
    })

    const courseDetails = data?.data?.courseDetails;
    const totalLectures = modules?.reduce((acc, module) => acc + module.subSection.length, 0)
    const progressPercentage = Math.round((completedLectures?.length / totalLectures) * 100) || 0

    useEffect(() => {
        const courseModules = data?.data?.courseDetails?.courseContent || []
        setModules(courseModules)
        setCompletedLectures(data?.data?.completedVideos || [])

        if (courseModules.length) {
            setCurrentLecture(courseModules[0]?.subSection[0])
            setOpenModuleIndex(0)
        }
    }, [data, isPending])

    const handlePrev = () => {
        const currentModuleIndex = modules.findIndex((module) => module.subSection.some((lecture) => lecture._id === currentLecture._id));
        const currentLectureIndex = modules[currentModuleIndex].subSection.findIndex((lecture) => lecture._id === currentLecture._id);

        if (currentLectureIndex > 0) {
            setCurrentLecture(modules[currentModuleIndex].subSection[currentLectureIndex - 1])
        } else if (currentModuleIndex > 0) {
            const prevModule = modules[currentModuleIndex - 1]
            setCurrentLecture(prevModule.subSection[prevModule.subSection.length - 1])
            setOpenModuleIndex(currentModuleIndex - 1)
        }
    }

    const handleNext = () => {
        const currentModuleIndex = modules.findIndex((module) => module.subSection.some((lecture) => lecture._id === currentLecture._id));
        const currentLectureIndex = modules[currentModuleIndex].subSection.findIndex((lecture) => lecture._id === currentLecture._id);

        if (currentLectureIndex < modules[currentModuleIndex].subSection.length - 1) {
            setCurrentLecture(modules[currentModuleIndex].subSection[currentLectureIndex + 1])
        } else if (currentModuleIndex < modules.length - 1) {
            const nextModule = modules[currentModuleIndex + 1]
            setCurrentLecture(nextModule.subSection[0])
            setOpenModuleIndex(currentModuleIndex + 1)
        }
    }

    if (isPending) {
        return <div className='p-4 text-white'>Loading...</div>
    }

    return (
        <section className='min-h-screen bg-dark-100 p-4 w-full text-dark-950 relative'>
            <div className='mb-4 flex items-center justify-between'>
                <button onClick={() => navigate(-1)} className='flex items-center gap-x-2 hover:gap-x-3 transition-all duration-200 text-base lg:text-xl font-medium'>
                    <IoChevronBackOutline />
                    <h4>
                        {
                            courseDetails?.title
                        }
                    </h4>
                </button>
                <button className='lg:hidden' onClick={() => setMenuOpen(true)}>
                    <RiMenu3Line />
                </button>
            </div>

            <div className='flex gap-x-4 h-full w-full'>
                {/* VIDEO PANEL */}
                <div className='w-full h-full'>
                    {currentLecture ? (
                        <video
                            className='w-full rounded-md aspect-video'
                            controls
                            autoPlay
                            src={`${BASE_API_URL}/stream/lecture/${currentLecture?.video?.publicId?.split('/')[1]}`}
                        />
                    ) : (
                        <div className='aspect-video bg-dark-400 rounded-md animate-pulse'></div>
                    )}

                    <div className='text-dark-950'>
                        <h2 className='text-base lg:text-xl font-medium mt-4'>{currentLecture?.title}</h2>
                        <p className='text-xs md:text-sm mt-2 text-dark-800'>{currentLecture?.description}</p>
                    </div>

                    {/* CONTROLS */}
                    <div className={`${completedLectures?.includes(currentLecture?._id) ? "justify-end" : "justify-between"} flex items-center mt-4 w-full`}>
                        {
                            !completedLectures?.includes(currentLecture?._id) && (
                                <Button onClick={() => markAsCompleted({ subSectionId: currentLecture._id, courseId: id })}> Mark as completed</Button>
                            )
                        }
                        <div className='flex gap-x-2 self-end'>
                            <Button onClick={handlePrev} size='sm' ><MdOutlineKeyboardArrowLeft /></Button>
                            <Button onClick={handleNext} size='sm' ><MdOutlineKeyboardArrowRight /></Button>
                        </div>
                    </div>
                </div>

                {/* MODULE SIDEBAR */}
                <div className={`fixed flex flex-col gap-y-4 lg:static w-[350px] md:w-[45%] bg-dark-100 border-l border-dark-500 lg:shadow-none lg:border-none shadow-md shadow-dark-900 h-screen top-0 right-0 p-4 lg:px-2 lg:py-0 overflow-y-auto transition-translate duration-300 ${menuOpen ? "translate-x-0" : "translate-x-[100%]"}`}>
                    <div className='lg:hidden w-full text-lg mb-2 flex justify-end py-2'>
                        <button onClick={() => setMenuOpen(false)}><RiMenuUnfoldLine /></button>
                    </div>

                    <div className=''>
                        <div className='flex justify-between items-center text-xs md:text-sm mb-1'>
                            <p>progress</p>
                            <p>{progressPercentage}%</p>
                        </div>
                        <div className='h-2 rounded-full bg-dark-500 w-full'>
                            <div style={{ width: `${progressPercentage}%` }} className='h-2 bg-green-600 transition-all ease-in-out duration-1000'></div>
                        </div>
                    </div>

                    <div className='space-y-1'>
                        {modules.map((module, index) => (
                            <div key={module._id} className='bg-white border border-dark-600 text-dark-950 rounded-lg p-1 md:p-2'>
                                {/* Module Header */}
                                <div
                                    className='flex items-center justify-between gap-x-2 cursor-pointer px-2 py-1'
                                    onClick={() => setOpenModuleIndex(index === openModuleIndex ? null : index)}
                                >
                                    <h3 className='font-medium text-sm line-clamp-1 md:text-base'>{module?.sectionName}</h3>
                                    <span className={`text-base transition-rotate duration-100 ${!(index === openModuleIndex) ? "rotate-0" : "rotate-180"}`}>
                                        <MdKeyboardArrowDown />
                                    </span>
                                </div>

                                {/* Animated Lecture List */}
                                <AnimatePresence>
                                    {index === openModuleIndex && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className='mt-2 space-y-2 border-t border-dark-600 pt-2'
                                        >
                                            {module.subSection.map((lecture) => (
                                                <div
                                                    key={lecture._id}
                                                    className={`p-2 px-4 flex text-sm gap-x-2 justify-between items-center rounded cursor-pointer ${lecture._id === currentLecture?._id
                                                        ? 'bg-main-400 text-dark-50'
                                                        : 'hover:bg-dark-300'}`}
                                                    onClick={() => setCurrentLecture(lecture)}
                                                >
                                                    <p className='line-clamp-1 '>{lecture.title}</p>
                                                    {
                                                        completedLectures?.includes(lecture?._id) && (
                                                            <span className='bg-green-400 p-1 rounded-full'>
                                                                <IoCheckmarkDone className='text-dark-900 text-xs' />
                                                            </span>
                                                        )
                                                    }
                                                </div>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section >
    )
}

export default ViewCourse
