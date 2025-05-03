import React from 'react'
import Container from '../common/Container'
import { IoArrowBack } from "react-icons/io5"
import { motion } from 'framer-motion'

const StorySection = () => {
    return (
        <Container>
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                <h4 className='mb-8'>
                    <div>
                        <h1 className='text-5xl font-semibold text-start flex gap-x-2'>
                            Our <span className='text-main-400 flex gap-x-2 items-center'>
                                Story
                                <motion.span
                                    initial={{ rotate: -45  , opacity: 0 }}
                                    whileInView={{ rotate: 0, opacity: 1 }}
                                    transition={{ duration: 0.6, delay: 0.3 }}
                                    viewport={{ once: true }}
                                >
                                    <IoArrowBack className='rotate-[225deg]' />
                                </motion.span>
                            </span>
                        </h1>
                    </div>
                    <motion.p
                        className='text-2xl font-light my-8 text-start leading-relaxed'
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        Once upon a time, in a small room lit only by a laptop screen and ambition, a spark was born.
                        It wasn't just about coding; it was about chasing a dream bigger than the lines of code themselves.
                        Over nights of failed deployments, bug hunts, and breakthroughs, DevNest quietly took flight —
                        built on grit, community, and endless curiosity. Today, it’s more than a platform; it’s a launchpad
                        for dreamers and doers. A place where passion turns into projects, and projects into impact.
                        DevNest exists to prove one thing: even the smallest sparks can ignite incredible journeys.
                    </motion.p>
                </h4>
            </motion.div>
        </Container>
    )
}

export default StorySection
