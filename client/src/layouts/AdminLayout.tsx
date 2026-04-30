import { Outlet, NavLink } from "react-router-dom"
import { useState } from "react"
import {
  LayoutDashboard,
  LogOut,
  Menu,
  X,
  ShieldCheck,
} from "lucide-react"
import toast from "react-hot-toast";



const AdminLayout = () => {
  const [open, setOpen] = useState(false);
  const [login,setLogin]=useState<boolean>(
    () => localStorage.getItem("token") !== null
  );
  const [email,setEmail]=useState<string>("");
  const [password,setPassword]=useState<string>("");

  const handleLogin=()=>{
    if(email===import.meta.env.VITE_ADMIN_EMAIL && password===import.meta.env.VITE_ADMIN_PASSWORD){
      localStorage.setItem("token",JSON.stringify(import.meta.env.VITE_ADMIN_TOKEN));
      setLogin(true);
      toast.success("Login Successfull")
    }
    else{
      toast.error("Please Check Credentials")
    }
  }

  return (
    login?
    <div className="flex h-screen bg-gray-100">

      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* ── Sidebar ── */}
      <aside className={`
        fixed lg:relative top-0 left-0
        h-screen w-[220px]
        bg-slate-900 text-white
        flex flex-col
        transform ${open ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
        transition-transform duration-300
        z-50
      `}>

        {/* Mobile close */}
        <div className="lg:hidden flex justify-end p-4 pb-0">
          <button onClick={() => setOpen(false)} className="p-1.5 rounded-lg hover:bg-white/10 transition">
            <X size={18} className="text-white/70" />
          </button>
        </div>

        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-5 border-b border-white/10">
          
          <div>
            <p className="text-sm font-bold text-white leading-tight">Carto</p>
            <p className="text-[10px] text-slate-400 font-semibold leading-tight tracking-widest uppercase">Admin</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-1 px-3 py-4 flex-1">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-xl transition text-sm font-medium
              ${isActive ? "bg-white text-slate-900" : "text-slate-400 hover:bg-white/10 hover:text-white"}`
            }
          >
            <LayoutDashboard size={17} />
            Dashboard
          </NavLink>
        </nav>

        {/* Logout */}
        <div className="px-3 py-4 border-t border-white/10">
          <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:bg-red-500/20 hover:text-red-400 transition cursor-pointer">
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
            <button className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition" onClick={() => setOpen(true)}>
              <Menu size={20} className="text-gray-600" />
            </button>
            <div className="flex items-center gap-2">
              <ShieldCheck size={18} className="text-slate-700" />
              <h1 className="text-sm font-bold text-gray-800">Admin Panel</h1>
            </div>
          </div>
          <div className="h-9 w-9 rounded-full bg-slate-900 flex items-center justify-center">
            <ShieldCheck size={16} className="text-white" />
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
          <Outlet />
        </main>

      </div>
    </div>
    :<div className="min-h-screen bg-gray-800 w-full flex flex-col justify-center items-center">
    <form className="border-1 text-white p-2 w-[full] flex flex-col gap-4 border-gray-200 rounded">
          <input onChange={(e)=>setEmail(e.target.value)} type="email" name="email" className="rounded p-2 border-1 border-gray-50" value={email} placeholder="Enter Your Email" />
          <input onChange={(e)=>setPassword(e.target.value)} type="password" name="password" className="rounded p-2 border-1 border-gray-50" value={password} placeholder="Enter Your Password" />
          <button onClick={handleLogin} className="rounded bg-white h-[36px] w-[full] cursor-pointer text-black">Login</button>
    </form>

  </div>
  )
}

export default AdminLayout
