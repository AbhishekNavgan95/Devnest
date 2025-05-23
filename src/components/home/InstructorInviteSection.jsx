import React from 'react'
import Container from '../common/Container'
import HilightText from '../common/HilightText'
import Instructor2 from '../../assets/images/Instructor1.png'
import Instructor1 from '../../assets/images/Instructor2.png'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'

const InstructorInviteSection = () => {

    const navigate = useNavigate();

    return (
        <Container>
            <div className='py-4 mb-4 px-4 lg:p-24 w-full flex flex-col lg:flex-row gap-x-16 gap-y-4'>

                <div className='text-start w-full lg:w-[50%] flex flex-col mt-8 gap-y-8'>
                    <h2 className='text-2xl lg:text-3xl text-center lg:text-start mb-4 font-medium leading-relaxed lg:leading-normal'>Join Devnest as an <HilightText className={'text-2xl lg:text-3xl py-1'}>Instructor</HilightText></h2>

                    <img src={Instructor1} alt="instructor" className='border hidden h-full lg:block border-dark-700 rounded-lg' />
                </div>

                <div className='flex w-full lg:w-[50%] flex-col items-center gap-y-8'>
                    <img src={Instructor2} alt="instructor" className='border border-dark-700 rounded-lg' />
                    <div className='border flex flex-col items-center lg:items-start'>
                        <p className='w-full lg:w-[80%] text-center lg:text-start text-lg mb-4 font-medium'>
                            Empower students, share your expertise, and make a lasting impact in an engaging, community environment.
                        </p>
                        <Button onClick={() => navigate('/signup')}>
                            Become an Instructor
                        </Button>
                    </div>
                </div>

            </div>
        </Container>
    )
}

export default InstructorInviteSection