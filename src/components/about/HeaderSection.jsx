import React from 'react'
import Container from '../common/Container'
import HilightText from '../common/HilightText'
import AboutHero1 from '../../assets/images/aboutHero1.png'
import AboutHero2 from '../../assets/images/aboutHero2.png'
import Fill from '../../assets/images/Fill.png'
import { motion } from 'framer-motion'

const HeaderSection = () => {
    return (
        <Container>
            <div className='md:pt-24 md:pb-14 pt-8 pb-8'>

                {/* heading */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <h2 className='text-base font-medium mb-2 text-main-400'>About us</h2>
                    <h1 className='text-2xl md:text-5xl mb-2 md:mb-4 font-semibold'>
                        Empowering Every Step From Passion
                    </h1>
                    <div className='flex items-center gap-x-4'>
                    <h1 className='text-2xl md:text-5xl font-semibold'>
                            to <HilightText>Profession.</HilightText>
                        </h1>
                        <span className='flex items-center md:mt-4'>
                            <div className='w-[200px] h-[2px] bg-main-400'></div>
                            <div className='h-2 w-2 rounded-full bg-main-400'></div>
                        </span>
                    </div>
                </motion.div>

                {/* image section */}
                <motion.div
                    className='flex justify-start items-stretch relative rounded-xl my-4 md:my-8 py-4 gap-x-4 md:gap-x-8'
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <img src={AboutHero1} alt="" className='relative z-[2] h-full w-full' />
                    </motion.div>

                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1, delay: 0.4 }}
                        viewport={{ once: true }}
                    >
                        <img src={AboutHero2} alt="" className='relative z-[2] h-full w-full' />
                    </motion.div>

                    <motion.div
                        className='absolute -top-[20%] z-[1] right-[-5%]'
                        initial={{ opacity: 0, rotate: -15 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        transition={{ duration: 1.2, delay: 0.6 }}
                    >
                        <img src={Fill} className='w-24 md:w-auto' alt="" />
                    </motion.div>
                </motion.div>

                {/* paragraph */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <p className='text-sm md:text-xl mt-4 mx-auto md:w-[70%] text-center'>
                        At DevNest, we believe every learner, creator, and dreamer deserves a launchpad to turn their potential into real-world success.
                    </p>
                </motion.div>
            </div>
        </Container>
    )
}

export default HeaderSection
