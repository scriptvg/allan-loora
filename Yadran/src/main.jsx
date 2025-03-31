import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import './components/global/variables.css'
import './components/global/animations.css'
import './components/global/global.css'
import './components/global/bootstrap-override.css'

import "leaflet/dist/leaflet.css";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
