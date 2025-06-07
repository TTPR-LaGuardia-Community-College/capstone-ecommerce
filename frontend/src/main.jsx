import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import ShoppingCart from './Components/ShoppingCart/ShoppingCart.jsx'
import App from './App.jsx'
import ContextProvider from './Context/Context.jsx'
import './index.css'

const router = createBrowserRouter([

  {
    path: '/',
    element: <App/>
  },
  {
    path: '/cart',
    element: <ShoppingCart/>
  }


])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContextProvider>
      <RouterProvider router ={router} /> 
    </ContextProvider>
  </StrictMode>,
)
