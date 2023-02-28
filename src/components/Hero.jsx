import React from "react";
import NowPlaying from './NowPlaying'
import Time from "./Time";
import reine from '../assets/images/reine-img.png';
import background from '../assets/images/Ellipse.png';


function Hero() {
    return (
        <>
            <section id="hero" className="hero-section  h-screen w-4/5 relative flex flex-col justify-center items-center md:justify-start">
                {/* mobile hero img */}
                <div className="absolute inset-x-0 w-full h-18 mt-16 md:hidden lg:hidden">
                    <div className="relative flex justify-center content-center w-full h-16">
                        <img className='h-full object-cover object-top z-10' src={reine} alt="reine-image" />
                        <img className='absolute h-24 mt-12 mr-4 z-0' src={background} alt="background-svg" />
                    </div>


                </div>
                {/* REINE DEV headline */}
                <div className="text-mint sm:h-18 sm:w-full relative flex  justify-center align-center items-center text-center ">
                    <div className="sm:w-full md:border-none flex flex-col justify-center items-center pt-2 mt-8 md:m-0 z-10 font-normal sm:mt-20 sm:h-14 lg:z-0 md:h-full ">
                        <div className="sm:w-full flex justify-center align-center sm:h-6 md:h-10 p-0 m-0 ">
                            <h1 className="sm:w-80 object-contain font-Kaldera text-justify sm:text-3xl  md:text-4xl lg:text-5xl">REINE</h1>
                        </div>
                        <div className="sm:w-full flex  justify-center align-center sm:h-6 md:h-10 p-0 mt-1">
                            <h1 className="sm:w-80 object-contain font-Kaldera text-justify sm:text-3xl md:text-4xl lg:text-5xl">DEV.</h1>
                        </div>

                    </div>
                    <div className="absolute bottom-0 sm:h-5  max-w-prose p-2 leading-4 w-full lg:h-5">
                        <p className="w-full font-GT_Flexa text-gray-light text-sm lg:text-1xl">
                            Software Developer, Talent Manager</p>
                    </div>
                </div>
            </section>

            <div className="border-t-2 w-full hidden md:absolute md:bottom-0  h-7 border-gray  md:flex justify-between items-center px-16">
                <NowPlaying />
                <div className="flex flex-row gap-2">
                    <Time />
                    <div className="">
                        <p>Lagos, NG</p>
                    </div>
                </div>

            </div>
            {/* small screen */}
            <div className="w-full sm:absolute sm:top-0 mt-6 md:hidden lg:hidden  p-6 h-12  flex justify-between items-center">
                <NowPlaying />
                <Time />
            </div>

        </>
    )
}


export default Hero;