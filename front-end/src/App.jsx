import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { useTranslation } from 'react-i18next'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const { t } = useTranslation("global")
  return (
    <>
    <p className='font-bold'>{t("coucou")}</p>
    </>
  )
}

export default App
