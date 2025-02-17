import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './Router.jsx'
import { ContextProvider } from './contexts/ContextProvider.jsx'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider.js'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { I18nextProvider } from 'react-i18next'
import i18next from 'i18next'
import global_en from './Locales/en/global.json'
import global_fr from './Locales/fr/global.json'

i18next.init({
  interpolation: { escapeValue: false },
   lng: 'auto',
   fallbackLng: 'en',
  resources: {
   en: {
    global: global_en,
   },
   fr: {
    global: global_fr,
   },
  },
 })

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContextProvider>
      <I18nextProvider i18n={i18next}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <RouterProvider router={router}/>
        </LocalizationProvider>
      </I18nextProvider>
    </ContextProvider>
    
  </React.StrictMode>,
)
