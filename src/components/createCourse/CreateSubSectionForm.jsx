import React, { useState } from 'react'
import { Button } from '../ui/button'
import { FiPlusCircle } from 'react-icons/fi'
import { Label } from '@radix-ui/react-label'
import InputField from '../common/InputField'
import { MdOutlineCloudUpload, MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { IoMdClose } from 'react-icons/io'
import TextAreaField from '../common/TextAreaField '
import { LuText } from 'react-icons/lu'
import { Switch } from '../ui/switch'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCourseFormStore } from '@/stores/useCourseFormStore'
import { useMutation } from '@tanstack/react-query'
import { api } from '@/lib/utils'

const formSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(1, 'Description is required'),
    isPreviewable: z.boolean(),
    video: z.instanceof(File, { message: 'Video is required' }),
    sectionId: z.string().min(1, 'Section ID is required'),
})

const CreateSubSectionForm = ({
    sectionId,
}) => {

    const [formOpen, setFormOpen] = useState(false)
    const { course, setCourse } = useCourseFormStore();

    const { mutate: createLecture, isPending } = useMutation({
        mutationFn: async (data) => {
            const response = await api.post('/course/addSubSection', data)
            return response.data
        },
        onSuccess: (data) => {
            const updatedContent = course?.courseContent?.map(section => {
                if (section._id === sectionId) {
                    return {
                        ...section,
                        subSection: [...section.subSection, data.data]
                    }
                }
                return section
            })
            const updatedCourse = { ...course, courseContent: updatedContent }
            setCourse(updatedCourse)
            setFormOpen(false)
            reset();
        },
        onError: (error) => {
            // console.log("error : ", error)
        }
    })

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        clearErrors,
        reset,
        watch
    } = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            sectionId: sectionId,
            title: '',
            description: '',
            isPreviewable: false,
            video: null,
        }
    })

    const LectureVideo = watch('video')
    const isPreviewable = watch('isPreviewable')

    const submitHandler = (data) => {
        // console.log("data : ", data);
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('isPreviewable', data.isPreviewable);
        formData.append('video', data.video);
        formData.append('sectionId', data.sectionId);

        createLecture(formData);
    }

    return (
        <>
            <Button
                onClick={() => setFormOpen(!formOpen)}
                variant='ghost'
                className='px-0 flex items-center text-main-400'
                size='sm'
            >
                <FiPlusCircle /> Add Lecture
            </Button>
            {
                formOpen && (
                    <div onClick={() => setFormOpen(false)} className='fixed z-[10] inset-0 w-full h-screen bg-black/40 backdrop-blur-sm flex justify-center items-center'>
                        <div onClick={(e) => e.stopPropagation()} className='flex flex-col w-[640px] items-start m-2 p-4 md:p-8 bg-dark-50 rounded-md'>
                            <div className='flex items-start mb-4 w-full justify-between'>
                                <h4 className='text-2xl font-medium'>Create a new lecture</h4>
                                <button onClick={() => setFormOpen(false)} className='text-2xl'><IoMdClose /></button>
                            </div>
                            <form onSubmit={handleSubmit(submitHandler)} className='flex flex-col gap-y-4 w-full'>
                                <div className='space-y-1'>
                                    <Label htmlFor='title'>Lecture title</Label>
                                    <InputField
                                        type='text'
                                        placeholder='Lecture title'
                                        name='title'
                                        {...register('title')}
                                        id='title'
                                        icon={<MdOutlineDriveFileRenameOutline />}
                                    />
                                    {
                                        errors.title && <span className='text-red-500 mt-1 text-sm'>
                                            {errors.title.message}
                                        </span>
                                    }
                                </div>

                                <div className='space-y-1'>
                                    <Label htmlFor='description'>Description</Label>
                                    <TextAreaField
                                        rows={4}
                                        type='text'
                                        {...register('description')}
                                        placeholder='Lecture title'
                                        name='description'
                                        id='description'
                                        icon={<LuText />}
                                    />
                                    {
                                        errors.description && <span className='text-red-500 mt-1 text-sm'>
                                            {errors.description.message}
                                        </span>
                                    }
                                </div>

                                {/* lecture video */}
                                <div className='w-full'>
                                    <input type="file"
                                        onChange={(e) => {
                                            setValue('video', e.target.files[0])
                                            clearErrors('video')
                                        }}
                                        accept='video/*'
                                        className='hidden'
                                        id='intro'
                                        name='intro'
                                    />
                                    <Label htmlFor='intro' className='cursor-pointer w-full overflow-hidden rounded-md' >
                                        <p className='mb-2 text-sm'>
                                            Lecture Video
                                        </p>
                                        <div className='w-full min-h-[200px] overflow-hidden border border-dark-800 bg-dark-400 rounded-lg'>
                                            {
                                                LectureVideo ? (
                                                    <video controls className='h-full aspect-video w-full' loading='lazy' src={URL.createObjectURL(LectureVideo)} alt="intro"></video>
                                                ) : (
                                                    <div className='min-h-[200px] flex flex-col items-center justify-center'>
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
                                        LectureVideo && (
                                            <span className='text-xs w-full text-dark-900'>
                                                {LectureVideo.name}
                                            </span>
                                        )
                                    }
                                    {
                                        LectureVideo && (
                                            <button onClick={() => setValue('video', undefined)} className='w-full text-sm mt-2 text-red-500'>Remove</button>
                                        )
                                    }
                                    {
                                        errors.video && <p className='text-red-500 mt-1 text-sm'>{errors.video.message}</p>
                                    }
                                </div>

                                <div className='space-x-2'>
                                    <Switch
                                        checked={isPreviewable}
                                        onCheckedChange={(val) => setValue('isPreviewable', val)}
                                        id="isPreviewable"
                                    />
                                    <Label className='cursor-pointer text-sm' htmlFor="isPreviewable">Mark as Demo Lecture?</Label>
                                </div>

                                <Button type='submit' disabled={isPending} className='mt-4'>
                                    {
                                        isPending ? "Creating Lecture..." : "Create Lecture"
                                    }
                                </Button>
                            </form>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default CreateSubSectionForm