import React from 'react'

const HilightText = ({ children, className }) => {
    return (
        <span className={` ${className} font-bold bg-main-400 text-dark-100 px-4 rounded-md py-0`}>{children}</span>
    )
}

export default HilightText