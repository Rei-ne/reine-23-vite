import React from "react";
import ethers from "../assets/icons/logos_ethers.svg";
import reactImg from "../assets/icons/akar-icons_react-fill.png";
import github from "../assets/icons/mdi_github.svg";
import javascript from "../assets/icons/akar-icons_javascript-fill.png";
import solidity from "../assets/icons/file-icons_solidity.png";
import python from "../assets/icons/akar-icons_python-fill.png";
import hardhat from "../assets/icons/file-type-hardhat.png";
import gsap from "gsap";

const icons = [
  {
    id: 1,
    title: "javascript",
    image: javascript,
  },
  {
    id: 2,
    title: "solidity",
    image: solidity,
  },
  {
    id: 3,
    title: "github",
    image: github,
  },
  {
    id: 4,
    title: "ethers.js",
    image: ethers,
  },
  {
    id: 5,
    title: "react",
    image: reactImg,
  },
  {
    id: 6,
    title: "python",
    image: python,
  },
  {
    id: 7,
    title: "hardhat",
    image: hardhat,
  },
];

const onEnter = ({ currentTarget }) => {
  gsap.to(currentTarget, { backgroundColor: "#273444", scale: 1.2 });
};

const onLeave = ({ currentTarget }) => {
  gsap.to(currentTarget, { backgroundColor: "black", scale: 1 });
};

const Stack = () => {
  return (
    <div className="flex justify-center items-center flex-row flex-wrap gap-10 md:w-1/2 w-full mt-20 mx-auto lg:w-full">
      {icons.map((icon) => (
        <div
          className="h-7 w-7 border border-mint flex flex-col justify-between items-center"
          onMouseEnter={onEnter}
          onMouseLeave={onLeave}
          key={icon.id}
        >
          <img className="p-2 h-4 mt-2" src={icon.image} />
          <p className="tracking-wider font-PPNeueMontreal text-base p-2">
            {icon.title}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Stack;
