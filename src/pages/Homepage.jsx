import React from 'react'


import About from '../components/About'
import Contact from '../components/Contact';
import Hero from '../components/Hero'
import Work from '../components/Work'

import { useEffect, useState } from 'react';

import { useLocation } from 'react-router-dom';
import arrowIcon from '../assets/icons/Nav-Arrow_1.png'
import Footer from '../components/Footer';


const Home = () => {
    // scroll to top state for the arrow button
    const [showButton, setShowButton] = useState(false);

    // useEffect that brings up the arrow button that shows on scroll after hero section
    useEffect(() => {
        const handleScrollButtonVisibility = () => {
            window.pageYOffset > 100 ? setShowButton(true) : setShowButton(false);
        };
        window.addEventListener('scroll', handleScrollButtonVisibility);

        return () => {
            window.removeEventListener('scroll', handleScrollButtonVisibility);
        };
    }, []);
    // function to scroll to top of screen
    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behaviour: 'smooth' });
    }


    return (
        <>
            <div className="flex flex-col justify-center items-center text-mint bg-black">
                <Hero />
                <About />
                <Work />
                <Contact />

                {/* scroll to top button */}
                {showButton && (
                    <div className='sm:hidden border md:flex fixed bottom-0 right-0 mr-12 mb-10 bg-black  z-50 border-mint h-4 w-4 '>
                        <img className=' h-full w-fit rotate-90 cursor-pointer p-2 hover:bg-gray-dark' src={arrowIcon} alt="scrollToTop" onClick={handleScrollToTop} />
                    </div>
                )
                }
                <Footer />

            </div>

        </>


    )
}

export default Home