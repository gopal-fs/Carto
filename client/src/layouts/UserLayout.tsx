import React from 'react'
import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

const UserLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <div className="flex flex-col flex-1">
        <Navbar />

        {/* ONLY THIS PART SCROLLS */}
        <div className="flex-1 overflow-y-scroll">
          <Outlet />
        </div>

      </div>
    </div>
  )
}


export default UserLayout