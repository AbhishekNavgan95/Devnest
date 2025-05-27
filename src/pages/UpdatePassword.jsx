import Container from '@/components/common/Container'
import InputField from '@/components/common/InputField'
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { MdOutlineMail } from "react-icons/md";
import { useMutation } from '@tanstack/react-query'
import { api } from '@/lib/utils'
import { useToast } from '@/hooks/use-toast'
import { useNavigate, useParams } from 'react-router-dom'
import logo from '@/assets/logo/logo.png'

const formSchema = z.object({
    token: z.string(),
    password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters" })
        .max(50, { message: "Password must be at most 50 characters" })
        .refine((val) => /[0-9]/.test(val), {
            message: "Password must include at least one number",
        })
        .refine((val) => /[!@#$%^&*(),.?\":{}|<>]/.test(val), {
            message: "Password must include at least one special character",
        }),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // This targets the confirmPassword field specifically
})

const UpdatePassword = () => {

    const { toast } = useToast();
    const navigate = useNavigate();
    const params = useParams();

    const { token } = params;

    const { register, handleSubmit, formState: {
        errors,
    } } = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: '',
            confirmPassword: '',
            token: token
        },
    })

    const { mutate, isPending } = useMutation({
        mutationFn: async (data) => {
            const response = await api.post('/auth/reset-password', data)
            return response.data
        },
        onSuccess: (data) => {
            // console.log("data : ", data);
            toast({
                title: 'Password Updated',
                description: data?.message || 'Please check your email for the reset link',
            })
            navigate('/login')
        },
        onError: (error) => {
            toast({
                title: 'Error',
                description: error.response.data.message,
                variant: 'destructive'
            })
        }
    })

    const submitHandler = async (data) => {
        // console.log("data submitted:", data);
        mutate(data);
    }

    return (
        <div>
            <Container>
                <div className='flex flex-col items-center justify-center my-44'>
                    <div className='my-6 p-4 md:p-6 bg-white border w-full max-w-[440px] border-dark-700 rounded-md flex flex-col gap-y-2'>
                        <div className='flex flex-col items-center'>
                            <img src={logo} className='w-[160px] mb-4' alt="devnest" />
                            <h1 className='text-2xl  text-center font-medium mb-4'>Create a new password</h1>
                            <p className='text-sm text-center text-dark-700 w-[80%] mx-auto mb-6'>Create a new password to continue with your Devnest account </p>
                        </div>
                        <form onSubmit={handleSubmit(submitHandler)} className='w-full max-w-sm space-y-4'>
                            <div>
                                <InputField
                                    type='password'
                                    placeholder='Enter your new password'
                                    icon={<MdOutlineMail className='text-main-400' />}
                                    {...register('password')}
                                />
                                {errors.password && <p className='text-red-500 mt-1 text-sm'>{errors.password.message}</p>}
                            </div>
                            <div>
                                <InputField
                                    type='password'
                                    placeholder='Confirm your new password'
                                    icon={<MdOutlineMail className='text-main-400' />}
                                    {...register('confirmPassword')}
                                />
                                {errors.confirmPassword && <p className='text-red-500 mt-1 text-sm'>{errors.confirmPassword.message}</p>}
                            </div>
                            <Button
                                disabled={isPending}
                                type='submit'
                                className='w-full'
                            >
                                {
                                    isPending ? 'Updating...' : 'Update Password'
                                }
                            </Button>
                        </form>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default UpdatePassword