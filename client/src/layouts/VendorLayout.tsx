import { Outlet, NavLink, useNavigate } from "react-router-dom"
import { useState } from "react"
import {
  LayoutDashboard,
  Package,
  PackagePlus,
  FlaskConical,
  ClipboardList,
  LogOut,
  Menu,
  X,
  User,
  ChevronRight,
} from "lucide-react"
import type { AppDispatch } from "../context/store"
import { useDispatch } from "react-redux"
import { logoutUser } from "../context/user"
import toast from "react-hot-toast"

const navLinks = [
  { to: "/vendor", end: true, icon: LayoutDashboard, label: "Dashboard" },
  { to: "/vendor/products", icon: Package, label: "My Products" },
  { to: "/vendor/add-product", icon: PackagePlus, label: "Add Product" },
  { to: "/vendor/sell-sample", icon: FlaskConical, label: "Sell Sample" },
  { to: "/vendor/orders", icon: ClipboardList, label: "Orders" },
]

const VendorLayout = () => {
  const [open, setOpen] = useState(false)
  const [isAvailable, setIsAvailable] = useState(true)

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
    <div className="flex h-screen bg-gray-50">

      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* ──── Sidebar ──── */}
      <aside className={`
        fixed lg:relative top-0 left-0
        h-screen w-[260px]
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

        {/* Logo + Brand */}
        <div className="flex items-center gap-3 px-5 py-5 border-b border-gray-100">
          <img src="/logosym.png" className="h-9 w-9 object-contain rounded-lg" />
          <div>
            <p className="text-sm font-bold text-gray-800 leading-tight">Carto</p>
            <p className="text-[10px] text-indigo-500 font-semibold leading-tight tracking-wide">VENDOR PANEL</p>
          </div>
        </div>

        {/* Vendor info chip */}
        <div className="mx-3 mt-3 mb-1 px-3 py-2.5 bg-indigo-50 rounded-xl flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-indigo-200 flex items-center justify-center flex-shrink-0">
            <User size={14} className="text-indigo-700" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold text-gray-800 truncate">Rajesh Traders</p>
            <p className="text-[10px] text-indigo-500 truncate">Wholesale Supplier</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-0.5 px-3 py-3 flex-1 overflow-y-auto">
          {navLinks.map(({ to, end, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-xl transition text-sm font-medium group
                ${isActive
                  ? "bg-indigo-600 text-white shadow-sm shadow-indigo-200"
                  : "text-gray-600 hover:bg-indigo-50 hover:text-indigo-700"}`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon size={17} />
                  <span className="flex-1">{label}</span>
                  {!isActive && (
                    <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition text-indigo-400" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Bottom */}
        <div className="px-3 py-4 border-t border-gray-100 flex flex-col gap-2">

          {/* Availability toggle */}
          <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-gray-50">
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-gray-700">Availability</span>
              <span className={`text-[11px] font-bold ${isAvailable ? "text-indigo-600" : "text-red-500"}`}>
                {isAvailable ? "Active" : "Inactive"}
              </span>
            </div>
            <button
              onClick={() => setIsAvailable(!isAvailable)}
              className={`relative w-[44px] h-[23px] rounded-full transition-colors duration-300
              ${isAvailable ? "bg-indigo-500" : "bg-red-400"}`}
            >
              <span
                className={`absolute top-[2px] left-[2px] h-[19px] w-[19px] bg-white rounded-full shadow-md transition-transform duration-300
                ${isAvailable ? "translate-x-[21px]" : ""}`}
              />
            </button>
          </div>

          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-red-50 hover:text-red-600 transition cursor-pointer">
            <LogOut size={17} />
            Logout
          </button>

        </div>
      </aside>

      {/* ──── Main ──── */}
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
            <div>
              <h1 className="text-sm font-bold text-gray-800">Vendor Dashboard</h1>
              <p className="text-[11px] text-gray-400 hidden sm:block">Manage your wholesale business</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border
              ${isAvailable ? "bg-indigo-50 text-indigo-600 border-indigo-200" : "bg-red-50 text-red-500 border-red-200"}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${isAvailable ? "bg-indigo-500" : "bg-red-500"}`} />
              {isAvailable ? "Active" : "Inactive"}
            </div>
            <div className="h-9 w-9 rounded-full bg-indigo-100 flex cursor-pointer items-center justify-center border border-indigo-200">
              <User size={16} className="text-indigo-600" />
            </div>
          </div>

        </header>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
          <Outlet />
        </main>

      </div>
    </div>
  )
}

export default VendorLayout
