import React from 'react';
import logo from '@/assets/logo/logo.png';
import CategorySelectBox from '../navbar/CategorySelectBox';
import { Link, NavLink } from 'react-router-dom';
import { Button } from '../ui/button';
import SaerchBar from '../navbar/SaerchBar';
import { useUserStore } from '@/stores/useUserStore';

const Navbar = () => {
  const { isLoggedIn } = useUserStore()

  return (
    <nav className='w-full px-14 flex justify-between items-center border-b shadow-md shadow-dark-400'>
      <div className='flex items-center gap-x-2'>
        <Link to={'/'}>
          <img width={140} className='py-2' src={logo} alt="Logo" />
        </Link>

        <CategorySelectBox />

        <SaerchBar />
      </div>

      <div className='flex items-center gap-x-6 text-sm'>
        <NavLink to='/' className={({ isActive }) => `${isActive ? 'border-b-2 px-1 py-1 text-main-400 border-main-400' : ' px-1 py-1 border-b-2 border-transparent'} `}>
          <span className='font-semibold'>Home</span>
        </NavLink>
        <NavLink to='/courses' className={({ isActive }) => `${isActive ? 'border-b-2 px-1 py-1 text-main-400 border-main-400' : ' px-1 py-1 border-b-2 border-transparent'} `}>
          <span className='font-semibold'>Courses</span>
        </NavLink>
        <NavLink to='/about' className={({ isActive }) => `${isActive ? 'border-b-2 px-1 py-1 text-main-400 border-main-400' : ' px-1 py-1 border-b-2 border-transparent'} `}>
          <span className='font-semibold'>About Us</span>
        </NavLink>

        {!isLoggedIn ? (
          <div className='flex gap-x-2'>
            <Link to='/signup'>
              <Button>Sign Up</Button>
            </Link>
            <Link to='/login'>
              <Button variant='outline'>Log In</Button>
            </Link>
          </div>
        ) : (
          <div>
            <Link to='/dashboard'>
              <Button variant='default'>Dashboard</Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
