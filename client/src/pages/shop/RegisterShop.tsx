import { Store, Mail, MapPin, Tag, Upload, Package } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"

const RegisterShop = () => {

    const [shopType, setShopType] = useState("")
    const [isRegistered] = useState(false)
    const [preview, setPreview] = useState<string>("");
    const isApproved:string="yes";
    const shopInfo={shop_name:"Kirana Stores"}

    const shopTypes = [
        "Grocery", "Restaurant", "Bakery", "Pharmacy",'Gunny Bags', "Electronics", "Mobile Repair",
        "Furniture", "Clothing", "Footwear", "Beauty Salon", "Tailoring", "Laundry",
        "Stationery", "Hardware", "Handicrafts", "Jewelry", "Sports", "Bookstore",
        "Pet Shop", "Florist", "Toy Store", "Other"
    ]

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const url = URL.createObjectURL(file);
        setPreview(url);
    };

    if(isApproved==="no"){
        return (<div className="min-h-screen bg-gray-50">
             <div className="h-[70px] border-b bg-white flex items-center px-6">
                <img src="/logosym.png" className="h-[42px]" />
            </div>
    
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <div className="text-center">
                {!shopInfo ? (
                  <>
                    <Store className="w-24 h-24 text-yellow-500 mx-auto mb-6" />
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Shop Not Registered</h2>
                    <p className="text-gray-600 mb-8 text-lg">
                      You haven't registered your shop yet. Please register your shop to start receiving orders.
                    </p>
                    <Link
                      to="/shop/register"
                      className="inline-flex items-center space-x-2 bg-emerald-600 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-emerald-700 transition-colors text-lg"
                    >
                      <Store className="w-6 h-6" />
                      <span>Register Your Shop</span>
                    </Link>
                  </>
                ) : (
                  <>
                    <Package className="w-24 h-24 text-yellow-500 mx-auto mb-6" />
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Shop Pending Approval</h2>
                    <p className="text-gray-600 mb-4 text-lg">
                      Your shop "{shopInfo.shop_name}" is currently under review by our admin team.
                    </p>
                    <p className="text-gray-500 mb-8">
                      You'll receive an email notification once your shop is approved and goes live.
                    </p>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 max-w-md mx-auto">
                      <h3 className="font-semibold text-yellow-800 mb-2">What happens next?</h3>
                      <ul className="text-sm text-yellow-700 space-y-1 text-left">
                        <li>• Admin reviews your shop details</li>
                        <li>• Verification of business information</li>
                        <li>• Approval notification via email</li>
                        <li>• Your shop goes live for customers</li>
                      </ul>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>)
    }

    return (

        <div className="min-h-screen bg-gray-50">

            {/* Header */}
            <div className="h-[70px] border-b bg-white flex items-center px-6">
                <img src="/logosym.png" className="h-[42px]" />
            </div>

            {/* Page */}
            <div className="flex justify-center items-center p-6">

                {!isRegistered ? (

                    <form className="w-full max-w-xl bg-white rounded-2xl shadow-md p-8 flex flex-col gap-6">

                        <div className="text-center">
                            <h1 className="text-3xl font-semibold text-gray-800">
                                Register Your Shop
                            </h1>
                            <p className="text-gray-500 text-sm mt-1">
                                Start selling to nearby customers
                            </p>
                        </div>

                        {/* Shop Name */}
                        <div className="flex items-center border rounded-xl px-3 py-2 gap-2 focus-within:border-emerald-500">
                            <Store size={18} className="text-gray-400" />
                            <input
                                type="text"
                                placeholder="Shop Name"
                                className="w-full outline-none text-sm"
                            />
                        </div>

                        {/* Shop Type */}
                        <div className="flex items-center border rounded-xl px-3 py-2 gap-2 focus-within:border-emerald-500">
                            <Tag size={18} className="text-gray-400" />
                            <select
                                className="w-full outline-none text-sm bg-transparent"
                                value={shopType}
                                onChange={(e) => setShopType(e.target.value)}
                            >
                                <option value="">Select Shop Type</option>
                                {shopTypes.map((type, index) => (
                                    <option key={index}>{type}</option>
                                ))}
                            </select>
                        </div>

                        {/* Other shop */}
                        {shopType === "Other" && (
                            <div className="flex items-center border rounded-xl px-3 py-2 gap-2">
                                <Tag size={18} className="text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Enter your shop type"
                                    className="w-full outline-none text-sm"
                                />
                            </div>
                        )}

                        {/* Email */}
                        <div className="flex items-center border rounded-xl px-3 py-2 gap-2 focus-within:border-emerald-500">
                            <Mail size={18} className="text-gray-400" />
                            <input
                                type="email"
                                placeholder="Shop Email"
                                className="w-full outline-none text-sm"
                            />
                        </div>

                        {/* Address */}
                        <div className="flex gap-2 border rounded-xl px-3 py-2 focus-within:border-emerald-500">
                            <MapPin size={18} className="text-gray-400 mt-1" />
                            <textarea
                                rows={3}
                                placeholder="Shop Address"
                                className="w-full outline-none text-sm resize-none"
                            />
                        </div>

                        

                        {/* Image Upload */}
                        <label className="border-2 border-dashed rounded-xl p-5 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-gray-50">
                            <Upload size={28} className="text-gray-400" />
                            <p className="text-sm text-gray-600">
                                Upload Shop Images
                            </p>
                            <span className="text-xs text-gray-400">
                                JPG, JPEG, PNG
                            </span>

                            <input
                                type="file"
                                accept=".jpg,.jpeg,.png"
                                onChange={handleFileChange}
                                multiple
                                className="hidden"
                            />
                        </label>

                        <div className={`w-full ${preview === "" ? "hidden" : "flex"} justify-center`}>
                            <img
                                src={
                                    preview === ""
                                        ? "https://img.freepik.com/free-vector/shop-with-sign-open-design_23-2148544029.jpg?semt=ais_hybrid&w=740&q=80"
                                        : preview
                                }
                                alt="shopPic"
                                className="h-[150px] w-[150px] rounded-full object-cover"
                            />
                        </div>

                        {/* Button */}
                        <button
                            className="h-[45px] cursor-pointer bg-emerald-600 hover:bg-emerald-700 transition text-white rounded-xl font-medium"
                        >
                            Register Shop
                        </button>

                        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                            <p className="text-sm text-yellow-800">
                                <strong>Note:</strong> Your shop will be reviewed by our admin team before going live. 
                                You'll be notified once approved.
                            </p>
                        </div>

                    </form>

                ) : (

                    <div>Shop Dashboard</div>

                )}

            </div>

        </div>
    )
}

export default RegisterShop