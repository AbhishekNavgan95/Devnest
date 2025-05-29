import React from 'react'
import Container from '../common/Container'
import { FaLinkedinIn } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import ContactUsForm from './ContactUsForm';

const ContactUsSection = () => {
    return (
        <Container>
            <div id='ContactUs' className='pt-4 md:pt-14 pb-12 md:pb-24 w-full flex flex-col lg:flex-row gap-x-14'>
                {/* links */}
                <div className='w-full lg:w-[50%] my-4'>
                    <h4 className='text-4xl font-medium mb-4'>Get in touch with us</h4>
                    <div className='flex gap-x-8 mt-8'>
                        <div className='flex flex-col gap-4'>
                            <span className='text-xl p-3 cursor-pointer hover:text-main-400 transition-colors duration-200 border border-dark-700 w-max rounded-sm bg-white'>
                                <FaLinkedinIn />
                            </span>
                            <span className='text-xl p-3 cursor-pointer hover:text-main-400 transition-colors duration-200 border border-dark-700 w-max rounded-sm bg-white'>
                                <BsTwitterX />
                            </span>
                            <span className='text-xl p-3 cursor-pointer hover:text-main-400 transition-colors duration-200 border border-dark-700 w-max rounded-sm bg-white'>
                                <FaFacebookF />
                            </span>
                            <span className='text-xl p-3 cursor-pointer hover:text-main-400 transition-colors duration-200 border border-dark-700 w-max rounded-sm bg-white'>
                                <FaInstagram />
                            </span>
                        </div>
                        <p className='text-xl leading-relaxed'>
                            Stuck somewhere or have something to share? Drop us a message and we’ll get right back to you.
                        </p>
                    </div>
                </div>

                {/* form */}
                <ContactUsForm />
            </div>
        </Container>
    )
}

export default ContactUsSection