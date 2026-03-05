import React from 'react'
import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

const MainLayout = () => {
  return (
    <div className='flex'>
        <Sidebar />
        <div className='flex flex-col w-full h-screen overflow-y-scroll'>
          <Navbar />
          <Outlet />
        </div>
        
    </div>
  )
}

export default MainLayout