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
import EnrolledCourses from './pages/EnrolledCourses'
import WishList from './pages/WishList'
import Courses from './pages/Courses'
import CoursesLayout from './components/common/CoursesLayout'
import CourseDetails from './pages/CourseDetails'
import { SocketProvider } from './contexts/SocketContext'
import ViewCourse from './pages/ViewCourse'
import JoinCodeSpace from './pages/JointCodeSpace'
import InstructorProfile from './pages/InstructorProfile'

const App = () => {

  const location = useLocation();
  let showHeader = true;
  let showFooter = true;
  if (location.pathname.includes('dashboard') || location.pathname.includes('view-course') || location.pathname.includes('/code/')) {
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

        {/* courses */}
        <Route path='/courses' element={<CoursesLayout />}>
          <Route path=':category/:topic' element={<Courses />} />
        </Route>

        <Route path='/course-details/:courseId' element={<CourseDetails />} />
        <Route path='/view-course/:id' element={<ViewCourse />} />
        <Route path='/instructor/:id' element={<InstructorProfile />} /> 

        {/* Join CodeSpace */}
        <Route path='/code/:codeSpaceId' element={
          <SocketProvider>
            <JoinCodeSpace />
          </SocketProvider>
        } />

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

          {/* Enrolled Courses */}
          <Route path='enrolled-courses' element={
            <DashboardLayout>
              <EnrolledCourses />
            </DashboardLayout>
          } />

          {/* Wishlist */}
          <Route path='wishlist' element={
            <DashboardLayout>
              <WishList />
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
              <SocketProvider>
                <Community />
              </SocketProvider>
            </DashboardLayout>
          } />

          {/* CodeSpace */}
          <Route path='codespace' element={
            <DashboardLayout>
              <SocketProvider>
                <CodeSpace />
              </SocketProvider>
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