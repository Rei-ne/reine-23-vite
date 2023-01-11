// import { useState } from 'react'
import AnchorLink from 'react-anchor-link-smooth-scroll'
import Homepage from "./pages/Homepage"
import './App.css';

function App() {


  return (
    <div className="App">
      <h2>
        <AnchorLink href="#about">ABOUT ME</AnchorLink>
        <AnchorLink href="#work">MY WORKS</AnchorLink>
        <AnchorLink href="#contact">CONTACT ME</AnchorLink>
      </h2>

      <Homepage />
    </div>
  )
}

export default App
