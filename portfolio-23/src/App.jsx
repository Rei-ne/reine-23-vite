import { useState } from 'react'
import './App.css'

function App() {


  return (
    <div className="App flex flex-col justify-center items-center h-screen bg-black">
      <div className="hero-section ">

        {/* <div className="image-container-mobile">
    <img className='reine-img' src={reine} alt="reine-image" />
    <img className='background-svg' src={background} alt="background-svg" />
</div> */}
        {/* REINE DEV headline */}
        <div className="text-mint text-center">
          <h1 className="font-Kaldera text-3xl lg:text-5xl">REINE</h1>
          <h1 className="font-Kaldera text-3xl lg:text-5xl ">DEV.</h1>
          <div className="">
            <p className="font-GT_Flexa text-sm lg:text-base">Hello, I'm Toyosi, a software developer and I'm constantly evolving.</p>
          </div>
        </div>
        <div className="">

        </div>

      </div>

    </div>
  )
}

export default App
