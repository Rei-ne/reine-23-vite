import React from 'react';
// import './index.scss';
import varenaImg from '../assets/images/varena.png'
import Project from './Project';

const projects = [
    {
        id: 1,
        title: "Varena",
        description: "A play to earn nft battle game built with 2d physics and javascript",
        img: varenaImg,
    },
    {
        id: 2,
        title: "Spotify SongPortal",
        description: "a web3 dapp built with react js and solidity that let's users send songs on goerli testnet",
        img: varenaImg,
    },
    {
        id: 3,
        title: "The Folk",
        description: "A website for a music distribution and talent management company built with nextjs and tailwind",
        img: varenaImg,
    },
    {
        id: 4,
        title: "Reine DEV",
        description: "A portfolio website for a software developer built with React(vite) and tailwind",
        img: varenaImg,
    }
]

const Work = () => {
    return (
        <section id="work" className='h-fit about-div mt-20 flex flex-col justify-center items-center'>
            <h2 className="sm:text-2xl md:text-3xl uppercase flex justify-center items-center font-Bebas_Neue">PROJECTS</h2>
            <div className="sm:w-4/5">
                <p className='text-gray-light font-GT_Flexa p-6 md:w-1/3 text-sm max-w-prose leading-8'>
                    In order to put my skills to test, I build projects that expand and go beyond my current knowledge.
                    <br /> I love to investigate new technologies and try new things.
                </p>
            </div>
            <div>

            </div>
            {projects.map((project) => (
                <Project key={project.id} title={project.title} description={project.description} img={project.img} />

            ))}
            <div className="sm:w-4/5">
                <p className='text-gray-light font-GT_Flexa p-6 md:w-1/3 text-sm max-w-prose leading-8'>
                    Other projects are available on github. Follow me let's connect on <a className='text-mint font-bold' href="https://github.com/Rei-ne" target='_blank' >github</a> and <a className='text-mint font-bold' href="https://reine.hashnode.dev/" target='_blank'>hashnode</a>
                </p>
            </div>

        </section>
    )
}

export default Work