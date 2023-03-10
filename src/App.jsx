// import { useState } from 'react'
// import { ScrollToTop } from './Components/ScrollToTop';
// import {
//   BrowserRouter,
//   Routes,
//   Route,
// } from "react-router-dom";

import Homepage from "./pages/Homepage"
import './App.css';
import Navbar from './components/Navbar';

function App() {


  return (
    <div>
      {/* <BrowserRouter> */}
      {/* <ScrollToTop /> */}

      <Navbar />
      {/* <Routes>
          <Route path="/" element={} />
        </Routes> */}
      <Homepage />
      {/* </BrowserRouter> */}

    </div>
  )
}

export default App
