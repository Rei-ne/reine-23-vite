import React from 'react'
import spotify from '../assets/images/Vector.png'
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
        <div className='flex p-2
         w-fit text-gray uppercase'>
            <img className=' p-1 object-contain h-full' src={spotify} alt="" />

            {loading ? <p className="font-GT_Flexa px-1 text-base text-left uppercase">Loading...</p>
                :

                <div>{result.isPlaying ?
                    <div className='spotify h-full flex justify-center items-center text-sm '>
                        <a className="font-GT_Flexa px-1 text-base text-left uppercase" href={result.songUrl} target="_blank">{result.title}</a>
                        <p className="font-GT_Flexa px-1 text-base text-left uppercase">{result.artist}</p>

                    </div> : "Currently offline"}

                </div>
            }





        </div>
    )
}

export default NowPlaying