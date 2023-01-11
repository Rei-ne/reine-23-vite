import React from 'react'


import About from '../components/About'
import Contact from '../components/Contact';
import Hero from '../components/Hero'
import Work from '../components/Work'


const Home = () => {
    return (
        <>
            <div className="flex flex-col justify-center items-center text-mint bg-black">
                <Hero />
                <About />
                <Work />
                <Contact />
            </div>

        </>


    )
}

export default Home