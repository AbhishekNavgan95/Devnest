import { useUserStore } from '@/stores/useUserStore'
import React, { useState } from 'react'
import { Button } from '../ui/button';
import { IoMdClose } from 'react-icons/io';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Rating } from 'react-simple-star-rating';
import { Label } from '../ui/label';
import TextAreaField from '../common/TextAreaField ';
import { VscPreview } from "react-icons/vsc";
import { useMutation, useQueries, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Variable } from 'lucide-react';

const formSchema = z.object({
    rating: z.number()
        .min(1, 'Rating must be at least 1')
        .max(5, 'Rating must be at most 5'),
    review: z.string()
        .min(50, 'Review must be at least 50 character'),
    courseId: z.string()
        .min(1, 'Course ID must be at least 1 character')
})

const postReview = async (data) => {
    const response = await api.post('/course/createRating', data);
    return response.data
}

const CreateRating = ({
    courseId
}) => {

    const { toast } = useToast();
    const queryClient = useQueryClient()
    const [formOpen, setFormOpen] = useState(false)

    const { register, setValue, reset, getValues, handleSubmit, watch, formState: { errors } } = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            rating: 0,
            review: '',
            courseId: courseId,
        }
    })

    const { mutate: addReview, isPending } = useMutation({
        mutationFn: postReview,
        onSuccess: (data) => {
            toast({
                title: "Review added",
                description: data?.message || 'Review added successfully',
            })
            reset();
            queryClient.invalidateQueries('courseDetails')
            setFormOpen(false)
        },
        onError: (error) => {
            toast({
                title: "Failed to add review",
                description: error?.response?.data?.message || "Something went wrong",
                variant: 'destructive'
            })
        }
    })

    const rating = watch('rating')

    const submitHandler = (data) => {
        addReview(data);
    }

    return (
        <>
            <Button onClick={() => setFormOpen(true)}>
                Rate course
            </Button>
            {
                formOpen && (
                    <div onClick={() => setFormOpen(false)} className='fixed z-[10] inset-0 w-full h-screen bg-black/40 backdrop-blur-sm flex justify-center items-center'>
                        <div onClick={(e) => e.stopPropagation()} className='flex flex-col w-[440px] items-start m-2 p-4 md:p-6 bg-dark-50 rounded-md'>
                            <div className='flex items-start mb-4 w-full justify-between'>
                                <h4 className='text-xl font-medium'>Rate the course</h4>
                                <button onClick={() => setFormOpen(false)} className='text-xl'><IoMdClose /></button>
                            </div>
                            <form onSubmit={handleSubmit(submitHandler)} className='w-full'>
                                <div className='flex justify-center w-full'>
                                    <Rating
                                        val={rating}
                                        initialValue={0}
                                        size={32}
                                        onClick={(val) => setValue('rating', val)}
                                    />
                                </div>
                                <div>
                                    <Label>Review</Label>
                                    <TextAreaField
                                        rows={4}
                                        resize={false}
                                        icon={<VscPreview />}
                                        {
                                        ...register('review')
                                        }
                                        className=''
                                    />
                                    {
                                        errors.review && <span className='text-red-500 text-xs'>
                                            {
                                                errors?.review?.message
                                            }
                                        </span>
                                    }
                                </div>
                                <Button disabled={isPending} type='submit' className='mt-4 w-full'>
                                    {
                                        isPending ? "Submitting..." : "Submit"
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

export default CreateRating