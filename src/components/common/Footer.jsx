import React from 'react'
import logo from '@/assets/logo/logo.png'
import { FaLinkedinIn } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import Container from './Container';

const Footer = () => {
  return (
    <footer className='w-full py-14 bg-main-950'>
      <div className='max-w-[1400px] mx-auto'>
        <div className='flex items-start justify-between gap-x-20'>
          {/* logo + links */}
          <div className='flex flex-col items-start'>
            <img src={logo} width={200} alt="" />
            <div className='flex text-dark-50 text-base mt-6 gap-x-4'>
              {/* links */}
              <a href="">
                <FaLinkedinIn />
              </a>
              <a href="">
                <BsTwitterX />
              </a>
              <a href="">
                <FaFacebookF />
              </a>
              <a href="">
                <FaInstagram />
              </a>
            </div>
          </div>

          {/* middle part */}
          <div className='flex items-start gap-x-20'>
            {/* pages */}
            <div className='flex flex-col text-sm items-start gap-y-4 text-white'>
              <h6 className=' font-medium'>
                Pages
              </h6>
              <div className='flex flex-col items-start gap-y-4 text-dark-600'>
                <a href="">
                  Home
                </a>
                <a href="">
                  Explore
                </a>
                <a href="">
                  Community
                </a>
                <a href="">
                  About Us
                </a>
                <a href="">
                  Contact Us
                </a>
              </div>
            </div>


            {/* langugaes */}
            <div className='flex flex-col text-sm items-start gap-y-4 text-white'>
              <h6 className=' font-medium'>
                Languages
              </h6>
              <div className='flex flex-col items-start gap-y-4 text-dark-600'>
                <a href="">
                  C
                </a>
                <a href="">
                  C++
                </a>
                <a href="">
                  Java
                </a>
                <a href="">
                  JavaScript
                </a>
                <a href="">
                  Python
                </a>
                <a href="">
                  Rust
                </a>
                <a href="">
                  Go
                </a>
                <a href="">
                  Kotlin
                </a>
                <a href="">
                  Ruby
                </a>
                <a href="">
                  Swift
                </a>
              </div>
            </div>

            {/* categories */}
            <div className='flex flex-col text-sm items-start gap-y-4 text-white'>
              <h6 className=' font-medium'>
                Categories
              </h6>
              <div className='flex flex-col items-start gap-y-4 text-dark-600'>
                <a href="">
                  App Development
                </a>
                <a href="">
                  Web Development
                </a>
                <a href="">
                  DevOps
                </a>
                <a href="">
                  Data Science
                </a>
                <a href="">
                  AI & ML
                </a>
                <a href="">
                  Frontend Development
                </a>
                <a href="">
                  Backend Development
                </a>
                <a href="">
                  Open Source
                </a>
              </div>
            </div>

            {/* Commnunity */}
            <div className='flex flex-col text-sm items-start gap-y-4 text-white'>
              <h6 className=' font-medium'>
                Community
              </h6>
              <div className='flex flex-col items-start gap-y-4 text-dark-600'>
                <a href="">
                  Discord
                </a>
                <a href="">
                  Linked
                </a>
                <a href="">
                  Reddit
                </a>
                <a href="">
                  Twitter
                </a>
                <a href="">
                  GitHub
                </a>
              </div>
            </div>
          </div>

          {/* line */}
          <div className='w-[1px] h-[200px] bg-dark-800'></div>

          {/* right part */}
          <div className='flex items-start gap-x-20'>
            {/* Resources */}
            <div className='flex flex-col text-sm items-start gap-y-4 text-white'>
              <h6 className=' font-medium'>
                Resources
              </h6>
              <div className='flex flex-col items-start gap-y-4 text-dark-600'>
                <a href="">
                  Blog
                </a>
                <a href="">
                  Documentation
                </a>
                <a href="">
                  Tutorials
                </a>
                <a href="">
                  FAQ
                </a>
                <a href="">
                  Roadmap
                </a>
              </div>
            </div>

            {/* Company */}
            <div className='flex flex-col text-sm items-start gap-y-4 text-white'>
              <h6 className=' font-medium'>
                Company
              </h6>
              <div className='flex flex-col items-start gap-y-4 text-dark-600'>
                <a href="">
                  Careers
                </a>
                <a href="">
                  Privacy Policy
                </a>
                <a href="">
                  Terms of Service
                </a>
                <a href="">
                  Partners
                </a>
                <a href="">
                  Support
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* footer bottomsection */}
        <div>

        </div>
      </div>
    </footer>
  )
}

export default Footer