import { useNavigate } from "react-router-dom";

const Settings = () => {

const navigate = useNavigate();

return (

<div className="w-full p-4 lg:p-8 bg-gray-50 min-h-screen max-w-[900px] mx-auto">

<h1 className="text-2xl font-semibold text-gray-800 mb-6">
Settings
</h1>


{/* ACCOUNT */}

<div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">

<h2 className="text-lg font-medium text-gray-800 mb-4">
Account
</h2>

<button
onClick={()=>navigate("/profile")}
className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
>
Edit Profile
</button>

</div>



{/* PASSWORD */}

<div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">

<h2 className="text-lg font-medium text-gray-800 mb-4">
Change Password
</h2>

<form className="flex flex-col gap-3 max-w-[400px]">

<input
type="password"
placeholder="New Password"
required
className="border border-gray-300 rounded-md p-2 outline-none focus:border-black"
/>

<input
type="password"
placeholder="Confirm Password"
required
className="border border-gray-300 rounded-md p-2 outline-none focus:border-black"
/>

<button
type="submit"
className="bg-black text-white py-2 rounded-md hover:opacity-90"
>
Set Password
</button>

</form>

</div>



{/* ADDRESS FORM */}

<div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">

<h2 className="text-lg font-medium text-gray-800 mb-4">
Address Details
</h2>

<form className="grid sm:grid-cols-2 gap-3">

<input
type="text"
placeholder="Full Name"
required
className="border border-gray-300 rounded-md p-2 outline-none focus:border-black"
/>

<input
type="email"
placeholder="Email"
required
className="border border-gray-300 rounded-md p-2 outline-none focus:border-black"
/>

<input
type="tel"
placeholder="Phone Number"
required
className="border border-gray-300 rounded-md p-2 outline-none focus:border-black"
/>

<input
type="text"
placeholder="House / Flat No"
required
className="border border-gray-300 rounded-md p-2 outline-none focus:border-black"
/>

<input
type="text"
placeholder="Street"
required
className="border border-gray-300 rounded-md p-2 outline-none focus:border-black"
/>

<input
type="text"
placeholder="City"
required
className="border border-gray-300 rounded-md p-2 outline-none focus:border-black"
/>

<input
type="text"
placeholder="State"
required
className="border border-gray-300 rounded-md p-2 outline-none focus:border-black"
/>

<input
type="text"
placeholder="Pincode"
required
className="border border-gray-300 rounded-md p-2 outline-none focus:border-black"
/>

<button
type="submit"
className="sm:col-span-2 mt-2 bg-black text-white py-2 rounded-md hover:opacity-90"
>
Save Address
</button>

</form>

</div>



{/* SUPPORT */}

<div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">

<h2 className="text-lg font-medium text-gray-800 mb-4">
Support
</h2>

<div className="flex flex-col gap-2">

<button className="text-left px-2 py-1 hover:underline">
Help Center
</button>

<button className="text-left px-2 py-1 hover:underline">
Privacy Policy
</button>

</div>

</div>



{/* LOGOUT */}

<div className="bg-white border border-gray-200 rounded-lg p-6">

<button className="text-red-600 hover:underline">
Logout
</button>

</div>


</div>

);
};

export default Settings;