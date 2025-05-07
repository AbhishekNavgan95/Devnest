import React from 'react'
import ProtectedRoutes from './ProtectedRoutes'
import DashboardSidebar from './DashboardSidebar'

const DashboardLayout = ({
    children
}) => {
    return (
        <ProtectedRoutes>
            <div className='flex flex-col lg:flex-row max-h-screen w-full'>
                <DashboardSidebar />
                <div className='overflow-y-auto w-full p-4 lg:p-14'>
                    {children}
                </div>
            </div>
        </ProtectedRoutes>
    )
}

export default DashboardLayout