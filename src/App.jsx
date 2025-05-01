import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'

const App = () => {
  return (
    <div className='font-roboto bg-dark-50'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        
      </Routes>
      <Footer />
    </div>
  )
}

export default App