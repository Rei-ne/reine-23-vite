import React from 'react'
import spotify from '../assets/images/Vector.png'

const NowPlaying = () => {
    return (
        <div className='flex gap-5 p-2 w-1/2 text-gray uppercase'>
            <div className='w-6 h-2'>
                <img className='p-1 w-full h-full' src={spotify} alt="" />

            </div>
            <div>
                <p className="text-sm"> Not Playing</p>
            </div>
        </div>
    )
}

export default NowPlaying