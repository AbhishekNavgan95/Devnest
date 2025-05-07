import React, { useState } from 'react'
import { Label } from '../ui/label'
import InputField from '../common/InputField'
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import TextAreaField from '../common/TextAreaField ';
import { LuText } from "react-icons/lu";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { z } from 'zod';
import WhatsIncluded from './WhatsIncluded';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import WhatYouWillLearn from './WhatYouWillLearn';
import WhoThisCourseIsFor from './WhoThisCourseIsFor';
import Requirements from './Requirements';
import Tags from './Tags';
import { Button } from '../ui/button';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import FAQsInput from './FAQsInput';
import { MdOutlineCloudUpload } from "react-icons/md";
import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { useCourseFormStore } from '@/stores/useCourseFormStore';

const fileSchema = z.union([
    z.instanceof(File),
    z.string().url().min(1, 'Required'),
]);

const formSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(1, 'Description is required'),
    price: z.string().min(1, 'Price is required'),
    actualPrice: z.string().min(1, 'Actual price is required'),
    tags: z.array(z.string()).min(1, 'Tags is required'),
    topicId: z.string().min(1, 'Topic is required'),
    faqs: z.array(
        z.object({
            question: z.string().min(1, 'Question is required'),
            answer: z.string().min(1, 'Answer is required'),
        })
    ).min(1, 'FAQs are required'),
    whatYouWillLearn: z.array(z.string()).min(1, 'What you will learn is required'),
    whoThisCourseIsFor: z.array(z.string()).min(1, 'Who this course is for is required'),
    requirements: z.array(z.string()).min(1, 'Requirements is required'),
    whatsIncluded: z.array(z.string()).min(1, 'What is included is required'),
    thumbnail: fileSchema,
    intro: fileSchema
})

const createCoursefn = async (data) => {
    const response = await api.post('/course/createCourse', data)
    // console.log("response : ", response);
    return response.data
}

const updateCourseFn = async ({ id, data }) => {
    const response = await api.post(`/course/editCourse/${id}`, data);
    return response.data;
};

const CreateCourseForm = ({ topics }) => {

    const { toast } = useToast();
    const { setStep, edit, step, setEdit, course, setCourse } = useCourseFormStore()

    const { mutate: createCourse, isPending, isError } = useMutation({
        mutationFn: createCoursefn,
        onSuccess: (data) => {
            if (data?.success) {
                // console.log("Course created successfully : ", data.data)
                setStep(2);
                setCourse(data.data);
                toast({
                    title: "Course created successfully",
                    description: "Course created successfully",
                })
                reset()
                setValue('thumbnail', null)
                setValue('intro', null)
                setValue('whatYouWillLearn', [])
                setValue('whoThisCourseIsFor', [])
                setValue('requirements', [])
                setValue('whatsIncluded', [])
                setValue('faqs', [])
                setValue('tags', [])
                setValue('topicId', null)
            }
            console.log(data)
        },
        onError: (error) => {
            console.log(error)
            toast({
                title: "Error",
                description: "Something went wrong",
                variant: "destructive"
            })
        }
    })

    const { mutate: updateCourse, isPending: isEditPending } = useMutation({
        mutationFn: updateCourseFn,
        onSuccess: (data) => {
            if (data?.success) {
                setCourse(data.data);
                setStep(2)
                toast({
                    title: "Course created successfully",
                    description: "Course created successfully",
                })
                reset()
                setValue('thumbnail', null)
                setValue('intro', null)
                setValue('whatYouWillLearn', [])
                setValue('whoThisCourseIsFor', [])
                setValue('requirements', [])
                setValue('whatsIncluded', [])
                setValue('faqs', [])
                setValue('tags', [])
                setValue('topicId', null)
            }
        },
        onError: () => {
            toast({
                title: "Error updating course",
                description: "Please try again later.",
                variant: "destructive"
            });
        }
    });

    // console.log("course : ", course)

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        getValues,
        reset,
        watch,
        setError,
        clearErrors
    } = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: edit && course ? course?.title : '',
            description: edit && course ? course?.description : '',
            price: edit && course ? String(course.price) : '',
            actualPrice: edit && course ? String(course.actualPrice) : '',
            topicId: edit && course ? course.category?._id || course?.category : '',
            tags: edit && course ? course.tags : [],
            faqs: edit && course ? course?.faqs : [],
            whatYouWillLearn: edit && course ? course?.whatYouWillLearn : [],
            whoThisCourseIsFor: edit && course ? course?.whoThisCourseIsFor : [],
            requirements: edit && course ? course?.requirements : [],
            whatsIncluded: edit && course ? course?.whatsIncluded : [],
            thumbnail: edit && course ? course?.thumbnail?.url : null,
            intro: edit && course ? course?.introVideo?.url : null
        }
    })

    const submitHandler = (data) => {
        if (Number(data.actualPrice) > Number(data.price)) {
            setError('actualPrice', {
                type: 'manual',
                message: 'discounted price cannot be greater than actual price'
            })
            return
        }

        console.log(data)
        const formData = new FormData();

        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('price', data.price);
        formData.append('actualPrice', data.actualPrice);
        formData.append('topicId', data.topicId);

        formData.append('tags', JSON.stringify(data.tags));
        formData.append('faqs', JSON.stringify(data.faqs));
        formData.append('whatYouWillLearn', JSON.stringify(data.whatYouWillLearn));
        formData.append('whoThisCourseIsFor', JSON.stringify(data.whoThisCourseIsFor));
        formData.append('requirements', JSON.stringify(data.requirements));
        formData.append('whatsIncluded', JSON.stringify(data.whatsIncluded));

        formData.append('thumbnail', data.thumbnail);
        formData.append('intro', data.intro);

        if (edit && course?._id) {
            updateCourse({ id: course._id, data: formData });
        } else {
            createCourse(formData);
        }
    }

    const thumbnail = watch('thumbnail')
    const intro = watch('intro')
    const topicId = watch('topicId')
    const whatsIncluded = watch('whatsIncluded')
    const whatYouWillLearn = watch('whatYouWillLearn')
    const whoThisCourseIsFor = watch('whoThisCourseIsFor')
    const requirements = watch('requirements')
    const faqs = watch('faqs')
    const tags = watch('tags')

    return (
        <form onSubmit={handleSubmit(submitHandler)} className='w-full border flex flex-col gap-y-4 border-dark-600 bg-white py-4 px-4 lg:px-8 rounded-md'>
            <h2 className="text-xl font-bold">{edit ? 'Edit Course' : 'Create Course'}</h2>
            {/* title */}
            <div className='space-y-1'>
                <Label htmlFor='title'>Course Title</Label>
                <InputField
                    type="text"
                    {...register('title')}
                    placeholder="Enter course title"
                    icon={<MdOutlineDriveFileRenameOutline />}
                    name={'title'}
                    id={'title'}
                />
                {errors.title && <p className='text-red-500 text-sm'>{errors.title.message}</p>}
            </div>

            {/* description */}
            <div className='space-y-1'>
                <Label htmlFor='description'>Course Description</Label>
                <TextAreaField
                    type="text"
                    rows={5}
                    {...register('description')}
                    placeholder="Enter course title"
                    icon={<LuText />}
                    name={'description'}
                    id={'description'}
                />
                {errors.description && <p className='text-red-500 text-sm'>{errors.description.message}</p>}
            </div>

            {/* topics */}
            <div className='space-y-1'>
                <Label htmlFor='topicId'>Topic</Label>
                <Select value={topicId} onValueChange={(val) => {
                    setValue('topicId', val)
                    clearErrors('topicId')
                }}>
                    <SelectTrigger className="w-full border text-sm border-dark-600 text-dark-800 bg-white">
                        <SelectValue placeholder="Select a Topic" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Select a topic</SelectLabel>
                            {
                                topics?.map((topic, index) => (
                                    <SelectItem key={index} value={topic?._id}>{topic.name}</SelectItem>
                                ))
                            }
                        </SelectGroup>
                    </SelectContent>
                </Select>
                {
                    errors.topicId && <p className='text-red-500 text-sm'>{errors.topicId.message}</p>
                }
            </div>

            {/* price */}
            <div className='flex gap-x-4 w-full'>
                <div className='space-y-1 w-full'>
                    <Label htmlFor='price'>Price</Label>
                    <InputField
                        type="number"
                        {...register('price')}
                        placeholder="Course Price"
                        icon={<MdOutlineCurrencyRupee />}
                        name={'price'}
                        id={'price'}
                    />
                    {errors.price && <p className='text-red-500 text-sm'>{errors.price.message}</p>}
                </div>


                <div className='space-y-1 w-full'>
                    <Label htmlFor='actualPrice'>Discounted Price</Label>
                    <InputField
                        type="number"
                        {...register('actualPrice')}
                        placeholder="Discounted Price"
                        icon={<MdOutlineCurrencyRupee />}
                        name={'actualPrice'}
                        id={'actualPrice'}
                    />
                    {errors.actualPrice && <p className='text-red-500 text-sm'>{errors.actualPrice.message}</p>}
                </div>
            </div>

            {/* thumbnail */}
            <div className='w-full'>
                <input type="file"
                    onChange={(e) => {
                        setValue('thumbnail', e.target.files[0])
                        clearErrors('thumbnail')
                    }}
                    className='hidden'
                    accept='image/*'
                    id='thumbnail'
                    name='thumbnail'
                />
                <Label htmlFor='thumbnail' className='cursor-pointer overflow-hidden rounded-md w-full' >
                    <p className='mb-2'>
                        Thumbnail
                    </p>
                    <div className='w-full min-h-[200px] overflow-hidden border border-dark-800 bg-dark-400 rounded-lg'>
                        {
                            thumbnail ? (
                                <img loading='lazy' src={typeof thumbnail === 'string' ? thumbnail : URL.createObjectURL(thumbnail)} className='max-h-[280px] w-full object-cover object-center' alt="thumbnail" />
                            ) : (
                                <div className='min-h-[200px] flex flex-col items-center justify-center'>
                                    <MdOutlineCloudUpload className='text-4xl' />
                                    <p className='text-xs text-dark-900'>
                                        Select a thumbnail
                                    </p>
                                    <p className='text-xs text-dark-900'>
                                        (Max 5MB)
                                    </p>
                                </div>
                            )
                        }
                    </div>
                </Label>
                {
                    thumbnail && (
                        <span className='text-xs w-full text-dark-900'>
                            {thumbnail.name}
                        </span>
                    )
                }
                {
                    thumbnail && (
                        <button onClick={() => setValue('thumbnail', undefined)} className='w-full text-sm mt-2 text-red-500'>Remove</button>
                    )
                }
                {
                    errors.thumbnail && <p className='text-red-500 mt-1 text-sm'>{errors.thumbnail.message}</p>
                }
            </div>

            {/* Intro */}
            <div className='w-full'>
                <input type="file"
                    onChange={(e) => {
                        setValue('intro', e.target.files[0])
                        clearErrors('intro')
                    }}
                    accept='video/*'
                    className='hidden'
                    id='intro'
                    name='intro'
                />
                <Label htmlFor='intro' className='cursor-pointer w-full overflow-hidden rounded-md' >
                    <p className='mb-2 text-sm'>
                        Introduction Video
                    </p>
                    <div className='w-full min-h-[200px] overflow-hidden border border-dark-800 bg-dark-400 rounded-lg'>
                        {
                            intro ? (
                                <video controls className='h-full w-full' loading='lazy' src={typeof intro === 'string' ? intro : URL.createObjectURL(intro)} alt="intro"></video>
                            ) : (
                                <div className='min-h-[200px] flex flex-col items-center justify-center'>
                                    <MdOutlineCloudUpload className='text-4xl' />
                                    <p className='text-xs text-dark-900'>
                                        Select a Introduction video
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
                    intro && (
                        <span className='text-xs w-full text-dark-900'>
                            {intro.name}
                        </span>
                    )
                }
                {
                    intro && (
                        <button onClick={() => setValue('intro', undefined)} className='w-full text-sm mt-2 text-red-500'>Remove</button>
                    )
                }
                {
                    errors.intro && <p className='text-red-500 mt-1 text-sm'>{errors.intro.message}</p>
                }
            </div>

            <WhatsIncluded setValue={setValue} getValues={getValues} whatsIncluded={whatsIncluded} errors={errors} clearErrors={clearErrors} />

            <WhatYouWillLearn setValue={setValue} getValues={getValues} whatYouWillLearn={whatYouWillLearn} errors={errors} clearErrors={clearErrors} />

            <WhoThisCourseIsFor setValue={setValue} getValues={getValues} whoThisCourseIsFor={whoThisCourseIsFor} errors={errors} clearErrors={clearErrors} />

            <Requirements setValue={setValue} getValues={getValues} requirements={requirements} errors={errors} clearErrors={clearErrors} />

            <Tags setValue={setValue} getValues={getValues} errors={errors} tags={tags} clearErrors={clearErrors} />

            <FAQsInput setValue={setValue} getValues={getValues} errors={errors} faqs={faqs} clearErrors={clearErrors} />

            <div className='flex justify-end gap-x-4'>
                {
                    edit &&
                    <Button type='button' onClick={() => {
                        setStep(step + 1)
                        setEdit(false)
                    }} size='lg' variant='outline'>
                        Skip
                    </Button>
                }
                <Button size='lg' type="submit" disabled={isPending || isEditPending}>
                    {
                        edit ? isPending ? "Updating..." : "Update" : isPending ? "Creating..." : "Create"
                    }
                </Button>
            </div>
        </form>
    )
}

export default CreateCourseForm