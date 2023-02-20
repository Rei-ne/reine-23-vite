import React from 'react'
import spotify from '../assets/images/Vector.png'

const NowPlaying = () => {
    return (
        <div className='flex p-2
         w-1/2 text-gray uppercase'>
            <div className='w-fit h-2'>
                <img className='p-1 w-full h-full' src={spotify} alt="" />

            </div>
            <div className="p-1 flex justify-center items-center text-sm">
                <p className="font-GT_Flexa px-1 text-base text-left uppercase"> Not connected</p>
            </div>
        </div>
    )
}

export default NowPlaying