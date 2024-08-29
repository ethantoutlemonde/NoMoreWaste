import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './Router.jsx'

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import { I18nextProvider } from 'react-i18next'
import i18next from 'i18next'

import global_en from './locales/en/global.json'
import global_fr from './locales/fr/global.json'
import App from './App.jsx'
import './index.css'

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

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <I18nextProvider i18n={i18next}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      
      <RouterProvider router={router}/>
      </LocalizationProvider>
    </I18nextProvider>
  </StrictMode>,
)
