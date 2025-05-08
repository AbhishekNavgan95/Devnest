import { useNavigate } from 'react-router-dom';
import React from 'react'
import InputField from '../common/InputField'
import { MdOutlineDriveFileRenameOutline, MdOutlineAlternateEmail, MdOutlineMessage } from "react-icons/md";
import { Label } from '../ui/label';
import { MdOutlinePassword } from "react-icons/md";
import { Button } from '../ui/button';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { BASE_API_URL, BASE_URL, NODE_ENV } from '@/lib/utils';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';
import { useUserStore } from '@/stores/useUserStore';
import { useAuthStore } from '@/stores/useAuthStore';

const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(50)
})

const loginfn = async (data) => {
    const response = await axios.post(BASE_API_URL + '/auth/login', data);
    return response.data;
}

const LoginForm = () => {

    const navigate = useNavigate()
    const { toast } = useToast()
    const { login: storeUserDataInState } = useUserStore()
    const { setToken } = useAuthStore();
    const { mutate: login, isPending } = useMutation({
        mutationFn: loginfn,
        onSuccess: (data) => {
            console.log(data)
            toast({
                title: 'Login Successful',
                description: 'You have been logged in successfully',
            })
            storeUserDataInState(data?.data)
            setToken(data.token)
            navigate('/')
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
        formState: { errors }
    } = useForm({
        resolver: zodResolver(formSchema),
    })

    const submitHandler = (data) => {
        // console.log(data)
        login(data)
    }

    return (
        <form onSubmit={handleSubmit(submitHandler)} className='my-6 p-6 w-full bg-white border border-dark-700 rounded-md flex flex-col gap-y-4'>
            <div className='space-y-1'>
                <Label>
                    Email
                </Label>
                <InputField
                    type="text"
                    placeholder='Email'
                    name='email'
                    {...register('email')}
                    id='name'
                    icon={<MdOutlineAlternateEmail />}
                />
                {
                    errors.email && (
                        <p className='text-red-500 text-xs'>{errors.email.message}</p>
                    )
                }
            </div>

            <div className='space-y-1'>
                <Label>
                    Password
                </Label>
                <InputField
                    type="password"
                    placeholder='Password'
                    name='email'
                    {...register('password')}
                    id='name'
                    icon={<MdOutlinePassword />}
                />
                {
                    errors.password && (
                        <p className='text-red-500 text-xs'>{errors.password.message}</p>
                    )
                }
            </div>

            <div>
                <Link to='/forgot-password'>
                    <p className='text-end text-sm text-main-400 font-medium'>Forgot Password?</p>
                </Link>
            </div>

            <Button disabled={isPending}>
                {
                    isPending ? 'Logging in...' : 'Login'
                }
            </Button>
        </form>
    )
}

export default LoginForm