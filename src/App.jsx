
import './App.css'
import Button from './components/Button'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Opportunities from './components/opportunities/Opportunities'
import { RouterProvider } from 'react-router-dom'
import { router } from './router/router'

function App() {
  


  return <RouterProvider router={router}/>
}

export default App
