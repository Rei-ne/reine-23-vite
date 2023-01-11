import React from 'react'
import "./spotifyBar.scss"
import spotify from '../../assets/images/Vector.png'

const NowPlaying = () => {
    return (
        <div className='np-div'>
            <img src={spotify} alt="" />
            <p> Now Playing</p>
        </div>
    )
}

export default NowPlaying