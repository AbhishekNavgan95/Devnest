import React from 'react'
import logo from '../../assets/logo/logo.png'
import { FaLinkedinIn, FaFacebookF, FaInstagram } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="w-full px-4 py-14 bg-main-950 text-sm text-white">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col lg:flex-row justify-between gap-10 lg:gap-20">

          {/* Left Section: Logo and Social Links */}
          <div className="flex flex-col items-center md:items-start mb-10 lg:mb-0">
            <img src={logo} width={160} alt="Logo" />
            <div className="flex text-dark-50 text-base mt-6 gap-4">
              <a href=""><FaLinkedinIn /></a>
              <a href=""><BsTwitterX /></a>
              <a href=""><FaFacebookF /></a>
              <a href=""><FaInstagram /></a>
            </div>
          </div>

          {/* Main Footer Grid Content */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 w-full">

            {/* Pages */}
            <div>
              <h6 className="font-semibold mb-4">Pages</h6>
              <ul className="space-y-2 text-dark-600">
                <li><a href="">Home</a></li>
                <li><a href="">Explore</a></li>
                <li><a href="">Community</a></li>
                <li><a href="">About Us</a></li>
                <li><a href="">Contact Us</a></li>
              </ul>
            </div>

            {/* Languages */}
            <div>
              <h6 className="font-semibold mb-4">Languages</h6>
              <ul className="space-y-2 text-dark-600">
                {['C', 'C++', 'Java', 'JavaScript', 'Python', 'Rust', 'Go', 'Kotlin', 'Ruby', 'Swift'].map(lang => (
                  <li key={lang}><a href="">{lang}</a></li>
                ))}
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h6 className="font-semibold mb-4">Categories</h6>
              <ul className="space-y-2 text-dark-600">
                {[
                  'App Development', 'Web Development', 'DevOps',
                  'Data Science', 'AI & ML', 'Frontend Development',
                  'Backend Development', 'Open Source'
                ].map(cat => (
                  <li key={cat}><a href="">{cat}</a></li>
                ))}
              </ul>
            </div>

            {/* Community */}
            <div>
              <h6 className="font-semibold mb-4">Community</h6>
              <ul className="space-y-2 text-dark-600">
                <li><a href="">Discord</a></li>
                <li><a href="">LinkedIn</a></li>
                <li><a href="">Reddit</a></li>
                <li><a href="">Twitter</a></li>
                <li><a href="">GitHub</a></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h6 className="font-semibold mb-4">Resources</h6>
              <ul className="space-y-2 text-dark-600">
                <li><a href="">Blog</a></li>
                <li><a href="">Documentation</a></li>
                <li><a href="">Tutorials</a></li>
                <li><a href="">FAQ</a></li>
                <li><a href="">Roadmap</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h6 className="font-semibold mb-4">Company</h6>
              <ul className="space-y-2 text-dark-600">
                <li><a href="">Careers</a></li>
                <li><a href="">Privacy Policy</a></li>
                <li><a href="">Terms of Service</a></li>
                <li><a href="">Partners</a></li>
                <li><a href="">Support</a></li>
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom Section (optional for copyright, etc.) */}
        <div className="mt-10 border-t border-dark-800 pt-6 text-center text-dark-500 text-xs">
          © {new Date().getFullYear()} Tutorial Heaven. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer
