import React from 'react'
import './NavigationBar.css' 
import { Link } from 'react-router-dom'


const NavigationBar = () => {
  return (
    <div className='nav-container'>
      <nav className='navbar'>
        <Link to  = '/'>
        <h1 className='navbar-logo'>logo goes here</h1>
        </Link>
        <Link to = '/cart'>
        <h2 className='navbar-cart'>🛒</h2>
        </Link>
      </nav>
    </div>
  )
}

export default NavigationBar
