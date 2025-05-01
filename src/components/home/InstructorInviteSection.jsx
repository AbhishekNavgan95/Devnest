import React from 'react'
import Container from '../common/Container'
import HilightText from '../common/HilightText'
import Instructor from '@/assets/images/instructor.png'
import Instructor2 from '@/assets/images/instructor2.png'
import { Button } from '../ui/button'

const InstructorInviteSection = () => {
    return (
        <Container>
            <div className='px-24 py-24 w-full flex gap-x-16'>

                <div className='text-start w-[50%] flex flex-col mt-8 gap-y-8'>
                    <h2 className='text-3xl mb-4 font-medium leading-normal'>Join Devnest as an <HilightText className={'text-3xl py-1'}>Instructor</HilightText></h2>

                    <img src={Instructor} alt="instructor" className='border border-dark-700 rounded-lg' />
                </div>

                <div className='flex w-[50%] flex-col gap-y-8'>
                    <img src={Instructor2} alt="instructor" className='border border-dark-700 rounded-lg' />
                    <div>
                        <p className='w-[80%] text-lg mb-4 font-medium'>
                            Empower students, share your expertise, and make a lasting impact in an engaging, community environment.
                        </p>
                        <Button>
                            Become an Instructor
                        </Button>
                    </div>
                </div>

            </div>
        </Container>
    )
}

export default InstructorInviteSection