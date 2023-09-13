import React from 'react';
// import './index.scss';

import Project from './Project';

const projects = [

    {
        id: 1,
        title: "Album Cover Bank",
        description: "An archive of Nigerian Album cover art from 1950 till date",
        category: "javascript",
        githubLink: null,
        liveLink: "https://www.albumcoverbank.com/",

    },
    {
        id: 2,
        title: "Reine DEV",
        description: "A portfolio website for a software developer built with React(vite) and tailwind css",
        category: "javascript",
        githubLink: "https://github.com/Rei-ne/reine-23-vite",
        liveLink: "https://reine.dev/",

    },
    {
        id: 3,
        title: "Spotify API",
        description: "A tutorial that shows how to connect your React(Vite) app to spotify's API",
        category: "blog",
        githubLink: "https://github.com/Rei-ne/spotify-api-test",
        liveLink: "https://medium.com/@reinetoyosii/how-to-connect-your-react-vitejs-app-to-spotifys-api-4098ba06b400",
    },
    {
        id: 4,
        title: "The Folk",
        description: "A website for a music and talent management agency built with React(vite)",
        category: "javascript",
        githubLink: null,
        liveLink: "https://thefolk.netlify.app/",

    },
    {
        id: 5,
        title: "Varena",
        description: "A play to earn nft battle game built with matter.js and react.js",
        category: "javascript",
        githubLink: null,
        liveLink: "https://varena.netlify.app/",
    },
    // {
    //     id: 6,
    //     title: "Metabnb",
    //     description: "A landing page built with react and styled components (css-in-js)",
    //     category: "javascript",
    //     githubLink: "https://github.com/Rei-ne/metabnb",
    //     liveLink: "https://reine-metabnb.netlify.app/",

    // },
]

const Work = () => {
    return (
        <section id="work" className='h-fit w-full about-div mt-20 flex flex-col justify-center items-center'>
            <h2 className="sm:text-3xl md:text-3xl uppercase flex justify-center items-center font-Bebas_Neue">PROJECTS</h2>
            <div className="sm:w-4/5 md:w-4/5 ">
                <p className='hidden text-gray-light font-GT_Flexa p-6  text-justify text-sm max-w-prose leading-8'>
                    In order to put my skills to test, I build projects that expand and go beyond my current knowledge.
                    <br /> I love to investigate new technologies and try new things.
                </p>
            </div>
            <div className='flex items-center justify-center flex-col md:w-full'>
                {projects.map((project) => (
                    <Project key={project.id} title={project.title} description={project.description}
                        category={project.category} githubLink={project.githubLink} liveLink={project.liveLink} />

                ))}
            </div>

            <div className="sm:w-4/5">
                <p className='tracking-wider text-gray-light font-PPNeueMontreal p-6 md:w-fit  text-sm max-w-prose leading-8 lg:text-center'>
                    My <a className='text-mint font-bold' href="https://docs.google.com/document/d/1xbVU9uvKDhXHd8XufCLbODeiXycCKRjI/edit?usp=sharing&ouid=116893098797010002643&rtpof=true&sd=true" target='_blank' >resume</a> and other projects are available on <a className='text-mint font-bold' href="https://github.com/Rei-ne" target='_blank' >github</a>.
                    Follow me on  <a className='text-mint font-bold' href="https://medium.com/@reinetoyosii" target='_blank'>medium</a> and <a className='text-mint font-bold' href="https://reine.hashnode.dev/" target='_blank' >hashnode</a> where I write about my experiences.
                </p>
            </div>

        </section>
    )
}

export default Work