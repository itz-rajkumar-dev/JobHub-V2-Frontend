import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Toaster } from "react-hot-toast";
import './index.css'
import App from './App.jsx'
import { ApplicationProvider } from "./context/ApplicationContext";
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <ApplicationProvider>
    <BrowserRouter>
      <App />
       <Toaster position="top-right" />
    </BrowserRouter>
    </ApplicationProvider>
  </StrictMode>
)