import React from "react";
import aboutImg from '../assets/images/about-img.png'



function About() {
    return (
        <section id="about" className="about-div m-t-6 flex flex-col justify-center items-center">
            <h2 className="sm:text-3xl md:text-4xl uppercase flex justify-center items-center font-Bebas_Neue">About me</h2>
            <div className="text-gray-light md:flex md:flex-row md:justify-around md:items-center md:h-4/5">
                <div className="font-GT_Flexa p-6 md:w-1/3 text-sm max-w-prose leading-8 left-about ">
                    <p>I’m Toyosi Odukale (REINE), and I am constantly evolving.</p>
                    <p>I say that because right now I’m a frontend developer that aspires to be a fullstack blockchain engineer someday.</p>
                    <p>My first dive into development was in August 2021, when I decided to transition from conventional application technical support, and take time out to give this new found interest all my attention. </p>
                </div>
                <div className="font-GT_Flexa grayscale p-6 flex flex-col justify-center items-center md:w-1/3">
                    <img className="bg-black grayscale text-gray h-48 w-48 object-cover md:h-full md:w-48 lg:w-64" src={aboutImg} alt="about reine dev" />
                    <div>
                        <p>my stacks</p>
                    </div>
                </div>
                <div className="right-about p-6 md:w-1/3  text-sm leading-8 font-GT_Flexa">
                    <p>So far I have learned a whole lot about programming languages like javascript and solidity and I am able to apply these skills in my daily life with how I create my art.</p>
                    <p>I am interested in gaming,technical writing,  creative development and music talent management</p>
                    <p>When I'm not coding, I'm listening to music or hanging out with my friends and listening to music with them 😀</p>
                </div>

            </div>
            {/* my stack */}
            {/* <Stack/> */}
        </section>


    )
}
export default About;