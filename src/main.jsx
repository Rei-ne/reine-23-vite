import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import ReactGA from 'react-ga4'

const token = import.meta.env.VITE_APP_GOOGLE_ANALYTICS
ReactGA.initialize(`GA_MEASUREMENT_ID: ${token}`)


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
