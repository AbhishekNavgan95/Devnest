import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useLocation, useNavigate } from 'react-router-dom';
import { useCategoryStore } from '@/stores/useCategoryStore'
import CoursesLayoutNav from '../courses/CoursesLayoutNav';

const CoursesLayout = () => {

    const { categories } = useCategoryStore();

    const pathName = useLocation().pathname;
    const navigate = useNavigate();

    useEffect(() => {
        if (pathName === '/courses') {
            if (categories?.length > 0) {
                return navigate(`/courses/${categories[0]?._id}/${categories[0]?.topics[0]?._id}`)
            }
        }
    }, [pathName, categories, navigate])

    return (
        <div className='min-h-screen'>
            <CoursesLayoutNav />
            <Outlet />
        </div>
    )
}

export default CoursesLayout