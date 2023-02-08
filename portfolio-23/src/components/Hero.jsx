import React from "react";
import NowPlaying from './NowPlaying'
import Time from "./Time";
// import reine from '../../assets/images/reine-img.png'
// import background from '../../assets/images/Ellipse.png'
// import HeroBar from "./HeroBar";


function Hero() {
    return (
        <>


            <section id="hero" className="hero-section flex flex-col justify-center items-center h-screen relative">

                {/* <div className="image-container-mobile">
<img className='reine-img' src={reine} alt="reine-image" />
<img className='background-svg' src={background} alt="background-svg" />
</div> */}

                {/* REINE DEV headline */}
                <div className="text-mint flex flex-col justify-center items-center text-center">
                    <div className="w-4/5">
                        <h1 className="font-Kaldera text-center text-3xl md:text-4xl lg:text-5xl">REINE</h1>
                        <h1 className="font-Kaldera text-center text-3xl md:text-4xl lg:text-5xl ">DEV.</h1>
                    </div>
                    <div className="sm:w-1/2 md:w-4/5 lg:w-full">
                        <p className="font-GT_Flexa text-gray-light text-sm lg:text-xl">Hello, I'm Toyosi, a software developer and I'm constantly evolving.</p>
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

            <div className=" w-full sm:absolute sm:top-0 md:hidden lg:hidden  h-12  flex justify-evenly items-center">
                <NowPlaying />
                <Time />
            </div>

        </>
    )
}


export default Hero;