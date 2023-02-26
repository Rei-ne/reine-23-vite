import React from "react";
import aboutImg from '../assets/images/about-img.png'



function About() {
    return (
        <section id="about" className="h-fit md:h-fit lg:h-full about-div mt-10 flex flex-col justify-center items-center">
            <h2 className="sm:text-2xl md:text-2xl uppercase flex justify-center items-center font-Bebas_Neue">About me</h2>
            <div className="max-h-1/4 w-4/5 text-gray-light md:flex flex-wrap md:flex-col lg:flex-row md:justify-around md:items-center md:h-4/5">
                <div className="font-GT_Flexa p-6 md:w-fit lg:w-1/3 text-sm max-w-prose leading-8 left-about">
                    <p className="my-2">I’m                       Toyosi Odukale (REINE), and I am constantly evolving.</p>
                    <p className="my-2">I say that because right now I’m a frontend developer that aspires to be a fullstack blockchain engineer someday.</p>
                    <p className="my-2">My first dive into development was in August 2021, when I decided to transition from conventional application technical support, and take time out to give this new found interest all my attention. </p>
                </div>
                <div className="font-GT_Flexa p-6 flex  flex-col justify-center items-center md:w-1/3">
                    <img className="bg-black grayscale text-gray h-48 w-48 object-cover md:h-full md:w-48 lg:w-64" src={aboutImg} alt="about reine dev" />

                </div>
                <div className="right-about p-6 md:w-fit lg:w-1/3 text-sm leading-8 font-GT_Flexa">
                    <p className="my-2">So far I have learned a whole lot about programming languages like javascript and solidity and I am able to apply these skills in my daily life with how I create my art.</p>
                    <p className="my-2">I am interested in web3, technical writing,  creative development, and talent management.</p>
                    <p className="my-2">I love music!
                        When I'm not coding, I'm listening to music or hanging out with my friends and listening to music with them 😀</p>
                </div>
                <div className="sm:hidden lg:flex ">
                    <p>my stacks</p>
                </div>
            </div>

            {/* my stack */}
            {/* <Stack/> */}
            <div className="mt-8 w-4/5 text-left flex items-end font-GT_Flexa h-4 text-gray-light text-base border-t  border-gray-light">
                <p>
                    ENOUGH TALK 🤫, TIME TO SEE WHAT I’VE BUILT.
                </p>
            </div>
        </section>


    )
}
export default About;