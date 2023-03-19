import { useState } from 'react'
// import { ScrollToTop } from './Components/ScrollToTop';
// import {
//   BrowserRouter,
//   Routes,
//   Route,
// } from "react-router-dom";
import { useEffect } from "react";
import { useRef } from "react";
import Homepage from "./pages/Homepage"

import './App.css';
import Navbar from './components/Navbar';
import Loader from './components/Loader';

function App() {

  const [loading, setLoading] = useState(true);

  {
    setTimeout(() => {
      setLoading(false)
    }, 4800)
  }
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div >
          {/* <BrowserRouter> */}
          {/* <ScrollToTop /> */}

          <Navbar />
          {/* <Routes>
          <Route path="/" element={} />
          </Routes> */}
          <Homepage />
          {/* </BrowserRouter> */}

        </div>
      )}
    </>
  )
}

export default App
