import { Heart, Wallet, Package, Star, Bell, HelpCircle, LogOut } from "lucide-react";

const Profile = () => {

return (

<div className="w-full p-4 lg:p-8 bg-gray-50 min-h-screen">

{/* PROFILE CARD */}

<div className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col items-center mb-6">

{/* PROFILE IMAGE */}

<div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center text-white text-2xl font-bold mb-3">
G
</div>

{/* NAME */}

<h2 className="text-xl font-semibold text-gray-800">
Gopala Krishna
</h2>

{/* LOCATION */}

<p className="text-sm text-gray-500">
Andhra Pradesh, India
</p>

</div>



{/* QUICK ACTIONS */}

<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">


{/* Saved Shops */}

<button className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col items-center gap-2 hover:bg-gray-50">

<Heart className="text-red-500"/>

<span className="text-sm font-medium">
Saved Shops
</span>

</button>


{/* Wallet */}

<button className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col items-center gap-2 hover:bg-gray-50">

<Wallet className="text-green-600"/>

<span className="text-sm font-medium">
Wallet
</span>

</button>


{/* Orders */}

<button className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col items-center gap-2 hover:bg-gray-50">

<Package className="text-blue-600"/>

<span className="text-sm font-medium">
Orders
</span>

</button>


{/* Reviews */}

<button className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col items-center gap-2 hover:bg-gray-50">

<Star className="text-yellow-500"/>

<span className="text-sm font-medium">
Reviews
</span>

</button>


{/* Notifications */}

<button className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col items-center gap-2 hover:bg-gray-50">

<Bell className="text-purple-600"/>

<span className="text-sm font-medium">
Notifications
</span>

</button>


{/* Help */}

<button className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col items-center gap-2 hover:bg-gray-50">

<HelpCircle className="text-gray-600"/>

<span className="text-sm font-medium">
Help
</span>

</button>


{/* Logout */}

<button className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col items-center gap-2 hover:bg-gray-50">

<LogOut className="text-red-500"/>

<span className="text-sm font-medium">
Logout
</span>

</button>

</div>

</div>

);
};

export default Profile;