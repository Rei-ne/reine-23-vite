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
import Footer from "./components/Footer";

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
      <Footer />
      {/* </BrowserRouter> */}

    </div>
  )
}

export default App
