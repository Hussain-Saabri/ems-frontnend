import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {Routes, Route} from 'react-router-dom'
import './App.css'
import Login from './features/auth/components/Login'
import Signup from './features/auth/components/Signup'
function App() {
  

  return (
    <>
      <Routes>
     
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      
     
    </Routes>
      
    </>
  )
}

export default App
