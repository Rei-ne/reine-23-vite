import { useState } from 'react'
// import { ScrollToTop } from './Components/ScrollToTop';
// import {
//   BrowserRouter,
//   Routes,
//   Route,
// } from "react-router-dom";

import Homepage from "./pages/Homepage"

import './App.css';
import Navbar from './components/Navbar';
import Loader from './components/Loader';

import ReactGA from 'react-ga'
ReactGA.initialize('$(import.meta.env.VITE_APP_GOOGLE_ANALYTICS)')

function App() {

  const [loading, setLoading] = useState(true);

  {
    setTimeout(() => {
      setLoading(false)
    }, 3500)
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
