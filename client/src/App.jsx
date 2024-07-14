//import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom'
import Landing from './pages/LandingPage'
import Tokenize from './pages/TokenizeEstate'


function App() {
  

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/tokenize-estate' element={<Tokenize/>}/>
      </Routes>
    </Router>
  )
}

export default App
