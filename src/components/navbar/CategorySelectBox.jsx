'use client'
import React, { useState } from 'react'
import { MdKeyboardArrowDown } from "react-icons/md"
import { categories } from '@/lib/data'
import { motion, AnimatePresence } from 'framer-motion'

const CategorySelectBox = () => {
    const [menuOpen, setMenuOpen] = useState(false)
    const [activeCategory, setActiveCategory] = useState(null)
    const [submenu, setSubmenu] = useState([])

    return (
        <span
            className='relative inline-block z-10'
            onMouseLeave={() => {
                setMenuOpen(false)
                setSubmenu([])
                setActiveCategory(null)
            }}
            onBlur={() => {
                setMenuOpen(false)
                setSubmenu([])
                setActiveCategory(null)
            }}
        >
            <button
                onFocus={() => {
                    setMenuOpen(true)
                    setActiveCategory(categories[0])
                    setSubmenu(categories[0].topics)
                }}
                onMouseEnter={() => {
                    setMenuOpen(true)
                    setActiveCategory(categories[0])
                    setSubmenu(categories[0].topics)
                }}
                className='border h-9 bg-second-100 my-2 py-2 px-4 rounded-sm text-xs flex items-center gap-x-2 border-dark-600 font-medium focus:outline-none focus:ring-2 focus:ring-main-400'
            >
                Categories <MdKeyboardArrowDown className='inline' />
            </button>

            <AnimatePresence>
                {
                    menuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 0 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 0 }}
                            transition={{ duration: 0.2 }}
                            className='flex absolute top-full border-dark-600 border'
                        >
                            {/* Left: Category List */}
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                className='border  max-w-[240px] rounded-sm bg-white shadow-md'
                            >
                                {
                                    categories.map((category) => (
                                        <button
                                            key={category.id}
                                            onMouseOver={() => {
                                                setActiveCategory(category)
                                                setSubmenu(category.topics)
                                            }}
                                            className={`px-4 py-2 cursor-pointer border-l-4 text-left w-full text-sm
                        ${activeCategory?.name === category.name ? "border-main-400 bg-second-100 font-semibold" : "border-transparent"}
                      `}
                                        >
                                            <div className="flex justify-between items-center text-nowrap gap-x-2">
                                                {category.name}
                                                <MdKeyboardArrowDown className='inline -rotate-90 text-xs' />
                                            </div>
                                        </button>
                                    ))
                                }
                            </motion.div>

                            {/* Right: Submenu Topics */}
                            {
                                submenu.length > 0 && (
                                    <motion.div
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 10 }}
                                        className='border min-w-[240px] rounded-sm bg-white shadow-md'
                                    >
                                        {
                                            submenu.map((topic, index) => (
                                                <div
                                                    key={index}
                                                    className='px-4 flex items-center justify-between text-nowrap gap-x-4 py-2 cursor-pointer border-l-4 border-transparent hover:border-main-400 hover:bg-second-100 text-sm'
                                                >
                                                    {topic}
                                                    <MdKeyboardArrowDown className='inline -rotate-90 text-xs' />
                                                </div>
                                            ))
                                        }
                                    </motion.div>
                                )
                            }
                        </motion.div>
                    )
                }
            </AnimatePresence>
        </span>
    )
}

export default CategorySelectBox
