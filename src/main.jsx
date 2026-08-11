import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import ReactGA from 'react-ga4'

const GA_MEASUREMENT_ID = 'G-K7W9HJD4TW'

ReactGA.initialize(GA_MEASUREMENT_ID)
ReactGA.send({
  hitType: 'pageview',
  page: window.location.pathname + window.location.search,
  title: document.title,
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
