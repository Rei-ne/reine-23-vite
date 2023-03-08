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
const Icons = () => {
    return (
        <div className='flex flex-row  justify-around  w-1/3 absolute right-0 bottom-0 mb-4 p-2'>
            {icons.map(
                (icon) => (
                    <img className='cursor-pointer' key={icon.id} src={icon.iconImg} alt="" />
                )
            )}


        </div>
    )
}
const Project = ({ title, description, category }) => {
    return (
        <div className='px-6 py-4 font-Kaldera relative text-center md:h-14 h-10 w-4/5 border my-1 border-gray flex flex-col justify-between items-start'>


            {/* text */}
            <div className='flex items-center justify-start text-left  w-full'>
                <h2 className=' text-xl text-white'>{title}</h2>
            </div>
            {/* description */}
            <div className='flex items-center h-fit w-2/3 md:w-full justify-start text-left '>
                <p className='font-GT_Flexa  max-w-prose text-gray-light sm:text-base text-xs'>{description}</p>
            </div>

            {/* category */}
            <div className='sm:hidden md:flex items-center h-2 w-1/2 md:w-full justify-start text-left '>
                <p className='font-GT_Flexa  max-w-prose text-gray-light text-xs'>{category}</p>
            </div>
            <Icons />

        </div>
    )
}


export default Project