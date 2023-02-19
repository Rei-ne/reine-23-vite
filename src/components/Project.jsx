import React from 'react'

const Project = ({ title, description, img }) => {
    return (
        <div className='px-6 py-4 font-Kaldera text-center leading-8 h-10 w-full border border-gray flex flex-col justify-center items-center'>

            <div className='px-6 flex  items-center justify-start text-left h-6 w-full'>
                <h2 className=' text-xl text-white'>{title}</h2>
            </div>
            <div className='block w-4/5 text-left max-w-prose leading-8'>
                <p className='font-GT_Flexa  max-w-prose text-gray-light text-xs'>{description}</p>
            </div>
            {/* <img src={img} /> */}
        </div>
    )
}

export default Project