import React from "react";
import { useEffect, useState } from "react";
import NowPlaying from "./NowPlaying";
import Time from "./Time";
import reine from "../assets/images/reine-img.png";
import background from "../assets/images/Ellipse.png";
import TypeWriter from "./TypeWriter";
import "../styles/Hero.css";
import gsap from "gsap";
import hero from "../assets/images/Group_4.svg";

function Hero() {
  const text = "Software Developer, Music Head";

  useEffect(() => {
    gsap.fromTo(
      ".image",
      { y: -50, opacity: 0 },
      { y: 1, opacity: 1, duration: 2, ease: "bounce" }
    );

    gsap.fromTo(".text", { y: 50 }, { y: 1, duration: 2, ease: "bounce" });
  }, []);

  return (
    <>
      <section
        id="hero"
        className="hero-section h-screen w-4/5 relative flex flex-col justify-center items-center md:justify-center lg:justify-start"
      >
        {/* mobile hero img */}
        <div className="absolute inset-x-0 w-full h-18 mt-16 md:hidden lg:hidden">
          <div className="image relative flex justify-center content-center w-full h-16">
            <img
              className="h-full object-cover object-top z-10"
              src={reine}
              alt="reine-image"
            />
            <img
              className="absolute h-24 mt-12 mr-4 z-0"
              src={background}
              alt="background-svg"
            />
          </div>
        </div>
        {/* REINE DEV headline */}
        <div className="text-mint sm:h-16 sm:w-full relative flex  justify-center  items-center text-center md:h-16 md:py-10 lg:h-17 lg:mt-16 md:justify-between m-auto">
          <div className="text sm:w-full  flex flex-col justify-center items-center pt-2  md:m-0 z-10 font-normal sm:mt-20 sm:h-14 lg:z-0 md:h-fit  md:justify-start md:mt-0 lg:gap-6 lg:h-16">
            {/* <div className="sm:w-full flex justify-center align-center sm:h-6  p-0 m-0 md:h-fit md:max-h-screen">
                            <h1 className="sm:w-80 max-w-lg object-contain font-Kaldera text-justify sm:text-3xl  md:text-3xl lg:text-4xl">REINE</h1>
                        </div>
                        <div className="sm:w-full flex  justify-center sm:h-6 md:h-fit p-0 mt-1">
                            <h1 className="sm:w-80 object-contain font-Kaldera text-justify sm:text-3xl md:text-3xl lg:text-4xl">DEV.</h1>
                        </div> */}
            <img
              className="w-fit flex justify-center align-center p-0 m-0 h-full"
              src={hero}
              alt="hero-img"
            />
          </div>
          <div className="typewriter absolute bottom-0 sm:h-fit md:hidden flex lg:flex lg:items-end items-center justify-center p-2 leading-4 sm:w-full lg:w-full lg:h-8 ">
            <span className="inline">
              <TypeWriter
                className="w-full flex items-center justify-center font-PPNeueMontreal text-gray-light text-sm lg:text-2xl"
                text={text}
              />
            </span>
          </div>
        </div>
      </section>

      <div className="border-t-2 w-full hidden md:absolute md:bottom-0 md:h-4 lg:h-6 border-gray bg-black  md:flex justify-between items-center z-10 py-2 px-16">
        <NowPlaying />
        <div className="flex flex-row gap-2">
          <Time />
          <div className="font-PPNeueMontreal tracking-wider uppercase text-gray text-base">
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
  );
}

export default Hero;
