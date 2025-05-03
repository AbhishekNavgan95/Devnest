import React, { useEffect } from 'react'
import { useNavigate, Outlet, useLocation } from 'react-router-dom'

const Dashboard = () => {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (location.pathname === '/dashboard') {
      navigate('/dashboard/profile')
    }
  }, [location.pathname, navigate])

  return (
    <div>
      <Outlet />
    </div>
  )
}

export default Dashboard
