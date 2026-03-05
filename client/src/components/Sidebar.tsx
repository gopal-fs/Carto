import { useState } from "react";
import {
    LayoutDashboard,
    Store,
    ShoppingCart,
    Package,
    Star,
    Heart,
    Wallet,
    Bell,
    Settings,
    ChevronLeft,
    ChevronRight,
    LogOut,
    User,
    
} from "lucide-react";
import { useNavigate } from "react-router-dom";

type MenuItem = {
    name: string;
    icon: React.ElementType;
};

const menuItems: MenuItem[] = [
    { name: "Dashboard", icon: LayoutDashboard },
    { name: "Shops", icon: Store },
    { name: "Cart", icon: ShoppingCart },
    { name: "Orders", icon: Package },
    { name: "Reviews", icon: Star },
    { name: "whistlist", icon: Heart },
    { name: "Wallet", icon: Wallet },
    { name: "Notifications", icon: Bell },
    {name:"Profile",icon:User},
    { name: "Settings", icon: Settings },
    
];

const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [active, setActive] = useState("Dashboard");
    const navigate=useNavigate();

    const onNavigate=(itemName:string):void=>{
        setActive(itemName);
        navigate(itemName.toLocaleLowerCase());
        
        
    }

    return (
        <aside
            className={`h-screen bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ${collapsed ? "w-[80px]" : "w-[250px]"} hidden lg:flex fixed left-0 top-0 z-40 lg:relative lg:z-0`}>
            {/* Top */}
            <div className="flex items-center justify-between p-4 ">
                {!collapsed && (
                    <img
                        src="/logosym.png"
                        className="h-[35px] object-contain"
                        alt="logo"
                    />
                )}

                <button
                    onClick={() => setCollapsed((prev) => !prev)}
                    className="p-1 rounded-md hover:bg-gray-100 transition"
                >
                    {collapsed ? <ChevronRight className="cursor-pointer" size={20} /> : <ChevronLeft className="cursor-pointer" size={20} />}
                </button>
            </div>

            {/* Menu */}
        
            <nav className="flex-1 overflow-hidden py-4 flex flex-col gap-3 px-2">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = active === item.name;

                    return (
                        <button
                            key={item.name}
                            onClick={()=>onNavigate(item.name)}
                            className={`
              flex items-center gap-3 w-full px-3
              py-2.5 text-sm text-gray-700
              rounded transition-all duration-200 cursor-pointer
              ${isActive
                                    ? "bg-slate-200/60"
                                    : "hover:bg-gray-100/70"
                                }
              `}
                        >
                            <Icon
                                size={20}
                                strokeWidth={1.7}
                                className="min-w-[20px]"
                            />

                            {!collapsed && (
                                <span className="truncate">{item.name}</span>
                            )}
                        </button>
                    );
                })}
            </nav>


            <div className="mt-auto">
                <div className="border-t border-gray-200"></div>

                {/* Profile */}
                <div className="p-4 flex items-center gap-3">
                    <img
                        src="https://i.pravatar.cc/40"
                        className="w-10 h-10 rounded-full"
                        alt="profile"
                    />

                    {!collapsed && (
                        <div className="flex flex-col overflow-hidden flex-1">
                            <span className="text-sm font-medium text-gray-700 truncate">
                                Gopala Krishna
                            </span>
                            <span className="text-xs text-gray-400">User</span>
                        </div>
                    )}

                    <LogOut
                        size={18}
                        className="text-gray-500 cursor-pointer hover:text-red-500 transition"
                    />
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;