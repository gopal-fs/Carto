import { Heart, Star, Phone } from "lucide-react";

const SavedShops = () => {

return (

<div className="w-full p-4 lg:p-8 bg-gray-50 min-h-screen">

{/* HEADER */}

<div className="flex items-center justify-between mb-6">

<h1 className="text-2xl lg:text-3xl font-bold text-gray-800">
Wishlist
</h1>

<p className="text-sm text-gray-500">
Your saved shops
</p>

</div>


{/* WISHLIST GRID */}

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">


{/* SHOP CARD */}

<div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition">


{/* IMAGE */}

<div className="relative">

<img
src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5"
className="w-full h-[160px] object-cover"
/>

<button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow">

<Heart className="w-4 h-4 text-red-500 fill-red-500"/>

</button>

</div>


{/* CONTENT */}

<div className="p-4 flex flex-col gap-2">

<h2 className="font-semibold text-gray-800">
Kumari Pickles
</h2>

<p className="text-sm text-gray-500">
Pickles
</p>


{/* RATING */}

<div className="flex items-center gap-1 text-yellow-400">

<Star className="w-4 h-4 fill-yellow-400"/>
<Star className="w-4 h-4 fill-yellow-400"/>
<Star className="w-4 h-4 fill-yellow-400"/>
<Star className="w-4 h-4 fill-yellow-400"/>
<Star className="w-4 h-4 text-gray-300"/>

<span className="text-xs text-gray-600 ml-1">
4.0
</span>

</div>


{/* ACTIONS */}

<div className="flex items-center justify-between mt-2">

<button className="text-sm px-3 py-1.5 rounded-lg bg-green-600 text-white hover:bg-green-700">
View Shop
</button>

<button className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200">
<Phone className="w-4 h-4"/>
</button>

</div>

</div>

</div>


</div>

</div>

);

};

export default SavedShops;