import React, { useState } from 'react'
import { Button } from '../ui/button'
import { MdOutlineDriveFileRenameOutline } from 'react-icons/md'
import { IoMdClose } from 'react-icons/io'
import { Label } from '@radix-ui/react-label'
import InputField from '../common/InputField'
import TextAreaField from '../common/TextAreaField '
import { LuText } from 'react-icons/lu'
import { Switch } from '../ui/switch'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { api, BASE_API_URL } from '@/lib/utils'
import { MdOutlineCloudUpload } from "react-icons/md"
import { useCourseFormStore } from '@/stores/useCourseFormStore'

const formSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(1, 'Description is required'),
    isPreviewable: z.boolean(),
    video: z.union([z.instanceof(File), z.string()]).optional(),
    sectionId: z.string(),
    subSectionId: z.string(),
})

const EditSubSectionForm = ({
    subSectionId,
    sectionId,
    title,
    description,
    isPreviewable,
    video,
}) => {

    const [formOpen, setFormOpen] = useState(false)
    const { course, setCourse } = useCourseFormStore()
    const [LectureVideo, setLectureVideo] = useState(video?.url)

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        clearErrors,
        reset,
        watch,
    } = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            sectionId,
            subSectionId,
            title,
            description,
            isPreviewable,
            // video,
        }
    })

    // const LectureVideo = watch('video')
    const previewable = watch('isPreviewable')

    const { mutate: updateLecture, isPending } = useMutation({
        mutationFn: async (formData) => {
            const response = await api.post('/course/updateSubSection', formData)
            return response.data
        },
        onSuccess: (data) => {
            const updatedContent = course?.courseContent?.map(section => {
                if (section._id === sectionId) {
                    return {
                        ...section,
                        subSection: section.subSection.map(ss =>
                            ss._id === subSectionId ? data.data : ss
                        )
                    }
                }
                return section
            })
            setCourse({ ...course, courseContent: updatedContent })
            setFormOpen(false)
        },
        onError: (err) => {
            console.error("Error updating subsection:", err)
        }
    })

    const onSubmit = (data) => {
        const formData = new FormData()
        formData.append('title', data.title)
        formData.append('description', data.description)
        formData.append('isPreviewable', data.isPreviewable)
        formData.append('sectionId', data.sectionId)
        formData.append('subSectionId', data.subSectionId)

        if (data.video instanceof File) {
            formData.append('video', data.video)
        }

        updateLecture(formData)
    }

    return (
        <>
            <Button onClick={() => setFormOpen(true)} className='hover:bg-transparent' variant='ghost' size='icon'>
                <MdOutlineDriveFileRenameOutline />
            </Button>

            {
                formOpen && (
                    <div onClick={() => setFormOpen(false)} className='fixed z-[10] inset-0 w-full h-screen bg-black/40 backdrop-blur-sm flex justify-center items-center'>
                        <div onClick={(e) => e.stopPropagation()} className='flex flex-col w-[640px] items-start mx-2 p-4 md:p-8 bg-dark-50 rounded-md'>
                            <div className='flex items-start mb-4 w-full justify-between'>
                                <h4 className='text-2xl font-medium'>Edit Lecture</h4>
                                <button onClick={() => setFormOpen(false)} className='text-2xl'><IoMdClose /></button>
                            </div>

                            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-y-4 w-full'>
                                <div className='space-y-1'>
                                    <Label htmlFor='title'>Lecture title</Label>
                                    <InputField
                                        type='text'
                                        placeholder='Lecture title'
                                        name='title'
                                        {...register('title')}
                                        id='title'
                                    />
                                    {errors.title && <span className='text-red-500 text-sm'>{errors.title.message}</span>}
                                </div>

                                <div className='space-y-1'>
                                    <Label htmlFor='description'>Description</Label>
                                    <TextAreaField
                                        rows={4}
                                        type='text'
                                        placeholder='Lecture description'
                                        name='description'
                                        id='description'
                                        {...register('description')}
                                    />
                                    {errors.description && <span className='text-red-500 text-sm'>{errors.description.message}</span>}
                                </div>

                                <div className='w-full'>
                                    <input
                                        type='file'
                                        id='video'
                                        accept='video/*'
                                        className='hidden'
                                        onChange={(e) => {
                                            setValue('video', e.target.files[0])
                                            setLectureVideo(URL.createObjectURL(e.target.files[0]))
                                            clearErrors('video')
                                        }}
                                    />
                                    <Label htmlFor='video' className='cursor-pointer'>
                                        <p className='text-sm mb-2'>Lecture Video</p>
                                        <div className='w-full min-h-[200px] border border-dark-800 bg-dark-400 rounded-lg flex items-center justify-center'>
                                            {
                                                LectureVideo ? (
                                                    <video src={LectureVideo} controls ></video>
                                                ) : (
                                                    <div className='flex flex-col items-center'>
                                                        <MdOutlineCloudUpload className='text-4xl' />
                                                        <p className='text-xs text-dark-900'>
                                                            Select a video
                                                        </p>
                                                        <p className='text-xs text-dark-900'>
                                                            (Max 100MB)
                                                        </p>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </Label>
                                    {
                                        errors.video && <span className='text-red-500 text-sm'>{errors.video.message}</span>
                                    }
                                    {
                                        LectureVideo && (
                                            <button type='button' onClick={() => {
                                                setValue('video', undefined)
                                                setLectureVideo(undefined)
                                            }} className='text-sm text-red-500 mt-2'>Remove Video</button>
                                        )
                                    }
                                </div>

                                <div className='space-x-2'>
                                    <Switch
                                        checked={previewable}
                                        onCheckedChange={(val) => setValue('isPreviewable', val)}
                                        id='isPreviewable'
                                    />
                                    <Label htmlFor='isPreviewable' className='text-sm'>Mark as Demo Lecture?</Label>
                                </div>

                                <Button type='submit' disabled={isPending} className='mt-4'>
                                    {isPending ? "Updating..." : "Update Lecture"}
                                </Button>
                            </form>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default EditSubSectionForm
