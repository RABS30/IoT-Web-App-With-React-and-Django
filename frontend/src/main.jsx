import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'

import './styles.css'
import UserVerification from './api/UserVerification.jsx'


createRoot(document.getElementById('root')).render(
  <UserVerification>
    <App />
  </UserVerification>
)
