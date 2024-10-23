import React from "react";
// import './index.scss';

import Project from "./Project";
import Article from "./Article";

const projects = [
  {
    id: 1,
    title: "Foodpulse",
    description:
      "Foodpulse is a cutting-edge food-tech startup, focusing on global culinary discovery and social impact. It was built using Next.js, Three.js, and Tailwind",
    category: "javascript",
    githubLink: null,
    liveLink: "https://foodpulse.xyz/",
  },
  {
    id: 2,
    title: "TeddyWestside",
    description:
      "A landing page for a music producer linked to beatstars for beat purchases",
    category: "javascript",
    githubLink: null,
    liveLink: "https://teddywestside.vibesfactory.co/",
  },
  {
    id: 3,
    title: "Lexlance",
    description:
      "Lexlance is a legal marketplace connecting clients with lawyers built with React(vite), Node, SCSS and CSS modules.",
    category: "javascript",
    githubLink: null,
    liveLink: "https://lexlance.com/",
  },

  {
    id: 4,
    title: "The Folk",
    description:
      "A website for a music and talent management agency built with React(vite)",
    category: "javascript",
    githubLink: null,
    liveLink: "https://thefolk.netlify.app/",
  },

  {
    id: 5,
    title: "Mich Lagos",
    description: "An online store made for a Nigerian Fashion Company",
    category: "ecommerce",
    githubLink: null,
    liveLink: "https://mlng.store/",
  },
  {
    id: 6,
    title: "Album Cover Bank",
    description:
      "Album Cover Bank is an archive of Nigerian album cover art from 1950 to date. It was built using React, SCSS and Airtable.",
    category: "javascript",
    githubLink: null,
    liveLink: "https://www.albumcoverbank.com/",
  },
  {
    id: 7,
    title: "Spotify API",
    description:
      "A tutorial that shows how to connect your React(Vite) app to spotify's API",
    category: "blog",
    githubLink: "https://github.com/Rei-ne/spotify-api-test",
    liveLink: "https://reine-spotify-np.netlify.app/",
  },

  // {
  //   id: 8,
  //   title: "Reine DEV",
  //   description:
  //     "A portfolio website for a software developer built with React(vite) and tailwind css",
  //   category: "javascript",
  //   githubLink: "https://github.com/Rei-ne/reine-23-vite",
  //   liveLink: "https://reine.dev/",
  // },
];
const articles = [
  {
    id: 1,
    title: "What is Auto-GPT?",
    description:
      "Explore Auto-GPT, uncover the link between ChatGPT, GPT-4, and open soure AI",
    liveLink: "https://knowtechie.com/what-is-auto-gpt/",
    image:
      "https://knowtechie.com/wp-content/uploads/2023/04/Auto-GPT-400x240.jpg.webp",
  },
  {
    id: 0,
    title: "How to use Spotify API",
    description:
      "A tutorial that shows how to connect your React(Vite) app to spotify's API",
    liveLink:
      "https://medium.com/@reinetoyosii/how-to-connect-your-react-vitejs-app-to-spotifys-api-4098ba06b400",
    image:
      "https://cdn.hashnode.com/res/hashnode/image/upload/v1680543383094/ab162d4c-ade7-4cf5-bc02-bb11e405dc85.png?w=1600&h=840&fit=crop&crop=entropy&auto=compress,format&format=webp",
  },
  {
    id: 3,
    title: "Intro to Web Dev",
    description:
      "Learn about the internet, and how to create a simple webpage using HTML and CSS",
    liveLink:
      "https://medium.com/@reinetoyosii/an-introduction-to-web-development-the-internet-html-and-css-8537f3280b8b/",
    image: "https://miro.medium.com/v2/resize:fit:640/0*yxR9XZ09b9PIn4Me",
  },
  {
    id: 4,
    title: "What is web3?",
    description: "An absolute beginner's guide to web3",
    liveLink:
      "https://reine.hashnode.dev/what-is-web3-an-introduction-to-the-decentralized-web/",
    image:
      "https://cdn.hashnode.com/res/hashnode/image/unsplash/JNxTZzpHmsI/upload/v1666045076281/YuL2Wq3PyN.jpeg?w=1600&h=840&fit=crop&crop=entropy&auto=compress,format&format=webp",
  },
];
const Work = () => {
  return (
    <section id="work" className="min-h-screen w-full py-12 md:px-8">
      {/* Projects Section */}
      <div className=" w-full  ">
        <h2 className="text-3xl md:text-5xl mb-12 text-center font-Bebas_Neue">
          PROJECTS
        </h2>

        {/* Grid Container */}
        <div className="max-w-7xl mx-auto">
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Project key={project.id} {...project} />
            ))}
          </div>

          {/* Mobile List */}
          <div className="md:hidden grid gap-4">
            {projects.map((project) => (
              <Project key={project.id} {...project} />
            ))}
          </div>
        </div>

        {/* Articles Section */}
        <h2 className="text-3xl md:text-5xl my-8 text-center font-Bebas_Neue">
          ARTICLES
        </h2>

        <div className="grid gap-6 mb-16 w-full">
          {articles.map((article) => (
            <Article key={article.id} {...article} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Work;
