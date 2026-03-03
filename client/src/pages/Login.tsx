import { useState } from "react"


const Login = () => {
    const [selectedTab, setSelectedTab] = useState<string>("user");
    return (
        <div className="w-full min-h-screen flex">

            <div className="hidden lg:block lg:w-1/2 lg:max-w-[600px] h-[100dvh]">
                <img
                    className="w-full h-full"
                    src="/side.png"
                    alt="side-image"
                />
            </div>

            <div className="w-full p-5  flex flex-col justify-center items-center">
                <img src="/logosym.png" className="h-[45px] w-[120px] mb-3" alt="logo" />
                <div className="bg-white border border-gray-200 shadow-2xl 
                p-4 min-h-[120px] w-full max-w-[600px] 
                rounded-2xl flex flex-col gap-3">

                    {/* ROW 1 */}
                    <div className="flex gap-2">

                        <button
                            onClick={() => setSelectedTab("user")}
                            className={`cursor-pointer flex-1 py-2.5 text-sm font-medium rounded-xl
      transition-all duration-300
      ${selectedTab === "user"
                                    ? "bg-white border border-gray-300 shadow-md"
                                    : "bg-gray-50 text-gray-600 hover:bg-gray-100"}
      `}
                        >
                            User
                        </button>

                        <button
                            onClick={() => setSelectedTab("shop")}
                            className={`cursor-pointer flex-1 py-2.5 text-sm font-medium rounded-xl
      transition-all duration-300
      ${selectedTab === "shop"
                                    ? "bg-white border border-gray-300 shadow-md"
                                    : "bg-gray-50 text-gray-600 hover:bg-gray-100"}
      `}
                        >
                            Shop
                        </button>

                    </div>

                    {/* ROW 2 */}
                    <div className="flex gap-2">

                        <button
                            onClick={() => setSelectedTab("vendor")}
                            className={` cursor-pointer flex-1 py-2.5 text-sm font-medium rounded-xl
      transition-all duration-300
      ${selectedTab === "vendor"
                                    ? "bg-white border border-gray-300 shadow-md"
                                    : "bg-gray-50 text-gray-600 hover:bg-gray-100"}
      `}
                        >
                            Vendor
                        </button>

                        <button
                            onClick={() => setSelectedTab("delivery")}
                            className={`cursor-pointer flex-1 py-2.5 text-sm font-medium rounded-xl
      transition-all duration-300
      ${selectedTab === "delivery"
                                    ? "bg-white border border-gray-300 shadow-md"
                                    : "bg-gray-50 text-gray-600 hover:bg-gray-100"}
      `}
                        >
                            Delivery
                        </button>

                    </div>

                </div>
            </div>

        </div>
    )
}

export default Login