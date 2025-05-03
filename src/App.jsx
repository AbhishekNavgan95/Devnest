import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'
import AboutUs from './pages/AboutUs'
import Signup from './pages/Signup'
import Login from './pages/Login'
import VerifyAccount from './pages/VerifyAccount'
import PublicRoutes from './components/common/PublicRoutes'
import Profile from './pages/Profile'
import DashboardLayout from './components/common/DashboardLayout'
import MyCourses from './pages/MyCourses'
import CreateCourse from './pages/CreateCourse'
import InstructorAnalytics from './pages/InstructorAnalytics'
import Community from './pages/Community'
import CodeSpace from './pages/CodeSpace'
import Dashboard from './pages/Dashboard'

const App = () => {

  const location = useLocation();
  let showHeader = true;
  let showFooter = true;
  if (location.pathname.includes('dashboard')) {
    showHeader = false;
    showFooter = false;
  }

  return (
    <div className='font-roboto bg-dark-50'>
      {
        showHeader && <Navbar />
      }
      <Routes>

        {/* public routes */}
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<AboutUs />} />

        {/* auth routes */}
        <Route path='/login' element={<PublicRoutes><Login /></PublicRoutes>} />
        <Route path='/signup' element={<PublicRoutes><Signup /></PublicRoutes>} />
        <Route path='/verify/:token' element={<PublicRoutes><VerifyAccount /></PublicRoutes>} />

        {/* dashboard routes */}
         <Route path='/dashboard' element={<Dashboard />}>

          {/* profile */}
          <Route path='profile' element={
            <DashboardLayout>
              <Profile />
            </DashboardLayout>
          } />

          {/* my courses */}
          <Route path='courses' element={
            <DashboardLayout>
              <MyCourses />
            </DashboardLayout>
          } />

          {/* Craete new Course */}
          <Route path='create' element={
            <DashboardLayout>
              <CreateCourse />
            </DashboardLayout>
          } />

          {/* Analytics */}
          <Route path='analytics' element={
            <DashboardLayout>
              <InstructorAnalytics />
            </DashboardLayout>
          } />

          {/* Community */}
          <Route path='community' element={
            <DashboardLayout>
              <Community />
            </DashboardLayout>
          } />

          {/* CodeSpace */}
          <Route path='codespace' element={
            <DashboardLayout>
              <CodeSpace />
            </DashboardLayout>
          } />



        </Route>
      </Routes>

      {
        showFooter && <Footer />
      }
    </div>
  )
}

export default App