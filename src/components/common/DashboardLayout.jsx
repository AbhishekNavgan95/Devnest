import React from 'react'
import ProtectedRoutes from './ProtectedRoutes'
import DashboardSidebar from './DashboardSidebar'

const DashboardLayout = ({
    children
}) => {
    return (
        <ProtectedRoutes>
            <div className='flex max-h-screen w-full'>
                <DashboardSidebar />
                <div className='overflow-y-auto w-full p-14'>
                    {children}
                </div>
            </div>
        </ProtectedRoutes>
    )
}

export default DashboardLayout