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
import { useNavigate } from 'react-router-dom'
import logo from '@/assets/logo/logo.png'

const formSchema = z.object({
    email: z.string().email({
        message: 'Invalid email address',
    }),
})

const ForgotPassword = () => {

    const { toast } = useToast();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: {
        errors,
    } } = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
        },
    })

    const { mutate, isPending } = useMutation({
        mutationFn: async (data) => {
            // console.log("data in mutation:", data);
            const response = await api.post('/auth/reset-password-token', data)
            return response.data
        },
        onSuccess: (data) => {
            // console.log("data : ", data);
            toast({
                title: 'Reset Link Sent',
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
                    <div className='my-6 p-4 md:p-6 bg-white border w-[440px] border-dark-700 rounded-md flex flex-col gap-y-2'>
                        <div className='flex flex-col items-center'>
                            <img src={logo} className='w-[160px] mb-4' alt="devnest" />
                            <h1 className='text-2xl  text-center font-medium mb-4'>Reset Password</h1>
                            <p className='text-sm text-center text-dark-700 mb-6'>Please enter your email to reset your password.</p>
                        </div>
                        <form onSubmit={handleSubmit(submitHandler)} className='w-full max-w-sm space-y-4'>
                            <div>
                                <InputField
                                    type='email'
                                    placeholder='Enter your email'
                                    icon={<MdOutlineMail className='text-main-400' />}
                                    {...register('email')}
                                />
                                {errors.email && <p className='text-red-500 mt-1 text-sm'>{errors.email.message}</p>}
                            </div>
                            <Button
                                disabled={isPending}
                                type='submit'
                                className='w-full'
                            >
                                {
                                    isPending ? 'Sending...' : 'Send Reset Link'
                                }
                            </Button>
                        </form>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default ForgotPassword