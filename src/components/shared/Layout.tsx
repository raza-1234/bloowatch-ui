import React from 'react'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import Footer from './Footer'
import Header from './Header'

const Layout = () => {
  return (
    <main>
      <ToastContainer/>
      <Header/>
      <div className='main-content'>
        <Outlet/>
      </div>
      <Footer/>
    </main>
  )
}

export default Layout
