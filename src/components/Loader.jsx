import React from 'react'
import '../styles/Loader.scss'


const Loader = () => {
    return (
        <div className='loader border h-screen bg-black text-mint'>

            <div className="sm:w-full flex justify-center align-center sm:h-6 md:h-10 p-0 m-0 ">
                <h2 className="sm:w-80 object-contain font-GT_Flexa text-center text-3xl">REINE IS COOKING...</h2>
            </div>
            <div className="sm:w-full flex  justify-center align-center sm:h-6 md:h-10 p-0 mt-1">
                <h2 className="sm:w-80 object-contain font-GT_Flexa text-center text-3xl">ARE YOU READY?</h2>
            </div>
            <div className='font-Kaldera'>
                <h1>100%</h1>
            </div>
        </div>
    )
}

export default Loader