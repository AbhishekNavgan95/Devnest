import React from 'react';
import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa';

const Stars = ({ count }) => {
    const fullStars = Math.floor(count);
    const hasHalfStar = count - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
        <div className='flex items-center gap-x-2'>
            <p className='text-sm'>
                {count}
            </p>
            <span className='flex gap-x-1'>
                {Array.from({ length: fullStars }, (_, i) => (
                    <span key={`full-${i}`} className='text-yellow-400 text-xs'><FaStar /></span>
                ))}
                {hasHalfStar && (
                    <span className='text-yellow-400 text-xs'><FaStarHalfAlt /></span>
                )}
                {Array.from({ length: emptyStars }, (_, i) => (
                    <span key={`empty-${i}`} className='text-gray-400 text-xs'><FaRegStar /></span>
                ))}
            </span>
        </div>
    );
};

export default Stars;
