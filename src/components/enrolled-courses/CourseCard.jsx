import { useUserStore } from '@/stores/useUserStore';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const CourseCard = ({ course }) => {
    const navigate = useNavigate();
    const { user } = useUserStore();

    const completedLectures = user?.courseProgress?.find((progress) => progress?.courseId === course?._id)?.completedVideos?.length || 0;

    const totalVideos = course?.courseContent?.reduce((acc, module) => acc + (module?.subSection?.length || 0), 0);

    const progressPercent = totalVideos > 0 ? Math.round((completedLectures / totalVideos) * 100) : 0;

    return (
        <Link
            to={`/view-course/${course?._id}`}
            className="flex flex-col cursor-pointer border bg-white border-dark-500 max-w-[360px] rounded-md shadow-sm hover:shadow-dark-900 transition-shadow duration-200 overflow-hidden"
        >
            <img src={course?.thumbnail?.url} className="aspect-video rounded-t-md" alt={course?.title} />
            <div className="px-4 pt-2 pb-4">
                <h3 className="text-lg font-medium line-clamp-1">{course?.title}</h3>
                <p className="text-dark-700 text-sm w-max line-clamp-1">{course?.category?.name}</p>
                <p className="text-xs mt-1">
                    {course?.instructor?.firstName} {course?.instructor?.lastName}
                </p>

                <div className="mt-3">
                    <div className='flex text-xs justify-between mb-1'>
                        <p>Progress: </p>
                        <p>{progressPercent}%</p>
                    </div>
                    <div className="w-full h-1 bg-gray-200 rounded-full">
                        <div
                            className="h-1 bg-main-400 rounded-full transition-all duration-300"
                            style={{ width: `${progressPercent}%` }}
                        ></div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default CourseCard;
