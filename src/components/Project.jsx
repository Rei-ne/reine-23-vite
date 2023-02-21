import React from 'react'

const Project = ({ title, description, img }) => {
    return (
        <div className='px-6 py-4 font-Kaldera text-center md:h-14 h-10 w-full border my-1 border-gray flex flex-col justify-between items-start'>

            <div className='flex items-center justify-start text-left  w-full'>
                <h2 className=' text-xl text-white'>{title}</h2>
            </div>
            <div className='flex items-center h-2 w-1/2 md:w-full justify-start text-left '>
                <p className='font-GT_Flexa  max-w-prose text-gray-light text-xs'>{description}</p>
            </div>
            {/* <img src={img} /> */}
        </div>
    )
}

export default Project