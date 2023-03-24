import React from 'react'
import spotify from '../assets/icons/spotifyLogo.svg'
import { useEffect, useState } from 'react'
import getNowPlayingItem from '../spotify/SpotifyAPI'

const NowPlaying = (props) => {
    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState({});

    useEffect(() => {
        Promise.all([
            getNowPlayingItem(
                props.client_id,
                props.client_secret,
                props.refresh_token
            ),
        ]).then((results) => {
            setResult(results[0]);
            setLoading(false);
        });
    });
    return (
        <div className='flex
         w-fit text-gray items-center justify-center uppercase text-base'>
            <img className='w-fit p-1 object-contain h-2 md:h-fit' src={spotify} alt="" />

            {loading ? <div className='flex p-2
         w-fit text-gray uppercase text-base'>
                <p className="font-PPNeueMontreal tracking-wider px-1 text-base text-left uppercase">Loading...</p>
            </div>
                :

                <div className='flex p-2
         w-fit text-gray uppercase text-base'>{result.isPlaying ?
                        <div className='spotify  w-fit  h-fit py-2 flex flex-col md:flex-row justify-start items-start md:justify-center md:items-center text-sm text-left '>
                            <div className='flex items-center justify-center tracking-wider'>
                                <a className="font-PPNeueMontreal px-1 text-xs md:text-base text-left uppercase" href={result.songUrl} target="_blank">{result.title}</a>
                            </div>
                            <div>                            <p className="font-PPNeueMontreal px-1 text-xs md:text-base text-left uppercase">{result.artist}</p></div>


                        </div> : "Reine is offline"}

                </div>
            }





        </div>
    )
}

export default NowPlaying