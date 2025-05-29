import React from 'react'
import InputField from '../common/InputField'
import { MdOutlineDriveFileRenameOutline, MdOutlineAlternateEmail, MdOutlineMessage, MdAccountTree } from "react-icons/md";
import { Label } from '../ui/label';
import { MdOutlinePassword } from "react-icons/md";
import { Button } from '../ui/button';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { BASE_API_URL, BASE_URL } from '@/lib/utils';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';


const formSchema = z.object({
    firstName: z
        .string()
        .min(2, { message: "First name must be at least 2 characters" })
        .max(50, { message: "First name must be at most 50 characters" }),
    lastName: z
        .string()
        .min(2, { message: "Last name must be at least 2 characters" })
        .max(50, { message: "Last name must be at most 50 characters" }),
    email: z
        .string()
        .email({ message: "Please enter a valid email address" }),
    password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters" })
        .max(50, { message: "Password must be at most 50 characters" })
        .refine((val) => /[0-9]/.test(val), {
            message: "Password must include at least one number",
        })
        .refine((val) => /[!@#$%^&*(),.?":{}|<>]/.test(val), {
            message: "Password must include at least one special character",
        }),
    confirmPassword: z
        .string()
        .min(6, { message: "Confirm Password must be at least 6 characters" })
        .max(50, { message: "Confirm Password must be at most 50 characters" }),
    accountType: z.enum(['Student', 'Instructor'], {
        required_error: "Please select an account type",
    }),
})

const loginfn = async (data) => {
    const response = await axios.post(BASE_API_URL + '/auth/signup', data);
    return response.data;
}

const SignupForm = () => {

    const { toast } = useToast()
    const { mutate: signup, isPending } = useMutation({
        mutationFn: loginfn,
        onSuccess: (data) => {
            console.log(data)
            toast({
                title: 'Signup Successful',
                description: 'Check your email to verify your account',
            })
        },
        onError: (error) => {
            console.log(error)
            toast({
                title: 'Login Failed',
                description: error.response.data.message,
                variant: 'destructive'
            })
        }
    })

    const {
        register,
        handleSubmit,
        setError,
        getValues,
        watch,
        setValue,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            accountType: 'Student'
        }
    })

    const selectedType = watch('accountType');

    const submitHandler = (data) => {
        console.log(data)

        if (data?.password !== data?.confirmPassword) {
            setError('confirmPassword', {
                type: 'manual',
                message: 'Passwords do not match'
            })
            return
        }

        signup(data)
    }

    return (
        <form onSubmit={handleSubmit(submitHandler)} className='my-6 p-4 md:p-6 w-full bg-white border border-dark-700 rounded-md flex flex-col gap-y-4'>

            <div className='border border-dark-700 w-max flex items-center rounded-full overflow-hidden relative'>
                <button
                    type='button'
                    onClick={() => setValue('accountType', 'Student')}
                    className={`py-2 px-4 transition-all duration-200 relative z-[2] ${selectedType === 'Student' ? 'text-white' : ''}`}
                >
                    Student
                </button>
                <button
                    type='button'
                    onClick={() => setValue('accountType', 'Instructor')}
                    className={`py-2 px-4 transition-all duration-200 relative z-[2] ${selectedType === 'Instructor' ? 'text-white' : ''}`}
                >
                    Instructor
                </button>
                <div
                    className={`bg-main-400 w-full h-full z-[1] rounded-full transition-all duration-200 absolute inset-0 ${selectedType === 'Student' ? "translate-x-[-50%]" : "translate-x-[45%]"
                        }`}
                ></div>
            </div>


            <div className='flex items-center gap-x-4 w-full'>
                <div className='space-y-1 w-full'>
                    <Label>
                        First Name
                    </Label>
                    <InputField
                        type="text"
                        placeholder='First Name'
                        name='firstName'
                        {...register('firstName')}
                        id='firstName'
                        icon={<MdOutlineDriveFileRenameOutline />}
                    />
                    {
                        errors.firstName && (
                            <p className='text-red-500 text-xs'>{errors.firstName.message}</p>
                        )
                    }
                </div>

                <div className='space-y-1 w-full'>
                    <Label>
                        Last Name
                    </Label>
                    <InputField
                        type="text"
                        placeholder='Last Name'
                        name='test'
                        {...register('lastName')}
                        id='lastName'
                        icon={<MdOutlineDriveFileRenameOutline />}
                    />
                    {
                        errors.lastName && (
                            <p className='text-red-500 text-xs'>{errors.lastName.message}</p>
                        )
                    }
                </div>
            </div>

            <div className='space-y-1'>
                <Label>
                    Email
                </Label>
                <InputField
                    type="text"
                    placeholder='Email'
                    name='email'
                    {...register('email')}
                    id='email'
                    icon={<MdOutlineAlternateEmail />}
                />
                {
                    errors.email && (
                        <p className='text-red-500 text-xs'>{errors.email.message}</p>
                    )
                }
            </div>

            <div className='flex items-center gap-x-4 w-full'>
                <div className='space-y-1'>
                    <Label>
                        Password
                    </Label>
                    <InputField
                        type="password"
                        placeholder='Password'
                        name='Password'
                        {...register('password')}
                        id='Password'
                        icon={<MdOutlinePassword />}
                    />
                    {
                        errors.password && (
                            <p className='text-red-500 text-xs'>{errors.password.message}</p>
                        )
                    }
                </div>
                <div className='space-y-1'>
                    <Label>
                        Confirm Password
                    </Label>
                    <InputField
                        type="password"
                        placeholder='Confirm Password'
                        name='confirmPassword'
                        {...register('confirmPassword')}
                        id='confirmPassword'
                        icon={<MdOutlinePassword />}
                    />
                    {
                        errors.confirmPassword && (
                            <p className='text-red-500 text-xs'>{errors.confirmPassword.message}</p>
                        )
                    }
                </div>
            </div>

            <Button disabled={isPending}>
                {
                    isPending ? 'Signing up...' : 'Signup'
                }
            </Button>
        </form>
    )
}

export default SignupForm