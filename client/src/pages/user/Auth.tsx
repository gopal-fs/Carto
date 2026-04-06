import {useState } from "react"
import Login from "../../components/Login";
import Register from "../../components/Register";


const Auth = () => {
    const [selectedTab, setSelectedTab] = useState<string>("user");
    const [loginTab,setLoginTab]=useState<boolean>(true);
    
    return (
        <div className="w-full min-h-screen flex bg-[#afaef5]/40">

            <div className="hidden lg:block lg:w-1/2 lg:max-w-[600px] h-[100dvh]">
                <img
                    className="w-full h-full shadow-[var(--shadow-right)] rounded-tr-4xl"
                    src="/side.png"
                    alt="side-image"
                />
            </div>

            <div className="w-full h-screen  p-5  flex flex-col justify-center items-center overflow-y-scroll">
                <img src="/logosym.png" className=" h-[45px] w-[120px] md:h-[60px] md:w-[180px] mb-5" alt="logo" />
                <div className="bg-white border border-gray-200 shadow-2xl p-4  w-full max-w-[600px] rounded-2xl flex flex-col gap-3">

                    <div className="flex gap-2 mt-3">

                        <button
                            onClick={() => setSelectedTab("user")}
                            className={`cursor-pointer flex-1 py-2.5 text-sm font-medium rounded-xl transition-all duration-300 ${selectedTab === "user" ? "bg-white border border-gray-300 shadow-md" : "bg-gray-50 text-gray-600 hover:bg-gray-100"}`}>
                            User
                        </button>

                        <button
                            onClick={() => setSelectedTab("shop")}
                            className={`cursor-pointer flex-1 py-2.5 text-sm font-medium rounded-xl transition-all duration-300 ${selectedTab === "shop" ? "bg-white border border-gray-300 shadow-md" : "bg-gray-50 text-gray-600 hover:bg-gray-100"}`}>
                            Shop
                        </button>
                    </div>

                    <div className="flex gap-2">

                        <button
                            onClick={() => setSelectedTab("vendor")}
                            className={`cursor-pointer flex-1 py-2.5 text-sm font-medium rounded-xl transition-all duration-300 ${selectedTab === "vendor" ? "bg-white border border-gray-300 shadow-md" : "bg-gray-50 text-gray-600 hover:bg-gray-100"}`}>
                            Vendor
                        </button>

                        <button
                            onClick={() => setSelectedTab("delivery")}
                            className={`cursor-pointer flex-1 py-2.5 text-sm font-medium rounded-xl transition-all duration-300 ${selectedTab === "delivery" ? "bg-white border border-gray-300 shadow-md" : "bg-gray-50 text-gray-600 hover:bg-gray-100"}`}>
                            Delivery
                        </button>

                    </div>

                    {loginTab?<Login />:<Register />}
                    {loginTab?<p className="text-sm text-center space-x-1.5  mt-1 text-gray-600">Create An Account.<span className="font-medium text-violet-500 cursor-pointer" onClick={()=>setLoginTab(false)}>Click here</span></p>:<p className="text-sm text-center space-x-1.5 pb-5 mt-1 text-gray-600">Already Have An Account.<span className="font-medium text-violet-500 cursor-pointer" onClick={()=>setLoginTab(true)}>Click here</span></p>}

                </div>
            </div>

        </div>
    )
}

export default Auth