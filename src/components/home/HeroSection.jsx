import { useNavigate } from 'react-router-dom'
import React, { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import HilightText from '../common/HilightText'
import Container from '../common/Container'
import hero1 from '../../assets/images/hero1.jpg'
import hero2 from '../../assets/images/hero2.png'
import hero3 from '../../assets/images/hero3.png'
import fill from '../../assets/images/Fill.png'
import { Button } from '../ui/button'

const HeroSection = () => {
    const [count, setCount] = useState(0)
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true }) // triggers only once
    const navigate = useNavigate();

    useEffect(() => {
        if (!isInView) return

        let start = 20
        const end = 100
        const duration = 2000
        const steps = 96
        const increment = Math.ceil((end - start) / steps)
        const intervalTime = duration / steps

        const counter = setInterval(() => {
            start += increment
            if (start >= end) {
                start = end
                clearInterval(counter)
            }
            setCount(start)
        }, intervalTime)

        return () => clearInterval(counter)
    }, [isInView])


    return (
        <div className='w-full py-12 lg:py-24'>
            <Container>
                <div className='flex flex-col lg:flex-row lg:items-end gap-x-14'>
                    {/* Left Section */}
                    <motion.div
                        className=' w-full lg:w-[50%]'
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                    >
                        <h2 className='text-main-400 text-sm lg:text-xl font-semibold'>Turn Passion into Progress</h2>
                        <h1 className='text-3xl lg:text-5xl leading-normal lg:leading-relaxed font-bold'>
                            We help you reach the <HilightText className={'text-3xl leading-normal lg:leading-relaxed sm:text-3xl lg:text-5xl'}>milestones</HilightText> you aim for
                        </h1>
                        <img className='w-full mt-6 lg:mt-12 max-h-[540px] object-cover border border-dark-600 object-center rounded-sm' src={hero1} alt="" />
                    </motion.div>

                    {/* Right Section */}
                    <motion.div
                        className='w-full lg:w-[50%] flex flex-col-reverse'
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
                    >
                        <div className='py-4 lg:py-16 flex flex-col gap-y-6 items-start'>
                            <p className='text-xl w-full lg:w-[60%]'>
                                Turn your ambitions into achievements with every course, project, and connection.
                            </p>
                            <Button  onClick={() => navigate('/signup')}>
                                Start Your Journey
                            </Button>
                        </div>

                        <div className='hidden lg:flex items-end gap-x-12 my-4'>
                            <motion.div
                                className='relative'
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.4, duration: 0.5 }}
                            >
                                <img src={hero2} alt="" />
                                <img src={fill} alt="" className='absolute -top-[20%] -right-[20%]' />
                            </motion.div>

                            <motion.img
                                src={hero3}
                                alt=""
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.5, duration: 0.5 }}
                            />
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    ref={ref} // 👈 attached ref here
                    className='flex flex-col-reverse lg:flex-row items-center gap-x-28 gap-y-8 mt-4 lg:mt-16'
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
                >
                    <p className='text-2xl lg:text-3xl lg:leading-snug lg:pr-14 text-center lg:text-start'>
                        Devnest gives you the tools to create, collaborate, and connect with thousands of learners
                    </p>

                    <div className='border w-full lg:w-max border-dark-700 bg-white flex flex-col items-center lg:items-start px-24 py-4 rounded-md lg:py-8'>
                        <p className='text-3xl lg:text-4xl font-semibold text-main-400'>
                            {count.toLocaleString()}+
                        </p>
                        <p className='text-nowrap text-sm lg:text-xl mt-2'>Active Learners</p>
                    </div>
                </motion.div>

            </Container >
        </div >
    )
}

export default HeroSection
