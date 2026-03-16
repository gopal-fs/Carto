import { useState } from "react";
import { Phone, MessageCircle, Home, Timer, Calendar } from "lucide-react";

const Orders = () => {

const [filter,setFilter] = useState("all");
const [status,setStatus] = useState("all");
const [selectedDate,setSelectedDate] = useState<number | null>(null);

const today = new Date();

const dates = Array.from({length:5},(_,i)=>{
  const d = new Date();
  d.setDate(today.getDate()+i);
  return d;
});

const clearFilters = ()=>{
setFilter("all");
setStatus("all");
setSelectedDate(null);
};

return (

<div className="w-full p-4 lg:p-8 bg-gray-50 min-h-screen">

{/* HEADER */}

<div className="flex items-center justify-between mb-6">

<h1 className="text-2xl lg:text-3xl font-bold text-gray-800">
My Orders & Bookings
</h1>

</div>


{/* FILTERS */}

<div className="bg-white p-4 rounded-xl border border-gray-200 mb-6">

{/* Filter Header */}

<div className="flex items-center justify-between mb-4">

<h2 className="font-semibold text-gray-700">
Filters
</h2>

<button
onClick={clearFilters}
className="text-sm px-3 py-1 border rounded-lg bg-gray-50 hover:bg-gray-100"
>
Clear Filters
</button>

</div>


{/* Filters Container */}

<div className="flex flex-wrap gap-3">

{/* Order Type */}

<select
value={filter}
onChange={(e)=>setFilter(e.target.value)}
className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-green-500"
>
<option value="all">All Orders</option>
<option value="instant">Instant Orders</option>
<option value="pre">Pre Orders</option>
</select>


{/* Order Status */}

<select
value={status}
onChange={(e)=>setStatus(e.target.value)}
className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-blue-500"
>
<option value="all">All Status</option>
<option value="pending">Pending</option>
<option value="confirmed">Confirmed</option>
<option value="completed">Completed</option>
<option value="cancelled">Cancelled</option>
</select>


{/* Date Filter */}

<select
value={selectedDate ?? ""}
onChange={(e)=>setSelectedDate(Number(e.target.value))}
className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-purple-500"
>

<option value="">Select Date</option>

{dates.map((date,index)=>{

const day = date.toLocaleDateString("en-US",{weekday:"short"});
const month = date.toLocaleDateString("en-US",{month:"short"});
const dayNum = date.getDate();

return(
<option key={index} value={index}>
{day} {month} {dayNum}
</option>
)

})}

</select>

</div>

</div>



{/* ORDER LIST */}

<div className="space-y-4">


{/* ORDER CARD */}

<div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">

<div className="flex flex-col lg:flex-row lg:justify-between gap-4">


{/* LEFT CONTENT */}

<div className="flex flex-col gap-3 w-full">

<h2 className="text-lg font-semibold text-gray-800">
Pickles
</h2>

<div className="flex flex-wrap gap-2">

<span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-700 rounded">
Pending
</span>

<span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">
Pre-Order
</span>

<span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded">
Restaurant
</span>

</div>


{/* Order Items */}

<div className="bg-gray-50 rounded-lg p-3">

<p className="text-sm font-medium mb-1">
Order Items
</p>

<div className="flex justify-between text-sm">

<span>fdghjk x 29</span>

<span className="font-semibold text-blue-600">
₹1508.00
</span>

</div>

</div>


{/* Date / Time / Delivery */}

<div className="flex flex-wrap gap-4 text-sm text-gray-600">

<span className="flex gap-1 items-center">
<Calendar className="h-4 w-4" /> 2026-03-12
</span>

<span className="flex gap-1 items-center">
<Timer className="h-4 w-4" /> 11:00 AM
</span>

<span className="flex gap-1 items-center">
<Home className="h-4 w-4" /> Home Delivery
</span>

<span className="font-semibold text-green-600">
₹1528.00
</span>

</div>

</div>



{/* ACTION BUTTONS */}

<div className="flex lg:flex-col items-center gap-3">

<button className="p-3 rounded-full bg-green-100 hover:bg-green-200">
<Phone className="w-5 h-5 text-green-600"/>
</button>

<button className="p-3 rounded-full bg-blue-100 hover:bg-blue-200">
<MessageCircle className="w-5 h-5 text-blue-600"/>
</button>

</div>

</div>

</div>

</div>

</div>

);

};

export default Orders;