import React from 'react'
import Container from '../common/Container'
import { PiStudentDuotone } from "react-icons/pi";
import { SiGitconnected } from "react-icons/si";
import { MdOutlineArrowOutward } from "react-icons/md";
import { GoGraph } from "react-icons/go";

const goals = [
    {
        icon: PiStudentDuotone,
        title: "Empower Through Learning"
    },
    {
        icon: SiGitconnected,
        title: "Foster Meaningful Connections"
    },
    {
        icon: MdOutlineArrowOutward,
        title: "Create Real-World Opportunities"
    },
    {
        icon: GoGraph,
        title: "Grow With Integrity and Passion"
    },
]

const OurGoals = () => {
    return (
        <Container>
            <div className='py-14 px-12 lg:px-24'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    <div className='col-span-1 md:col-span-2 py-14 flex flex-col items-end justify-center px-8'>
                        <h4 className='text-end font-semibold text-2xl md:text-3xl mb-4'>
                            "Connecting Passion With Purpose"
                        </h4>
                        <p className='text-end text-sm md:text-base md:w-[80%] text-dark-800'>
                            A platform where passion meets practice, and every learner becomes a changemaker.
                        </p>
                    </div>

                    {
                        goals.map((goal, index) => ( 
                            <div key={index} className={`${index & 1? "bg-white": "bg-main-400 text-dark-50"} w-full aspect-square p-8 border border-dark-500`}>
                                <div className='flex flex-col gap-y-4 items-start justify-end h-full'>
                                    <goal.icon className='text-5xl' />
                                    <h4 className='text-2xl font-medium'>{goal.title}</h4>
                                </div>
                            </div>
                        ))
                    }


                </div>
            </div>
        </Container>
    )
}

export default OurGoals