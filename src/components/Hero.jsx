import React from "react";
import NowPlaying from './NowPlaying'
import Time from "./Time";
import reine from '../assets/images/reine-img.png';
import background from '../assets/images/Ellipse.png';


function Hero() {
    return (
        <>
            <section id="hero" className="hero-section flex flex-col justify-center items-center h-screen w-4/5 relative">
                {/* mobile hero img */}
                <div className="absolute inset-x-0  w-full h-18 mt-16 md:hidden lg:hidden">
                    <div className="relative flex justify-center content-center w-full h-16">
                        <img className='h-full object-cover object-top z-10' src={reine} alt="reine-image" />
                        <img className='absolute h-24 mt-12 mr-4 z-0' src={background} alt="background-svg" />
                    </div>


                </div>
                {/* REINE DEV headline */}
                <div className="text-mint flex flex-col justify-center gap-10 sm:h-18 sm:w-full relative items-center text-center mb-4">
                    <div className="absolute flex flex-col justify-center align-center inset-y inset-x-0 pt-12 mt-12 z-10 font-normal sm:h-16">
                        <div className="sm:w-full flex justify-center align-center  h-8 p-0 m-0  ">
                            <h1 className="sm:w-80 object-contain font-Kaldera text-justify sm:text-2xl text-3xl  lg:text-5xl">REINE</h1>
                        </div>
                        <div className="sm:w-full flex  justify-center align-center h-8 p-0 m-0">
                            <h1 className="sm:w-80 object-contain font-Kaldera text-justify sm:text-2xl text-3xl  lg:text-5xl ">DEV.</h1>
                        </div>

                    </div>
                    <div className="absolute bottom-0 sm:h-5 sm:w-4/5 max-w-prose p-2 leading-4 md:w-4/5 lg:w-full">
                        <p className=" w-full font-GT_Flexa text-gray-light text-sm lg:text-1xl">Toyosi Odukale,
                            <br />software developer.</p>
                    </div>
                </div>
            </section>

            <div className="border-t-2 w-full hidden md:absolute md:bottom-0  h-12 border-gray  md:flex justify-evenly items-center">
                <NowPlaying />
                <Time />
                <div className="">
                    <p>Lagos, NG</p>
                </div>
            </div>

            <div className="w-full sm:absolute sm:top-0 mt-6 md:hidden lg:hidden  p-6 h-12  flex justify-between items-center">
                <NowPlaying />
                <Time />
            </div>

        </>
    )
}


export default Hero;