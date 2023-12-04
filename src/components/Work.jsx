import React from 'react';
// import './index.scss';

import Project from './Project';
import Article from './Article';

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
        liveLink: "https://reine-spotify-np.netlify.app/",
    },
    {
        id: 4,
        title: "The Folk",
        description: "A website for a music and talent management agency built with React(vite)",
        category: "javascript",
        githubLink: null,
        liveLink: "https://thefolk.ng/",

    },
    {
        id: 5,
        title: "Planty'x",
        description: "A landing page for a plant shop built with react and tailwind CSS",
        category: "javascript",
        githubLink: "https://github.com/Rei-ne/planty-x",
        liveLink: "https://plantyx.reine.dev/",

    },
    {
        id: 6,
        title: "Varena",
        description: "A play to earn nft battle game built with matter.js and react.js",
        category: "javascript",
        githubLink: null,
        liveLink: "https://varena.online/",
    },

]
const articles = [
    {
        id: 1,
        title: "What is Auto-GPT?",
        description: "Explore Auto-GPT, uncover the link between ChatGPT, GPT-4, and open soure AI",
        liveLink: "https://knowtechie.com/what-is-auto-gpt/",
        image: "https://knowtechie.com/wp-content/uploads/2023/04/Auto-GPT-400x240.jpg.webp",

    },
    {
        id: 2,
        title: "How to use Spotify API",
        description: "A tutorial that shows how to connect your React(Vite) app to spotify's API",
        liveLink: "https://medium.com/@reinetoyosii/how-to-connect-your-react-vitejs-app-to-spotifys-api-4098ba06b400",
        image: "https://cdn.hashnode.com/res/hashnode/image/upload/v1680543383094/ab162d4c-ade7-4cf5-bc02-bb11e405dc85.png?w=1600&h=840&fit=crop&crop=entropy&auto=compress,format&format=webp",
    },
    {
        id: 3,
        title: "Intro to Web Dev",
        description: "Learn about the internet, and how to create a simple webpage using HTML and CSS",
        liveLink: "https://medium.com/@reinetoyosii/an-introduction-to-web-development-the-internet-html-and-css-8537f3280b8b/",
        image: "https://miro.medium.com/v2/resize:fit:640/0*yxR9XZ09b9PIn4Me",

    },
    {
        id: 4,
        title: "What is web3?",
        description: "An absolute beginner's guide to web3",
        liveLink: "https://reine.hashnode.dev/what-is-web3-an-introduction-to-the-decentralized-web/",
        image: "https://cdn.hashnode.com/res/hashnode/image/unsplash/JNxTZzpHmsI/upload/v1666045076281/YuL2Wq3PyN.jpeg?w=1600&h=840&fit=crop&crop=entropy&auto=compress,format&format=webp",

    },
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
            <div className='flex items-center justify-center flex-col md:w-full mb-4'>
                {projects.map((project) => (
                    <Project key={project.id} title={project.title} description={project.description}
                        category={project.category} githubLink={project.githubLink} liveLink={project.liveLink} />

                ))}
            </div>


            <h2 className="sm:text-3xl md:text-3xl uppercase flex justify-center items-center font-Bebas_Neue">ARTICLES</h2>
            <div className='flex items-center justify-center flex-col md:w-full'>
                {articles.map((article) => (
                    <Article key={article.id} title={article.title} description={article.description}
                        liveLink={article.liveLink} image={article.image} />

                ))}
            </div>
            <div className="sm:w-4/5">
                <p className='tracking-wider text-gray-light font-PPNeueMontreal p-6 md:w-fit  text-sm max-w-prose leading-8 lg:text-center'>
                    My <a className='text-mint font-bold' href="https://drive.google.com/file/d/1akW1Q7L5SOavYjS9N7rl0zAaAOoxYsVb/view" target='_blank' >resume</a> and other projects are available on <a className='text-mint font-bold' href="https://github.com/Rei-ne" target='_blank' >github</a>.
                    Follow me on  <a className='text-mint font-bold' href="https://medium.com/@reinetoyosii" target='_blank'>medium</a> and <a className='text-mint font-bold' href="https://reine.hashnode.dev/" target='_blank' >hashnode</a> where I write about my experiences.
                </p>
            </div>

        </section>
    )
}

export default Work