import { Outlet, NavLink, useNavigate } from "react-router-dom"
import { useState } from "react"
import {
  LayoutDashboard,
  ClipboardList,
  User,
  LogOut,
  Menu,
  X,
  Star,
  Bike,
} from "lucide-react"
import { useDispatch } from "react-redux"
import type { AppDispatch } from "../context/store"
import { logoutUser } from "../context/user"
import toast from "react-hot-toast"

const navLinks = [
  { to: "/delivery", end: true, icon: LayoutDashboard, label: "Dashboard" },
  { to: "/delivery/orders", icon: ClipboardList, label: "Orders" },
  { to: "/delivery/profile", icon: User, label: "Profile" },
]

const DeliveryLayout = () => {
  const [open, setOpen] = useState(false)
  const [isActive, setIsActive] = useState(true)

  const dispatch=useDispatch<AppDispatch>();
  const navigate=useNavigate();

  const handleLogout=async()=>{
    const res=await dispatch(logoutUser());
    if(logoutUser.fulfilled.match(res)){
      return navigate('/login');
    }
    return toast.error("Logout Failed")

  }

  return (
    <div className="flex h-screen bg-gray-100">

      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* ── Sidebar ── */}
      <aside className={`
        fixed lg:relative top-0 left-0
        h-screen w-[250px]
        bg-white border-r border-gray-100
        flex flex-col
        transform ${open ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
        transition-transform duration-300
        z-50
      `}>

        {/* Mobile close */}
        <div className="lg:hidden flex justify-end p-4 pb-0">
          <button onClick={() => setOpen(false)} className="p-1.5 rounded-lg hover:bg-gray-100 transition">
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-5 border-b border-gray-100">
          <img src="/logosym.png" className="h-9 w-9 object-contain rounded-xl" />
          <div>
            <p className="text-sm font-bold text-gray-800 leading-tight">Carto</p>
            <p className="text-[10px] text-teal-500 font-semibold leading-tight tracking-widest uppercase">Delivery</p>
          </div>
        </div>

        {/* Rider card */}
        <div className="mx-3 mt-3 px-3 py-3 bg-teal-50 rounded-xl border border-teal-100">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-teal-200 flex items-center justify-center flex-shrink-0 overflow-hidden border-2 border-teal-300">
              <User size={18} className="text-teal-700" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-gray-800 truncate">Ravi Kumar</p>
              <p className="text-[11px] text-teal-600 font-medium truncate">Delivery Partner</p>
            </div>
          </div>

          {/* Rating */}
          <div className="mt-2.5 flex items-center justify-between">
            <div className="flex items-center gap-1">
              {[1,2,3,4,5].map(i => (
                <Star
                  key={i}
                  size={13}
                  className={i <= 4 ? "text-amber-400 fill-amber-400" : "text-gray-300 fill-gray-200"}
                />
              ))}
              <span className="text-xs font-bold text-gray-700 ml-1">4.7</span>
            </div>
            <span className="text-[10px] text-gray-400">218 deliveries</span>
          </div>
        </div>

        {/* Active / Inactive toggle */}
        <div className="mx-3 mt-2 px-3 py-2.5 bg-gray-50 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-700">Status</p>
            <p className={`text-[11px] font-bold ${isActive ? "text-teal-600" : "text-gray-400"}`}>
              {isActive ? "Active — On duty" : "Inactive — Off duty"}
            </p>
          </div>
          <button
            onClick={() => setIsActive(p => !p)}
            className={`relative w-[44px] h-[23px] rounded-full transition-colors duration-300
            ${isActive ? "bg-teal-500" : "bg-gray-300"}`}
          >
            <span className={`absolute top-[2px] left-[2px] h-[19px] w-[19px] bg-white rounded-full shadow-md transition-transform duration-300
            ${isActive ? "translate-x-[21px]" : ""}`} />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex flex-col gap-1 px-3 py-3 flex-1 overflow-y-auto">
          {navLinks.map(({ to, end, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive: active }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-xl transition text-sm font-medium
                ${active
                  ? "bg-teal-500 text-white shadow-sm"
                  : "text-gray-600 hover:bg-teal-50 hover:text-teal-700"}`
              }
            >
              <Icon size={17} />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="px-3 py-4 border-t border-gray-100">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-red-50 hover:text-red-600 transition cursor-pointer">
            <LogOut size={17} />
            Logout
          </button>
        </div>

      </aside>

      {/* ── Main ── */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Topbar */}
        <header className="h-[64px] bg-white border-b border-gray-100 flex items-center justify-between px-5 flex-shrink-0 shadow-sm">

          <div className="flex items-center gap-3">
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition"
              onClick={() => setOpen(true)}
            >
              <Menu size={20} className="text-gray-600" />
            </button>
            <div className="flex items-center gap-2">
              <Bike size={18} className="text-teal-600" />
              <div>
                <h1 className="text-sm font-bold text-gray-800">Delivery Panel</h1>
                <p className="text-[11px] text-gray-400 hidden sm:block">Ravi Kumar</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Status pill */}
            <div
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border cursor-pointer select-none transition
              ${isActive
                ? "bg-teal-50 text-teal-600 border-teal-200"
                : "bg-gray-100 text-gray-400 border-gray-200"}`}
              onClick={() => setIsActive(p => !p)}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-teal-500 animate-pulse" : "bg-gray-400"}`} />
              {isActive ? "Active" : "Inactive"}
            </div>

            {/* Rating chip */}
            <div className="hidden sm:flex items-center gap-1 bg-amber-50 border border-amber-200 px-2.5 py-1.5 rounded-full">
              <Star size={12} className="text-amber-500 fill-amber-400" />
              <span className="text-xs font-bold text-amber-600">4.7</span>
            </div>

            <div className="h-9 w-9 rounded-full bg-teal-100 flex items-center justify-center border border-teal-200">
              <User size={16} className="text-teal-700" />
            </div>
          </div>

        </header>

        {/* Page content — pass isActive via outlet context */}
        <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
          <Outlet context={{ isActive }} />
        </main>

      </div>
    </div>
  )
}

export default DeliveryLayout
