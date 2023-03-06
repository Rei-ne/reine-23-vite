import React from 'react'

const Loader = () => {
    return (
        <div className='border'>
            <div className="sm:w-full md:border-none flex flex-col justify-center items-center pt-2 mt-8 md:m-0 z-10 font-normal sm:mt-20 sm:h-14 lg:z-0 md:h-full ">
                <div className="sm:w-full flex justify-center align-center sm:h-6 md:h-10 p-0 m-0 ">
                    <h1 className="sm:w-80 object-contain font-Kaldera text-justify sm:text-3xl  md:text-4xl lg:text-5xl">REINE</h1>
                </div>
                <div className="sm:w-full flex  justify-center align-center sm:h-6 md:h-10 p-0 mt-1">
                    <h1 className="sm:w-80 object-contain font-Kaldera text-justify sm:text-3xl md:text-4xl lg:text-5xl">DEV.</h1>
                </div>
            </div>
        </div>
    )
}

export default Loader