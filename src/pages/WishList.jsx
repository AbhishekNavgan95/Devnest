import { Button } from '@/components/ui/button'
import BuyCoursesButton from '@/components/wishlist/BuyCoursesButton'
import CourseCard from '@/components/wishlist/CourseCard'
import { useCartStore } from '@/stores/useCartStore'
import React from 'react'
import { MdOutlineCurrencyRupee } from 'react-icons/md'

const WishList = () => {

  const { cart } = useCartStore()

  const DiscountedPrice = cart?.reduce((acc, course) => acc + Number(course.actualPrice), 0)
  const totalPrice = cart?.reduce((acc, course) => acc + Number(course.price), 0)

  return (
    <div className='w-full'>
      <h4 className='text-xl xl:text-2xl font-medium mb-4 md:mb-8'>My Cart</h4>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 w-full relative'>
        <div className='col-span-2 p-4 bg-white rounded-md min-h-[640px] border border-dark-400'>
          {
            cart.length > 0 ? (
              <div className='flex flex-col gap-y-4'>
                {
                  cart.map((course, index) => (
                    <CourseCard key={index} course={course} />
                  ))
                }
              </div>
            ) : (
              <div className='w-full h-full flex items-center justify-center'>
                <span>No courses in your cart</span>
              </div>
            )
          }
        </div>
        <div className='col-span-2 p-4 md:col-span-1 w-full h-max sticky top-0 rounded-md bg-white border border-dark-400'>
          <h4 className='text-xl font-medium '>Subtotal</h4>
          <div className='my-4 space-y-1'>
            <span className='flex justify-between'>
              <p>Items</p>
              <p>{cart?.length || 0}</p>
            </span>

            <span className='flex justify-between'>
              <p>Total Price</p>
              <p className='flex items-center'><MdOutlineCurrencyRupee /> {totalPrice}</p>
            </span>
          </div>

          <div className='flex justify-between border-t py-4'>
            <p>Discounted Price</p>
            <p className='flex items-center text-xl font-medium'><MdOutlineCurrencyRupee /> {DiscountedPrice}</p>
          </div>

          <BuyCoursesButton courses={cart} />
        </div>
      </div>

    </div>
  )
}

export default WishList