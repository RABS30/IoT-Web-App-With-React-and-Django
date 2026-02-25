import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import HelloWorld, {HalloDunia} from './components/HelloWorld.jsx'
import Nested from './components/Nested.jsx'
import App from './App.jsx'

import './styles.css'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
