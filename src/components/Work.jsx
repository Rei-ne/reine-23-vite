import React from 'react';
// import './index.scss';
import Project from './Project';

const Work = () => {
    return (
        <section id="work" className='flex flex-col justify-center items-center h-screen'>
            <h2 className="sm:text-2xl md:text-3xl uppercase flex justify-center items-center font-Bebas_Neue">Work</h2>
            <p>
                In order to put my expertise to test, I'm always building projects that expand and go beyond my current knowledge, I love to investigate new technologies and try new things.
            </p>
            <Project />
            <Project />
            <Project />
            <Project />
        </section>
    )
}

export default Work