import React from 'react'
import githubIcon from '../assets/icons/akar-icons_github-fill.png'
import shareIcon from '../assets/icons/Arrow_1.png'


const icons = [
    {
        id: 1,
        title: "github-icon",
        iconImg: `${githubIcon}`,
    },
    {
        id: 2,
        title: "share-icon",
        iconImg: `${shareIcon}`,
    },
]
// const Icons = () => {
//     return (

//     )
// }

const Project = ({ title, description, category, liveLink, githubLink }) => {
    return (
        <div className='px-6 py-4 font-Kaldera relative text-center md:h-14 h-full w-4/5 lg:w-full sm:border   my-1 lg:my-0 border-gray flex flex-col justify-between items-start'>

            <div className="md:pl-4 md:flex md:flex-col md:justify-around md:w-3/5 lg:w-3/5 lg:ml-32 border-mint md:h-full lg:flex-col">
                {/* text */}
                <div className='flex items-center justify-start text-left w-full'>
                    <h2 className='text-xl sm:tracking-widest md:tracking-normal md:text-2xl lg:text-4.5 text-mint '>{title}</h2>
                </div>
                {/* description */}
                <div className='flex items-center h-fit w-2/3 md:w-fit md:h-auto justify-start text-left  '>
                    <p className='font-GT_Flexa max-w-prose sm:leading-6 leading-8 text-gray-light sm:text-base md:text-base'>{description}</p>
                </div>

                {/* category */}
                <div className='sm:hidden md:flex items-center   md:w-10 md:mr-10 justify-center text-center h-auto p-2 mt-10 absolute right-0 top-0 lg:w-10 lg:mr-48'>
                    <p className='font-GT_Flexa uppercase  max-w-prose text-gray-light md:text-1xl lg:text-1xl'>{category}</p>
                </div>

                <div className='flex flex-row justify-evenly items-center sm:w-1/3 sm:mb-6 md:justify-evenly w-1/3  lg:w-10 lg:mr-48 absolute right-0 bottom-0 mb-8 p-2'>

                    {githubLink ?
                        <div className='flex flex-col items-center justify-center p-2 gap-1  h-4 '>
                            <div className='h-1 lg:h-2 mt-1'>
                                <a href={githubLink} target="_blank"> <img className='h-auto lg:h-fit cursor-pointer' key={icons[0].id} src={icons[0].iconImg} alt="github-icon" /></a>
                            </div>
                            <p className='font-GT_Flexa text-base'>code</p>
                        </div>
                        : null

                    }

                    {liveLink ?
                        <div className='flex flex-col items-center justify-center text-justify px-2 gap-1  h-4 '>
                            <div className='h-1 lg:h-2 mt-1'>
                                <a href={liveLink} target="_blank">
                                    <img className=' h-auto lg:h-fit cursor-pointer' key={icons[1].id} src={icons[1].iconImg} alt="live-icon" /></a>
                            </div>
                            <p className='font-GT_Flexa text-base'>live</p>

                        </div>
                        : null

                    }

                </div>
            </div>


        </div>
    )
}


export default Project