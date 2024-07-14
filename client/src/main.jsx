import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Flowbite } from 'flowbite-react'
import './index.css'
import { Web3Provider } from './config/Web3Provider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Flowbite>
    <Web3Provider>
      <App />
    </Web3Provider>
  </Flowbite>
    
  
)
