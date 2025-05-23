import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LuArrowRightFromLine } from "react-icons/lu"
import Container from '../common/Container'
import image1 from '../../assets/profiles/image1.png'
import image2 from '../../assets/profiles/image2.png'
import image3 from '../../assets/profiles/image3.png'
import image4 from '../../assets/profiles/image4.png'
import image5 from '../../assets/profiles/image5.png'
import image6 from '../../assets/profiles/image6.png'
import image7 from '../../assets/profiles/image7.png'
import image8 from '../../assets/profiles/image8.png'
import image9 from '../../assets/profiles/image9.png'
import image10 from '../../assets/profiles/image10.png'

const testimonials = [
    {
        name: "Logan Pierce",
        role: "Certified DevOps Engineer",
        message: "Devnest has made learning incredibly engaging. With structured DevOps content, hands-on labs, and vibrant community support, I was able to truly understand CI/CD workflows. It’s more than just tutorials—it's a full ecosystem designed to push learners toward real-world readiness and collaboration.",
        image: image1
    },
    {
        name: "Ethan Brooks",
        role: "Frontend Developer",
        message: "I always felt lost between tutorials and YouTube rabbit holes, but Devnest gave me a structured path. From React basics to deploying full-fledged apps, I now understand how to build scalable UIs. The mentorship and community support gave me clarity and real confidence.",
        image: image2
    },
    {
        // girl
        name: "Claire Bennett",
        role: "Product Designer",
        message: "The design journey with Devnest has been delightful. From color theory to Figma components and user testing, I’ve grown immensely. Weekly critiques and design challenges gave me real-world feedback, and today my portfolio is stronger, more meaningful, and way more polished than ever before.",
        image: image3
    },
    {
        name: "Noah West",
        role: "Backend Intern at FinEdge",
        message: "Devnest helped me bridge the gap between learning and doing. I moved from basic Express.js to building secure REST APIs and integrating databases in a few weeks. The checkpoints and quizzes kept me accountable and reinforced key concepts I use daily in my internship.",
        image: image8
    },
    {
        // girl
        name: "Elena Cross",
        role: "Fullstack Engineer",
        message: "I used to binge tutorials endlessly but never actually built anything meaningful. Now, I confidently work on full-stack projects, and I've finally built apps I’m genuinely proud to deploy and showcase. The supportive community and hands-on approach reignited my passion for coding.",
        image: image4
    },
    {
        name: "Mason Blake",
        role: "Data Science Learner",
        message: "Machine learning seemed scary at first, but Devnest made it feel doable. The beginner-friendly breakdowns, visual guides, and step-by-step Jupyter notebooks helped me create real models. I no longer fear terms like regression or overfitting, and I’ve started building mini DS projects confidently.",
        image: image6
    },
    {
        // girl
        name: "Ava Mitchell",
        role: "Student & Freelance Designer",
        message: "Thanks to Devnest, I got my first freelance gig! The platform helped me improve my design thinking and visual storytelling. Real-world assignments, feedback from peers, and helpful mentors made all the difference. And the Discord community is always buzzing with creativity and support.",
        image: image7
    },
    {
        name: "Caleb Rhodes",
        role: "Cloud Dev Intern",
        message: "Devnest isn’t just another course site—it’s an experience. I got to demo projects, participate in live sessions, and connect with experts. It felt like a virtual campus with friends, mentors, and projects that actually matter. I gained both technical skills and presentation confidence.",
        image: image5
    },
    {
        // girl
        name: "Isla Harper",
        role: "UI/UX Intern",
        message: "Devnest’s design courses are gold. From wireframes to building full design systems in Figma, I learned the entire process. Within a month, I landed an internship, thanks to the projects I built here. The way everything is explained feels modern, actionable, and industry-ready.",
        image: image9
    },
    {
        name: "Liam Hayes",
        role: "Career Switcher – Ex-Mechanical Engg",
        message: "Coming from a non-tech background, I was skeptical. Devnest turned that around. The roadmap was beginner-friendly yet robust. I built projects, contributed to open source, and gained confidence in both frontend and backend. Now I’m coding daily and actually loving the career switch.",
        image: image10
    }
];


const TestimonialsSection = () => {
    const [index, setIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % testimonials.length)
        }, 5000)
        return () => clearInterval(interval)
    }, [])

    const goBack = () => {
        setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    }

    const goNext = () => {
        setIndex((prev) => (prev + 1) % testimonials.length)
    }

    const currentCard = testimonials[index]

    return (
        <div className='bg-second-100 mt-12'>
            <Container>
                <div className='w-full flex flex-col-reverse lg:flex-row items-center gap-x-20 gap-y-12 px-4 py-16 lg:p-24 '>
                    <div className='lg:w-[40%] w-full flex flex-col items-center lg:items-end gap-y-4'>
                        <div>
                            <h4 className='text-center lg:text-end text-3xl lg:text-4xl font-normal'>Growth Stories</h4>
                            <h4 className='text-center lg:text-end text-3xl lg:text-4xl font-semibold text-main-400 mt-1'>Unfiltered</h4>
                        </div>
                        <p className='text-end text-sm'>Genuine journeys, proudly shared</p>
                        <div className='flex items-center gap-x-2'>
                            <button onClick={goBack} className='p-2 border bg-white border-dark-700 rounded-full text-xl'>
                                <LuArrowRightFromLine className='rotate-180' />
                            </button>
                            <button onClick={goNext} className='p-2 border bg-white border-dark-700 rounded-full text-xl'>
                                <LuArrowRightFromLine />
                            </button>
                        </div>
                    </div>

                    <div className='w-full lg:w-[60%] relative'>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: 0 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 0 }}
                                transition={{ duration: 0.2 }}
                                className='flex flex-col gap-y-4'
                            >
                                <div className='flex gap-x-4 justify-center lg:justify-start items-center'>
                                    <img
                                        src={currentCard.image}
                                        alt='testimonial-user'
                                        className=' w-12 h-12 lg:w-24 lg:h-24 object-cover rounded-full border-2 border-dark-700'
                                        loading='lazy'
                                    />
                                    <div>
                                        <h5 className='text-lg font-semibold'>{currentCard.name}</h5>
                                        <p className='text-sm text-gray-600'>{currentCard.role}</p>
                                    </div>
                                </div>
                                <p className='text-base lg:text-lg mt-2 text-dark-800 text-center lg:text-start font-semibold'>" {currentCard.message} "</p>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default TestimonialsSection