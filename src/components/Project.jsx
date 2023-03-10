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
        <div className='px-6 py-4 font-Kaldera relative text-center md:h-14 h-full w-4/5 lg:w-full sm:border   my-1 border-gray flex flex-col justify-between items-start'>

            <div className="md:pl-4 md:flex md:flex-col md:justify-around md:w-3/5 border-mint lg:w-4/5 md:h-full lg:flex-col">
                {/* text */}
                <div className='flex items-center justify-start text-left w-full'>
                    <h2 className='text-xl md:text-2xl text-mint '>{title}</h2>
                </div>
                {/* description */}
                <div className='flex items-center h-fit w-2/3 md:w-fit md:h-auto justify-start text-left  '>
                    <p className='font-GT_Flexa max-w-prose text-gray-light sm:text-base md:text-base'>{description}</p>
                </div>

                {/* category */}
                <div className='sm:hidden md:flex items-center  w-1/2 md:w-fit justify-center text-center h-auto p-2 mt-10 absolute right-0 top-0 '>
                    <p className='font-GT_Flexa uppercase  max-w-prose text-gray-light md:text-1xl lg:text-1xl'>{category}</p>
                </div>

                <div className='flex flex-row justify-around  w-1/2 absolute right-0 bottom-0 mb-8 p-2'>

                    {githubLink ?
                        <a href={githubLink} target="_blank"> <img className='cursor-pointer' key={icons[0].id} src={icons[0].iconImg} alt="" /></a> : null


                    }
                    {liveLink ? <a href={liveLink} target="_blank">
                        <img className='cursor-pointer' key={icons[1].id} src={icons[1].iconImg} alt="" /></a> : null

                    }






                </div>
            </div>


        </div>
    )
}


export default Project