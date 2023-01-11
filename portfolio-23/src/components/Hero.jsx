import React from "react";
import './Hero.scss';
import reine from '../../assets/images/reine-img.png'
import background from '../../assets/images/Ellipse.png'
import HeroBar from "./HeroBar";


function Hero() {
    return (
        <div className="hero-section">

            <div className="image-container-mobile">
                <img className='reine-img' src={reine} alt="reine-image" />
                <img className='background-svg' src={background} alt="background-svg" />
            </div>
            {/* REINE DEV headline */}
            <div className="text-container">
                <h1>REINE</h1>
                <h1 className='h1-dev'>DEV.</h1>
                <div className="">
                    <p>Hello, I'm Toyosi, a software developer and I'm constantly evolving.</p>
                </div>
            </div>
            <div className="show-hero-bar">
                <HeroBar />
            </div>

        </div>


    )
}
export default Hero;