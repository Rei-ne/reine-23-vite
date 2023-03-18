import React from "react";
import aboutImg from '../assets/images/about-img.png'
import Stack from "./Stack";



function About() {
    return (
        <section id="about" className="h-full w-full mt-10 flex flex-col justify-center items-center">
            <h2 className="sm:text-3xl md:text-3xl uppercase flex justify-center items-center font-Bebas_Neue">About me</h2>
            <div className="w-4/5 text-gray-light md:flex flex-wrap md:flex-col lg:flex-row md:justify-around md:items-center md:h-4/5 lg:h-full">
                <div className="font-GT_Flexa p-6 md:w-fit lg:w-1/3 text-sm max-w-prose leading-8 left-about h-full flex flex-col justify-evenly">
                    <div className="h-2/6">
                        <p className="my-2">Hello there 👋, my name is Toyosi Odukale (REINE), and I am constantly evolving.</p>
                    </div>
                    <div>
                        <p className="my-2">I am a frontend web developer with a passion for exploring the full potential of blockchain technology. My long-term goal is to become a skilled and knowledgeable fullstack blockchain engineer.</p>
                    </div>
                    <div>
                        <p className="my-2">My first dive into web development was in August 2021, when I decided to transition from banking application support, to take time out and give this new found interest all my attention. </p>
                    </div>



                </div>
                <div className="font-GT_Flexa p-6 flex  flex-col justify-center items-center h-full md:w-1/3">
                    <img className="bg-black grayscale text-gray w-fit object-contain md:h-full" src={aboutImg} alt="about reine dev" />

                </div>
                <div className="right-about p-6 md:w-fit lg:w-1/3 text-sm leading-8 font-GT_Flexa h-full flex flex-col justify-evenly">
                    <div>
                        <p className="my-2">Through my journey as a web developer, I have gained knowledge in programming languages such as JavaScript and Solidity. These skills have been instrumental in enhancing my artistic creations and I continue to apply them daily.</p>
                    </div>
                    <div>

                        <p className="my-2">I am interested in smart contract development, technical writing,talent management & AnR.</p>
                    </div>
                    <div>

                        <p className="my-2">I love music, when I'm not coding, you can usually find me either listening to music on my <a href="https://open.spotify.com/user/31iptodfoldd453eq6tbmv4x6qlu?si=3c8bc7bf41b04de2" target="_blank">own</a> or with my friends 😀</p>
                    </div>


                </div>
                <div className="flex flex-col gap-5 justify-center items-center ">
                    <p className="font-GT_Flexa">MY STACK</p>
                    <Stack />
                    <p className="my-2 font-GT_Flexa text-sm leading-8">I am excited to further develop my skills and create innovative solutions that make a difference.</p>
                </div>
            </div>


            <div className="mt-8 w-4/5 sm:text-left text-center flex items-end font-GT_Flexa h-4 text-gray-light text-base border-t md:justify-center md:text-1xl border-gray-light">
                <p className="px-8">
                    ENOUGH TALK 🤫, TIME TO SEE WHAT I’VE BUILT.
                </p>
            </div>
        </section>


    )
}
export default About;