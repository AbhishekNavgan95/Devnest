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
        <div className='w-full py-24'>
            <Container>
                <div className='flex gap-x-14'>
                    {/* Left Section */}
                    <motion.div
                        className='w-[50%]'
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                    >
                        <h2 className='text-main-400 text-xl font-semibold'>Welcome to Devnest</h2>
                        <h1 className='text-5xl leading-relaxed font-bold'>
                            We help you reach the <HilightText className={'text-5xl'}>milestones</HilightText> you aim for.
                        </h1>
                        <img className='w-full mt-12 rounded-sm' src={hero1} alt="" />
                    </motion.div>

                    {/* Right Section */}
                    <motion.div
                        className='w-[50%] flex flex-col-reverse'
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
                    >
                        <div className='py-16 flex flex-col gap-y-6 items-start'>
                            <p className='text-xl w-[60%]'>
                                Turn your ambitions into achievements with every course, project, and connection.
                            </p>
                            <Button>
                                Start Your Journey
                            </Button>
                        </div>

                        <div className='flex items-end gap-x-12 my-4'>
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
                    className='flex items-center gap-x-28 mt-16'
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
                >
                    <p className='text-3xl leading-snug pr-14'>
                        Devnest gives you the tools to create, collaborate, and connect with thousands of learners
                    </p>

                    <div className='border border-dark-700 bg-white flex flex-col items-start px-24 py-8'>
                        <p className='text-4xl font-semibold text-main-400'>
                            {count.toLocaleString()}+
                        </p>
                        <p className='text-nowrap text-xl mt-2'>Active Learners</p>
                    </div>
                </motion.div>

            </Container >
        </div >
    )
}

export default HeroSection
