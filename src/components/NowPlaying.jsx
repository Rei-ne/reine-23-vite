import React from 'react'
import spotify from '../assets/images/Vector.png'

const NowPlaying = () => {
    // const spotifyWrapper = document.querySelector(".spotify");
    // const artistTemplate = (artistObject) =>
    //     `<a href="${artistObject.url}">${artistObject.name}</a>`;

    // fetch("/.netlify/functions/spotify")
    //     .then((res) => res.json())
    //     .then(({ trackUrl, name, artists }) => {
    //         spotifyWrapper.innerHTML = `<div class="song">
    //             <a href="${trackUrl}">
    //                 ${name}
    //             </a>
    //         </div>
    //         <div class="artists">${artists
    //                 .map((artist) => artistTemplate(artist))
    //                 .join(", ")}</div>`;
    //         console.log(name)
    //     })
    //     .catch((err) => console.error(err));

    return (
        <div className='flex p-2
         w-fit text-gray uppercase'>
            <div className=''>
                <img className=' p-1 object-contain h-full' src={spotify} alt="" />

            </div>
            <div className="spotify p-1 flex justify-center items-center text-sm">
                <p className="font-GT_Flexa px-1 text-base text-left uppercase"> Not connected</p>
            </div>
        </div>
    )
}

export default NowPlaying