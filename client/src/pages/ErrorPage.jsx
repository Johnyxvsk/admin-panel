import React from 'react'
import NavBar from '../components/navbar/Navbar'
import Sidebar from '../components/sidebar/Sidebar'

const ErrorPage = () => {
  return (
    <div>
        <Sidebar/>
        <NavBar/>
        <h1>404 PAGE NOT FOUND</h1>
    </div>
  )
}

export default ErrorPage