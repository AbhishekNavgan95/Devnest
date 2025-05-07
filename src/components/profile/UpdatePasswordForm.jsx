import React, { useState } from 'react'
import { Button } from '../ui/button'
import { IoMdClose } from 'react-icons/io'
import { Label } from '@radix-ui/react-label'
import InputField from '../common/InputField'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { MdPassword } from "react-icons/md";
import { useMutation } from '@tanstack/react-query'
import { api } from '@/lib/utils'
import { useToast } from '@/hooks/use-toast'

// Password pattern: At least one digit and one special character
const passwordPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])/;

const formSchema = z.object({
    oldPassword: z.string().min(8, {
        message: "Password must be at least 8 characters long",
    }).regex(passwordPattern, {
        message: "Must include at least one number and one special character",
    }),

    newPassword: z.string().min(8, {
        message: "Password must be at least 8 characters long",
    }).regex(passwordPattern, {
        message: "Must include at least one number and one special character",
    }),

    confirmPassword: z.string().min(8, {
        message: "Password must be at least 8 characters long",
    }),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
})

const updateUserPassword = async (data) => {
    const response = await api.put('/auth/changepassword', data)
    return response.data
}

const UpdatePasswordForm = () => {
    const [formOpen, setFormOpen] = useState(false)
    const { toast } = useToast();

    const { mutate: updatePassword, isPending, isError } = useMutation({
        mutationFn: updateUserPassword,
        onSuccess: (data) => {
            // console.log("data : ", data)
            if (data?.success) {
                toast({
                    title: "Success",
                    description: "Profile updated successfully",
                });
                reset();
                setFormOpen(false);
            } else {
                throw new Error(data?.message || "Something went wrong");
            }
        },
        onError: (error) => {
            console.log(error)
            toast({
                title: "Error",
                description: error.response?.data?.message || "Something went wrong",
                variant: "destructive"
            });
        }
    })

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
        }
    })

    const submitHandler = (data) => {
        updatePassword(data)
    }

    return (
        <>
            <Button size='lg' variant='outline' onClick={() => setFormOpen(true)}>
                Update Password
            </Button>
            {
                formOpen && (
                    <div onClick={() => setFormOpen(false)} className='fixed z-[10] inset-0 w-full h-screen bg-black/40 backdrop-blur-sm flex justify-center items-center'>
                        <div onClick={(e) => e.stopPropagation()} className='flex flex-col w-[440px] items-start p-8 bg-dark-50 rounded-md'>
                            <div className='flex items-start mb-4 w-full justify-between'>
                                <h4 className='text-2xl font-medium'>Update Password</h4>
                                <button onClick={() => setFormOpen(false)} className='text-2xl'><IoMdClose /></button>
                            </div>

                            <form className='w-full space-y-4' onSubmit={handleSubmit(submitHandler)}>
                                <div className='space-y-1 w-full'>
                                    <Label htmlFor='oldPassword'>Current Password</Label>
                                    <InputField
                                        type='password'
                                        id='oldPassword'
                                        placeholder='Enter your current password'
                                        {...register('oldPassword')}
                                        icon={<MdPassword />}
                                        error={errors.oldPassword?.message}
                                    />
                                    {
                                        errors.oldPassword && (
                                            <p className='text-red-500 text-xs'>{errors.oldPassword.message}</p>
                                        )
                                    }
                                </div>

                                <div className='space-y-1 w-full'>
                                    <Label htmlFor='newPassword'>New Password</Label>
                                    <InputField
                                        type='password'
                                        id='newPassword'
                                        placeholder='Enter your new password'
                                        {...register('newPassword')}
                                        icon={<MdPassword />}
                                        error={errors.newPassword?.message}
                                    />
                                    {

                                        errors.newPassword && (
                                            <p className='text-red-500 text-xs'>{errors.newPassword.message}</p>
                                        )
                                    }
                                </div>

                                <div className='space-y-1 w-full'>
                                    <Label htmlFor='confirmPassword'>Confirm New Password</Label>
                                    <InputField
                                        type='password'
                                        id='confirmPassword'
                                        placeholder='Re-enter your new password'
                                        {...register('confirmPassword')}
                                        icon={<MdPassword />}
                                        error={errors.confirmPassword?.message}
                                    />
                                    {
                                        errors.confirmPassword && (
                                            <p className='text-red-500 text-xs'>{errors.confirmPassword.message}</p>
                                        )
                                    }
                                </div>

                                <Button type='submit' size='lg' className='w-full mt-4'>
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

export default UpdatePasswordForm
