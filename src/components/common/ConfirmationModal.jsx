import React from 'react'
import { Button } from '../ui/button'

const ConfirmationModal = ({ onClose, onConfirm, heading, subheading }) => {
    return (
      <div onClick={onClose} className='fixed z-[10] inset-0 w-full h-screen bg-black/40 backdrop-blur-sm flex justify-center items-center'>
      <div onClick={(e) => e.stopPropagation()} className='flex flex-col w-[440px] items-start p-8 bg-dark-50 rounded-md'>
        <div className='flex items-start mb-4 w-full justify-between'>
          <h4 className='text-2xl text-gray-900 font-medium'>{heading}</h4>
        </div>

        <p className='text-sm text-gray-700 mb-6'>{subheading}</p>

        <div className='flex justify-end gap-4 w-full'>
          <Button variant='outline' onClick={onClose}>Cancel</Button>
          <Button onClick={onConfirm}>Confirm</Button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationModal
