import React from "react";
import shareIcon from "../assets/icons/Arrow_1.svg";
import gsap from "gsap";

const icons = [
  {
    id: 1,
    title: "share-icon",
    iconImg: `${shareIcon}`,
  },
];

const onEnter = ({ currentTarget }) => {
  gsap.to(currentTarget, { backgroundColor: "#273444" });
};

const onLeave = ({ currentTarget }) => {
  gsap.to(currentTarget, { backgroundColor: "black" });
};

const Article = ({ title, description, liveLink, image }) => {
  return (
    <div
      className="px-6 py-4 font-Kaldera relative text-center md:h-14 h-full w-4/5 lg:w-full sm:border-b-2 my-1 lg:my-0 border-gray flex flex-col justify-between items-start md:flex-row lg:justify-center"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div className="h-10 w-full rounded-sm md:w-1/2 lg:w-1/2 mr-4 lg:h-full flex items-center justify-end">
        <img
          className="w-full object-cover object-center lg:w-1/2 h-full rounded-sm"
          src={image}
          alt="project-image"
        />
      </div>
      <div className="md:w-1/2 md:p-2 md:flex md:flex-col md:h-full justify-center w-full ">
        {/* text */}
        <div className="flex items-center justify-start w-full text-left md:text-center p-2">
          <a
            href={liveLink}
            target="_blank"
            className="no-underline hover:underline"
          >
            <h2 className="text-xl tracking-normal md:text-1xl lg:text-2xl text-mint font-bold">
              {title}
            </h2>
          </a>
        </div>
        <div className=" flex items-center p-2">
          {/* description */}
          <div className="flex items-center h-fit w-full lg:w-1/2 md:h-auto justify-start text-left md:text-xs ">
            <p className="font-PPNeueMontreal max-w-prose sm:leading-6 leading-8 text-gray-light sm:text-base md:text-base tracking-wider w-full">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Article;
