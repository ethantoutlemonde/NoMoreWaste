import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './Router.jsx'
import { ContextProvider } from './contexts/ContextProvider.jsx'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider.js'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContextProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <RouterProvider router={router}/>
      </LocalizationProvider>
      
    </ContextProvider>
    
  </React.StrictMode>,
)
