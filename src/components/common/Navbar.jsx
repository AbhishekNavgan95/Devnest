import React, { useEffect, useState } from 'react';
import logo from '../../assets/logo/logo.png';
import CategorySelectBox from '../navbar/CategorySelectBox';
import { Link, NavLink } from 'react-router-dom';
import { Button } from '../ui/button';
import SaerchBar from '../navbar/SaerchBar';
import { useUserStore } from '@/stores/useUserStore';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/utils';
import { useCategoryStore } from '@/stores/useCategoryStore';
import { useTopicsStore } from '@/stores/useTopicsStore';
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { IoIosClose } from "react-icons/io";
import { TiHomeOutline } from "react-icons/ti";
import { BsCardList } from "react-icons/bs";
import { PiGridFour } from "react-icons/pi";
import { motion, AnimatePresence } from 'framer-motion';

const fetchCategories = async () => {
  const response = await api.get('/course/getAllCategories');
  return response.data;
};

const fetchAllTopics = async () => {
  const response = await api.get('/course/getAllTopics');
  // console.log("response : ", response);
  return response.data
}

const Navbar = () => {
  const { isLoggedIn } = useUserStore();
  const { setCategories, categories } = useCategoryStore();
  const [mobileNavOpenm, setMobileNavOpen] = useState(false);
  const { setTopics } = useTopicsStore();
  const { user } = useUserStore();

  const { data, isPending, isError } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    retry: 0,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (!isPending && !isError && data?.data?.length > 0) {
      setCategories(data.data);
    }
  }, [data, isPending, isError, setCategories]);

  const { data: topics, isPending: topicsPending, isError: topicsError } = useQuery({
    queryFn: fetchAllTopics,
    queryKey: ['topics'],
  })

  // console.log("topics : ", topics);

  useEffect(() => {
    if (!topicsPending) {
      setTopics(topics?.data)
    }
  }, [topics, topicsPending])

  // console.log("categories : ", categories)

  return (
    <nav className='w-full px-4 lg:px-14 flex justify-between items-center border-b shadow-md shadow-dark-400'>
      <div className='flex items-center gap-x-2'>
        <Link to={'/'}>
          <img className='py-2 w-[80px] md:w-[140px]' src={logo} alt="Logo" />
        </Link>
        <CategorySelectBox categories={categories} />
        <SaerchBar />
      </div>

      <div className='lg:flex hidden items-center gap-x-6 text-sm'>
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

      <div className='flex lg:hidden items-center'>
        <button onClick={() => setMobileNavOpen(!mobileNavOpenm)} size='sm' className='text-lg'>
          <AiOutlineMenuUnfold />
        </button>
        {
          <AnimatePresence>
            {mobileNavOpenm && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                onClick={() => setMobileNavOpen(false)}
                className='w-full h-screen bg-black/40 backdrop-blur-sm fixed top-0 left-0 z-20 flex'
              >
                <motion.div
                  initial={{ x: -250 }}
                  animate={{ x: 0 }}
                  exit={{ x: -250 }}
                  transition={{ type: 'tween', duration: 0.3 }}
                  onClick={(e) => e.stopPropagation()}
                  className='p-4 w-[240px] h-full bg-dark-50 shadow-lg'
                >
                  <div className='w-full flex items-center justify-between'>
                    <Link to={'/'}>
                      <img className='py-2 w-[120px]' src={logo} alt="Logo" />
                    </Link>
                    <button onClick={() => setMobileNavOpen(false)} className='text-lg'>
                      <IoIosClose className='text-2xl' />
                    </button>
                  </div>

                  <div className='flex flex-col gap-y-4 mt-4'>
                    <NavLink onClick={() => setMobileNavOpen(false)} to='/' className={({ isActive }) => `text-sm ${isActive ? 'px-4 py-2 border border-dark-600 rounded-md bg-dark-400' : 'px-4 py-2 border border-transparent rounded-md bg-transparent'}`}>
                      <span className='font-medium flex items-center gap-x-2'>
                        <TiHomeOutline />
                        Home
                      </span>
                    </NavLink>

                    <NavLink onClick={() => setMobileNavOpen(false)} to='/courses' className={({ isActive }) => `text-sm ${isActive ? 'px-4 py-2 border border-dark-600 rounded-md bg-dark-400' : 'px-4 py-2 border border-transparent rounded-md bg-transparent'}`}>
                      <span className='font-medium flex items-center gap-x-2'>
                        <BsCardList />
                        Courses
                      </span>
                    </NavLink>

                    <NavLink onClick={() => setMobileNavOpen(false)} to='/about' className={({ isActive }) => `text-sm ${isActive ? 'px-4 py-2 border border-dark-600 rounded-md bg-dark-400' : 'px-4 py-2 border border-transparent rounded-md bg-transparent'}`}>
                      <span className='font-medium flex items-center gap-x-2'>
                        <PiGridFour />
                        About Us
                      </span>
                    </NavLink>

                    <div className='w-full h-px bg-dark-600'></div>

                    {!isLoggedIn ? (
                      <div className='flex flex-col gap-y-2'>
                        <Link to='/signup'>
                          <Button className='w-full'>Sign Up</Button>
                        </Link>
                        <Link to='/login'>
                          <Button className='w-full' variant='outline'>Log In</Button>
                        </Link>
                      </div>
                    ) : (
                      <div>
                        <Link to='/dashboard'>
                          <Button className='w-full' variant='default'>Dashboard</Button>
                        </Link>
                      </div>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        }
      </div>
    </nav>
  );
};

export default Navbar;
