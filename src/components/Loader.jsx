
import { React, useState, useEffect } from "react";
import gsap from "gsap";
import TypeWriter from './TypeWriter';

const Loader = () => {


    const [loadInterval, setLoadInterval] = useState(null);

    const text = "WELCOME TO MY WEBSITE..."

    useEffect(() => {

        const num = document.querySelector("#number");
        let c = 0;
        const interval = setInterval(() => {

            num.innerHTML = c + "%";
            c++;
            if (c === 101) {
                clearInterval(interval);
                gsap.to(".loader", {
                    duration: 1,
                    opacity: 0,
                })
                gsap.to(".loading", {
                    duration: 1,
                    display: "none",
                })
                setLoadInterval(null);

            }
        }, 30);
        setLoadInterval(interval);
    }, []);

    return (
        <div id="loader" className='loader h-screen bg-black text-mint flex flex-col justify-between w-full p-6 items-center relative mx-auto '>
            <div className='loading flex flex-col  justify-center h-full w-full items-center '>
                <div className="w-full flex  justify-center items-center sm:h-6 md:h-10 p-0 m-0 text-mint">
                    <TypeWriter className="sm:w-80 object-contain font-GT_Flexa text-center sm:text-2xl text-3xl" text={text} />

                </div>
            </div>
            <div className='loading__counter font-Kaldera h-fit w-fit flex items-start justify-start mb-8'>
                <div id='number' className="h-fit w-full text-3xl loading__counter--number " data-interval={loadInterval}>0%</div>
            </div>
        </div>
    )
}

export default Loader