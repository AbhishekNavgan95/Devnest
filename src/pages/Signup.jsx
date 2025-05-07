import React from 'react'
import grid from '../assets/images/grid.png'
import signup from '../assets/images/signup.png'
import logo from '../assets/logo/logo.png'
import Container from '@/components/common/Container'
import HilightText from '@/components/common/HilightText'
import LoginForm from '@/components/login/LoginForm'
import { Link } from 'react-router-dom'
import SignupForm from '@/components/signup/SignupForm'

const Signup = () => {
  return (
    <Container>
      <div className='w-full py-44 flex items-center gap-x-14'>
        <div className='w-[50%]'>
          {/* <img src={logo} alt="devnest" className='w-[180px] mb-8' /> */}
          <h2 className='text-2xl font-medium'>Create an Account to  </h2>
          <h2 className='text-4xl mt-4 font-semibold'><HilightText className={'py-1'}>Get Started Today</HilightText></h2>
          <p className='mt-4 text-sm'>
            Join a dynamic learning platform built for curious minds—explore rich courses, connect with peers and mentors, and gain the skills you need to thrive in your field.
          </p>
          <SignupForm />
          <div className='flex gap-x-2 justify-center'>
            <p>Already have an Account?</p>
            <Link to='/login' className='text-main-400 font-medium'>
              Login
            </Link>
          </div>
        </div>
        <div className='w-1/2 flex items-center justify-center relative'>
          <img src={signup} className='w-[500px] border border-dark-700 rounded-md aspect-square relative z-[2] object-cover' alt="" />
          <img src={grid} className='w-[500px]  border-4 bg-black border-dark-700 rounded-md aspect-square absolute z-[1] inset-0 left-[50%] top-[2%] translate-x-[-48%]' alt="" />
        </div>
      </div>
    </Container>
  )
}

export default Signup