import React from 'react'
import grid from '@/assets/images/grid.png'
import login from '@/assets/images/login.png'
import logo from '@/assets/logo/logo.png'
import Container from '@/components/common/Container'
import HilightText from '@/components/common/HilightText'
import LoginForm from '@/components/login/LoginForm'
import { Link } from 'react-router-dom'

const Login = () => {
    return (
        <Container>
            <div className='w-full py-44 flex flex-row-reverse items-center gap-x-14'>
                <div className='w-[50%]'>
                    <h2 className='text-4xl mb-4 font-semibold'><HilightText className={'py-1'}>Welcome Back,</HilightText></h2>
                    <h2 className='text-2xl font-medium'>Ready to Learn Something New? </h2>
                    <p className='mt-4 text-sm'>
                        Log in to continue your personalized learning experience, track your course progress, connect with instructors, join discussions, and access all your saved content in one place.
                    </p>
                    <LoginForm />
                    <div className='flex gap-x-2 justify-center'>
                        <p>Don't have an account yet?</p>
                        <Link to='/signup' className='text-main-400 cursor-pointer font-medium'> 
                            Sign Up
                        </Link>
                    </div>
                </div>
                <div className='w-1/2 flex items-center justify-center relative'>
                    <img src={login} className='w-[500px] border border-dark-700 rounded-md aspect-square relative z-[2] object-cover' alt="" />
                    <img src={grid} className='w-[500px]  border-4 bg-black border-dark-700 rounded-md aspect-square absolute z-[1] inset-0 left-[50%] top-[2%] translate-x-[-48%]' alt="" />
                </div>
            </div>
        </Container>
    )
}

export default Login