import { Store } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Notifications = () => {
    const navigate=useNavigate();
return (
    

<div className="w-full p-4 lg:p-8 bg-gray-50 min-h-screen">

{/* PAGE TITLE */}

<h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-6">
Notifications
</h1>


{/* NOTIFICATIONS LIST */}

<div className="space-y-4">


{/* SINGLE NOTIFICATION CARD */}

<div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">

<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

{/* LEFT CONTENT */}

<div className="flex items-start gap-3">

{/* SHOP ICON */}

<div className="bg-green-100 p-3 rounded-full">
<Store className="w-5 h-5 text-green-600"/>
</div>

{/* TEXT CONTENT */}

<div>

<h2 className="font-semibold text-gray-800">
Kumari Pickles
</h2>

<p className="text-xs text-gray-500 mb-1">
Pickles Shop
</p>

<p className="text-sm text-gray-700">
Special Offer! Get <span className="font-semibold text-green-600">20% OFF</span> on all mango pickles.
Use coupon <span className="font-semibold text-blue-600">MANGO20</span>.
</p>

<p className="text-xs text-gray-500 mt-1">
Offer valid till: 20 Mar 2026
</p>

</div>

</div>


{/* ACTION BUTTON */}

<div>

<button onClick={()=>navigate('/user/shops/id')} className="px-4 py-2 bg-green-600 text-white cursor-pointer rounded-lg text-sm hover:bg-green-700 transition">
View Shop
</button>

</div>

</div>

</div>



</div>

</div>

);
};

export default Notifications;