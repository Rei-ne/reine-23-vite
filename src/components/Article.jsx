import React from 'react'
import shareIcon from '../assets/icons/Arrow_1.svg'
import gsap from "gsap";


const icons = [
    {
        id: 1,
        title: "share-icon",
        iconImg: `${shareIcon}`,
    },
]

const onEnter = ({ currentTarget }) => {
    gsap.to(currentTarget, { backgroundColor: "#273444" });
};

const onLeave = ({ currentTarget }) => {
    gsap.to(currentTarget, { backgroundColor: "black" });
};


const Article = ({ title, description, category, liveLink, image }) => {
    return (
        <div className='px-6 py-4 font-Kaldera relative text-center md:h-14 h-full w-4/5 lg:w-full sm:border my-1 lg:my-0 border-gray flex flex-col justify-between items-start md:flex-row' onMouseEnter={onEnter} onMouseLeave={onLeave} >
            <div className='h-10 w-full rounded-sm md:w-1/2 '>
                <img className='object-cover object-center w-full h-full rounded-sm' src={image} alt="project-image" />
            </div>
            <div className="md:w-1/2 p-2">
                {/* text */}
                <div className='flex items-center justify-start text-left w-full'>
                    <h2 className='text-xl sm:tracking-widest md:tracking-normal md:text-2xl lg:text-4.5 text-mint font-bold'>{title}</h2>
                </div>
                {/* description */}
                <div className='flex items-center h-fit w-4/5 md:w-full md:h-auto justify-start text-left md:text-xs '>
                    <p className='font-PPNeueMontreal max-w-prose sm:leading-6 leading-8 text-gray-light sm:text-base md:text-base tracking-wider w-full'>{description}</p>
                </div>

                {/* category */}
                <div className='sm:hidden md:flex '>
                    <p className='font-PPNeueMontreal uppercase  max-w-prose text-gray-light md:text-1xl lg:text-1xl'>{category}</p>
                </div>

                <div className='flex flex-row justify-evenly items-center sm:w-1/3  w-1/3 absolute right-0 bottom-0 mb-2 p-2'>

                    {liveLink ?
                        <div className='flex flex-col items-end justify-end text-justify p-2 gap-1  h-8 '>
                            <div className='h-1  '>
                                <a href={liveLink} target="_blank">
                                    <img className='h-full cursor-pointer' key={icons[0].id} src={icons[0].iconImg} alt="live-icon" /></a>
                            </div>
                            <p className='font-PPNeueMontreal text-base mt-1'>live</p>

                        </div>
                        : null

                    }

                </div>
            </div>


        </div>
    )
}


export default Article