import React, { useState } from 'react'
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";
import { useCourseFormStore } from '@/stores/useCourseFormStore';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../common/ConfirmationModal';
import { api } from '@/lib/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { BiCategory } from "react-icons/bi";

const deleteCourse = async (data) => {
    const res = await api.post('/course/deleteCourse', data)
    return res.data;
}

const CourseCard = ({
    course
}) => {

    const [confirmationModal, setConfirmationModal] = useState(null)
    const { setStep, step, edit, setEdit, setCourse } = useCourseFormStore()
    const navigate = useNavigate();
    const queryClient = useQueryClient()
    const { toast } = useToast();

    const { mutate: delteCoursefn, isPending } = useMutation({
        mutationFn: deleteCourse,
        onSuccess: (data) => {
            // console.log("data : ", data)
            queryClient.invalidateQueries({ queryKey: ['my-courses'] })
            toast({
                title: "Course Deleted Successfully",
                description: data?.message || "Course has been deleted successfully",
            })
        },
        onError: (error) => {
            // console.log("error : ", error)
            toast({
                title: "Error",
                description: "Something went wrong",
                variant: "destructive",
            })
        }
    })

    const handleDeleteCourse = () => {
        delteCoursefn({ courseId: course?._id })
        setConfirmationModal(null)
    }

    const editCourse = (course) => {
        console.log("course : ", course)
        setStep(1)
        setEdit(true)
        setCourse(course)
        navigate('/dashboard/create')
        setConfirmationModal(null)
    }

    return (
        <div className='border border-dark-600 bg-white overflow-hidden flex flex-col rounded-md'>
            <div className='relative'>
                <img src={course?.thumbnail?.url} className='w-full border-b border-dark-600 aspect-video object-cover' alt="" />
                <div className='w-full gap-x-2 flex justify-end items-center px-2 py-2 absolute top-0'>
                    <button onClick={() => setConfirmationModal({
                        heading: "Are you sure?",
                        subheading: "You are about to delete this course. This action cannot be undone.",
                        onClose: () => setConfirmationModal(null),
                        onConfirm: handleDeleteCourse,
                    })} className='border p-1 rounded-full bg-main-400 text-dark-100'><MdOutlineDelete /></button>
                    <button
                        onClick={() => setConfirmationModal({
                            heading: "Are you sure?",
                            subheading: "You are about to edit this course. You'll be redirected to another page.",
                            onClose: () => setConfirmationModal(null),
                            onConfirm: () => editCourse(course),
                        })}
                        className='border p-1 rounded-full bg-main-400 text-dark-100'
                    >
                        <CiEdit />
                    </button>
                </div>
            </div>
            <div className='flex flex-col border h-full justify-between px-2 py-2'>
                <div className='h-full'>
                    <h3 className='text-lg line-clamp-2 font-medium'>
                        {course?.title}
                    </h3>
                    <p className='text-sm text-dark-900 line-clamp-1 mt-1'>
                        {course?.description}
                    </p>
                </div>
                <div className='flex items-center mt-2 justify-between'>
                    <div className='flex justify-start gap-x-4 mt-1  items-center'>
                        <p className='text-sm flex items-center gap-x-1 font-thin line-clamp-1'>
                            <BiCategory />
                            {
                                course?.category?.name
                            }
                        </p>
                        <p className={`${course?.status === 'Draft' ? "text-red-500" : "text-green-500"} text-xs font-medium`}>
                            {
                                course?.status
                            }
                        </p>
                    </div>
                    <p className='flex gap-x-1 items-center font-semibold'>
                        <MdOutlineCurrencyRupee className='text-base ' /> {course?.price}
                        <span className='text-xs text-dark-600 line-through'>{course?.actualPrice}</span>
                    </p>
                </div>

            </div>
            {
                confirmationModal && (
                    <ConfirmationModal {...confirmationModal} />
                )
            }
        </div>
    )
}

export default CourseCard