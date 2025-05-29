import React, { useState } from 'react';
import { FaRegCircle } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const FAQCarousel = ({ data }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(prev => (prev === index ? null : index));
  };

  return (
    <div className='space-y-3'>
      {data?.map((e, i) => (
        <div
          key={i}
          className='mt-2 flex flex-col items-start gap-y-2 border-t border-dark-500 pt-3'
        >
          <button
            onClick={() => toggleFAQ(i)}
            className='flex items-start gap-x-3 w-full text-left'
          >
            <FaRegCircle size={8} className='text-base text-main-400 mt-2' />
            <p className='text-base font-medium'>{e?.question}</p>
          </button>

          <AnimatePresence>
            {openIndex === i && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className='overflow-hidden w-full'
              >
                <p className='text-sm ml-5 mt-1'>{e?.answer}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

export default FAQCarousel;
