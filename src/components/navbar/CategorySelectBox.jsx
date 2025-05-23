'use client'
import React, { useState } from 'react'
import { MdKeyboardArrowDown } from "react-icons/md"
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

const CategorySelectBox = ({ categories }) => {
    const [menuOpen, setMenuOpen] = useState(false)
    const [activeCategory, setActiveCategory] = useState(null)
    const [submenu, setSubmenu] = useState([])

    const hasCategories = Array.isArray(categories) && categories.length > 0

    const handleOpenMenu = () => {
        setMenuOpen(true)
        if (hasCategories) {
            const firstCategory = categories[0]
            setActiveCategory(firstCategory)
            setSubmenu(firstCategory?.topics || [])
        } else {
            setActiveCategory(null)
            setSubmenu([])
        }
    }

    const handleCloseMenu = () => {
        setMenuOpen(false)
        setSubmenu([])
        setActiveCategory(null)
    }

    return (
        <span
            className='relative inline-block z-10'
            onMouseLeave={handleCloseMenu}
            onBlur={handleCloseMenu}
        >
            <button
                onFocus={handleOpenMenu}
                onMouseEnter={handleOpenMenu}
                className='border h-9 bg-second-100 my-2 py-2 px-4 rounded-sm text-xs flex items-center gap-x-2 border-dark-600 font-medium focus:outline-none focus:ring-2 focus:ring-main-400'
            >
                Categories <MdKeyboardArrowDown className='inline' />
            </button>

            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 0 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 0 }}
                        transition={{ duration: 0.2 }}
                        className='flex absolute top-full border-dark-600 border bg-white shadow-md rounded-sm'
                    >
                        {
                            hasCategories ? (
                                <>
                                    {/* Left: Category List */}
                                    <motion.div
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -10 }}
                                        className='border max-w-[240px]'
                                    >
                                        {
                                            categories.map((category) => (
                                                <button
                                                    key={category._id}
                                                    onMouseOver={() => {
                                                        setActiveCategory(category)
                                                        setSubmenu(category.topics || [])
                                                    }}
                                                    className={`px-4 py-2 cursor-pointer border-l-4 text-left w-full text-sm ${activeCategory?.name === category.name ? "border-main-400 bg-second-100 font-semibold" : "border-transparent"}`}
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
                                        submenu?.length > 0 && (
                                            <motion.div
                                                initial={{ opacity: 0, x: 10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: 10 }}
                                                className='border min-w-[240px]'
                                            >
                                                {
                                                    submenu.map((topic, index) => (
                                                        <Link
                                                            to={`/courses/${activeCategory?._id}/${topic._id}`}
                                                            key={index}
                                                            className='px-4 flex items-center justify-between text-nowrap gap-x-4 py-2 cursor-pointer border-l-4 border-transparent hover:border-main-400 hover:bg-second-100 text-sm'
                                                        >
                                                            {topic.name}
                                                            <MdKeyboardArrowDown className='inline -rotate-90 text-xs' />
                                                        </Link>
                                                    ))
                                                }
                                            </motion.div>
                                        )
                                    }
                                </>
                            ) : (
                                <div className='p-4 px-6 text-sm text-dark-900'>
                                    <p className='text-nowrap'>
                                        No categories found.
                                    </p>
                                </div>
                            )
                        }
                    </motion.div>
                )}
            </AnimatePresence>
        </span>
    )
}

export default CategorySelectBox
