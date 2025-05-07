import React, { useEffect } from 'react';
import logo from '@/assets/logo/logo.png';
import CategorySelectBox from '../navbar/CategorySelectBox';
import { Link, NavLink } from 'react-router-dom';
import { Button } from '../ui/button';
import SaerchBar from '../navbar/SaerchBar';
import { useUserStore } from '@/stores/useUserStore';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/utils';
import { useCategoryStore } from '@/stores/useCategoryStore';
import { useTopicsStore } from '@/stores/useTopicsStore';

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
      setTopics(topics.data)
    }
  }, [topics, topicsPending])

  // console.log("categories : ", categories)

  return (
    <nav className='w-full px-14 flex justify-between items-center border-b shadow-md shadow-dark-400'>
      <div className='flex items-center gap-x-2'>
        <Link to={'/'}>
          <img width={140} className='py-2' src={logo} alt="Logo" />
        </Link>
        <CategorySelectBox categories={categories} />
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
