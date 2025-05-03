import React from 'react'

const Container = ({ children }) => {
    return (
        <section className='max-w-[1280px] mx-auto px-4 md:px-8 lg:px-14'>
            {children}
        </section>
    )
}

export default Container