import { Outlet, NavLink, useNavigate } from "react-router-dom"
import { useState } from "react"
import {
  LayoutDashboard,
  Package,
  Store,
  LogOut,
  Menu,
  X,
  User,
  Tag,
  PackagePlus,
  BadgeDollarSign,
  Orbit
} from "lucide-react"
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../context/store";
import { logoutUser } from "../context/user";
import toast from "react-hot-toast";

const ShopLayout = () => {

  const [open, setOpen] = useState(false);
  const [isClosed,setIsClosed]=useState<boolean>(false);
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

      {/* Sidebar */}
      <aside className={`
        fixed lg:relative
        top-0 left-0
        h-screen w-[250px]
        bg-white
        text-black
        transform ${open ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
        transition-transform duration-300
        z-50
      `}>

        {/* Mobile Close */}
        <div className="lg:hidden flex justify-end p-4">
          <button onClick={()=>setOpen(false)}>
            <X size={24}/>
          </button>
        </div>

        {/* Logo */}
        <div className="flex items-center justify-center py-6">
          <img src="/logosym.png" className="h-[40px]" />
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2 px-4">

          <NavLink
            to="/shop/id"
            end
            className={({isActive}) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition
              ${isActive
                ? "bg-emerald-500 text-white font-medium"
                : "hover:bg-emerald-500 hover:text-white"}`
            }
          >
            <LayoutDashboard size={18}/>
            Dashboard
          </NavLink>


          <NavLink
            to="/shop/id/vendor"
            end
            className={({isActive}) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition
              ${isActive
                ? "bg-emerald-500 text-white font-medium"
                : "hover:bg-emerald-500 hover:text-white"}`
            }
          >
            <Orbit size={18}/>
            Space
          </NavLink>

          




          <NavLink
            to="/shop/id/products"
            className={({isActive}) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition
              ${isActive
                ? "bg-emerald-500 text-white font-medium"
                : "hover:bg-emerald-500 hover:text-white"}`
            }
          >
            <Package size={18}/>
            Products
          </NavLink>

          <NavLink
            to="/shop/id/add-products"
            className={({isActive}) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition
              ${isActive
                ? "bg-emerald-500 text-white font-medium"
                : "hover:bg-emerald-500 hover:text-white"}`
            }
          >
            <PackagePlus size={18}/>
            Add Products
          </NavLink>

          

          <NavLink
            to="/shop/id/shop-page"
            className={({isActive}) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition
              ${isActive
                ? "bg-emerald-500 text-white font-medium"
                : "hover:bg-emerald-500 hover:text-white"}`
            }
          >
            <Store size={18}/>
            Shop
          </NavLink>

          <NavLink
            to="/shop/id/coupons"
            className={({isActive}) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition
              ${isActive
                ? "bg-emerald-500 text-white font-medium"
                : "hover:bg-emerald-500 hover:text-white"}`
            }
          >
            <Tag size={18}/>
            Coupons
          </NavLink>

          <NavLink
            to="/shop/id/sale"
            end
            className={({isActive}) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition
              ${isActive
                ? "bg-emerald-500 text-white font-medium"
                : "hover:bg-emerald-500 hover:text-white"}`
            }
          >
            <BadgeDollarSign size={18} />
            Sale
          </NavLink>

          <div className="mt-6 border-t pt-4 flex flex-col gap-4">

  {/* Toggle */}
  <div className="flex items-center justify-between px-2">

    <div className="flex flex-col">
      <span className="text-sm font-medium text-gray-800">
        Shop Status
      </span>

      <span
        className={`text-xs font-semibold ${
          isClosed ? "text-red-500" : "text-emerald-600"
        }`}
      >
        {isClosed ? "Closed" : "Open"}
      </span>
    </div>

    <button
      onClick={() => setIsClosed(!isClosed)}
      className={`relative w-[46px] h-[24px] rounded-full transition-colors duration-300
      ${isClosed ? "bg-red-400" : "bg-emerald-500"}`}
    >

      <span
        className={`absolute top-[2px] left-[2px] h-[20px] w-[20px] bg-white rounded-full shadow-md transition-transform duration-300
        ${isClosed ? "translate-x-[22px]" : ""}`}
      />

    </button>

  </div>

  {/* Logout */}
  <button onClick={handleLogout} className="flex cursor-pointer items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-500 hover:text-white">
    <LogOut size={18}/>
    Logout
  </button>

</div>

          

        </nav>

      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col">

        {/* Topbar */}
        <header className="h-[70px] bg-white shadow-sm flex items-center justify-between px-6">

          <button
            className="lg:hidden"
            onClick={()=>setOpen(true)}
          >
            <Menu size={24}/>
          </button>

          <h1 className="text-lg font-semibold text-gray-800">
            Shop Dashboard
          </h1>

          <div className="flex items-center gap-3">

            <div className="h-10 w-10 rounded-full bg-emerald-100 flex cursor-pointer items-center justify-center">
              <User size={18} className="text-emerald-600"/>
            </div>

          </div>

        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet/>
        </main>

      </div>

    </div>
  )
}

export default ShopLayout