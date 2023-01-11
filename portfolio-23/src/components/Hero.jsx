import React from "react";
// import reine from '../../assets/images/reine-img.png'
// import background from '../../assets/images/Ellipse.png'
// import HeroBar from "./HeroBar";


function Hero() {
    return (
        <div id="hero" className="hero-section ">

            {/* <div className="image-container-mobile">
    <img className='reine-img' src={reine} alt="reine-image" />
    <img className='background-svg' src={background} alt="background-svg" />
</div> */}
            {/* REINE DEV headline */}
            <div className="text-mint text-center">
                <h1 className="font-Kaldera text-3xl lg:text-5xl">REINE</h1>
                <h1 className="font-Kaldera text-3xl lg:text-5xl ">DEV.</h1>
                <div className="">
                    <p className="font-GT_Flexa text-sm lg:text-base">Hello, I'm Toyosi, a software developer and I'm constantly evolving.</p>
                </div>
            </div>
            <div className="">

            </div>

        </div>


    )
}
export default Hero;