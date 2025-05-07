import React, { useState } from 'react';
import { RiArrowRightSFill } from "react-icons/ri";
import { MdOndemandVideo } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";
import { MdOutlineClose } from "react-icons/md";

const CourseContentCarousel = ({ data }) => {
    const [currentModule, setCurrentModule] = useState(data[0]);
    const [videoModal, setVideoModal] = useState(null)

    const toggleModule = (module) => {
        setCurrentModule(prev =>
            prev?._id === module?._id ? null : module
        );
    };

    return (
        <div className='border rounded-md overflow-hidden border-dark-500'>
            <h4 className='text-base bg-white font-medium px-4 py-3'>Course Content</h4>
            <div>
                {data?.map((module, i) => (
                    <div key={module?._id}>
                        <button
                            onClick={() => toggleModule(module)}
                            className='flex items-center font-medium justify-between px-4 gap-x-2 py-3 border-t bg-white border-dark-700 w-full'
                        >
                            <div className='space-x-2'>
                                <span className='text-xs'>{i + 1}</span>
                                <span className='text-sm'>{module?.sectionName}</span>
                            </div>
                            <div>
                                <RiArrowRightSFill
                                    className={`transform transition-transform duration-300 ${module?._id === currentModule?._id ? 'rotate-90' : ''
                                        }`}
                                />
                            </div>
                        </button>

                        <AnimatePresence initial={false}>
                            {module?._id === currentModule?._id && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className='overflow-hidden'
                                >
                                    <div className='px-4 py-2 border-t border-dark-600 bg-dark-200'>
                                        {module?.subSection?.map((lecture) => (
                                            <div key={lecture?._id} className='flex items-center py-2 justify-between gap-x-2'>
                                                <div className='flex gap-x-2 items-center'>
                                                    <MdOndemandVideo className='text-sm text-main-400' />
                                                    <span className='text-xs font-regular line-clamp-1'>{lecture?.title}</span>
                                                    {lecture?.isPreviewable && (
                                                        <button onClick={() => setVideoModal(lecture)} className='text-main-400 text-xs font-medium'>
                                                            Preview
                                                        </button>
                                                    )}
                                                </div>
                                                <div>
                                                    <p className='text-xs text-dark-700'>{lecture?.timeDuration}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
            {
                videoModal && <VideoModal data={videoModal} close={() => setVideoModal(null)} />
            }
        </div>
    );
};

const VideoModal = ({data, close}) => {
    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
            <div className='w-[640px] bg-white p-4 rounded-md shadow-md'>
                <div className='flex justify-between mb-4'>
                    <p className='text-base font-medium'>{data?.title}</p>
                    <button onClick={close}><MdOutlineClose /></button>
                </div>
                <video autoPlay controls className='w-full rounded-md aspect-video' src={data?.video?.url}></video>
            </div>
        </div>
    )
}

export default CourseContentCarousel;
