import React from 'react'
import spotify from '../assets/images/Vector.png'

const NowPlaying = () => {
    return (
        <div className='flex gap-5 p-2 text-gray uppercase'>
            <div>
                <img src={spotify} alt="" />

            </div>
            <div>
                <p className=""> Not Playing</p>
            </div>
        </div>
    )
}

export default NowPlaying