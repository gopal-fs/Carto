import { Bell, PanelsTopLeft, Wallet } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate=useNavigate();
  return (
    <div className='flex  justify-between items-center bg-white border-b-2 px-4 border-gray-200 w-full h-[9vh]'>
        <div className=' lg:hidden flex gap-1 items-center cursor-pointer'>
            <PanelsTopLeft size={30} />
        </div>
        <input type='text' placeholder='Search Shops...'  className='max-w-[600px] px-2 flex-1 hidden sm:flex bg-white rounded border-1 py-2  outline-0  border-gray-200 placeholder:text-gray-400' />
        <div className='flex gap-2 items-center'>
        <button onClick={()=>navigate('/user/notifications')} className="hover:bg-gray-300/30 h-[36px] w-[36px] p-1 cursor-pointer rounded flex items-center justify-center">
            <Bell size={20}  />
        </button>
        <button onClick={()=>navigate('/user/wallet')} className="hover:bg-gray-300/30 h-[36px] w-[36px] p-1 cursor-pointer rounded flex items-center justify-center">
            <Wallet size={20}  />
        </button>
        <button onClick={()=>navigate('/user/profile')} className=" h-[30px] w-[30px] p-1 cursor-pointer rounded flex items-center justify-center">
            <img src='/google.png' className='w-full h-full' />
        </button>
        </div>
        
    </div>
  )
}

export default Navbar