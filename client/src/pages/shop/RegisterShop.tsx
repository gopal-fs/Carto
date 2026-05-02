import { Store, Mail, MapPin, Tag, Upload, Package, X } from "lucide-react"
import React, { useState } from "react"
import toast from "react-hot-toast";
import { Link } from "react-router-dom"

const RegisterShop = () => {

    const isRegistered = false;
    const isApproved: string = "yes";

    const [formData, setFormData] = useState({
        shop_name: "",
        shop_type: "",
        custom_shop_type:"",
        shop_email: "",
        shop_address: "",
        profile: null as File | null,
        banners: [null, null, null] as (File | null)[]
    });

    const shopTypes = [
        "Grocery", "Restaurant", "Bakery", "Pharmacy", "Gunny Bags", "Electronics",
        "Mobile Repair", "Furniture", "Clothing", "Footwear", "Beauty Salon",
        "Tailoring", "Laundry", "Stationery", "Hardware", "Handicrafts", "Jewelry",
        "Sports", "Bookstore", "Pet Shop", "Florist", "Toy Store", "Other"
    ];

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleProfile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setFormData(prev => ({
            ...prev,
            profile: file
        }));
    };

    const handleBanner = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setFormData(prev => {
            const updated = [...prev.banners];
            updated[index] = file;

            return {
                ...prev,
                banners: updated
            };
        });
    };

    const removeBanner = (index: number) => {
        setFormData(prev => {
            const updated = [...prev.banners];
            updated[index] = null;

            return {
                ...prev,
                banners: updated
            };
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const data = new FormData();

        data.append("shop_name", formData.shop_name);
        data.append("shop_type", formData.shop_type);
        data.append("shop_email", formData.shop_email);
        data.append("shop_address", formData.shop_address);

        if (!formData.profile || formData.banners.includes(null)) {
            return toast.error("Required All Fields");
        }

        if (formData.profile) {
            data.append("profile", formData.profile);
        }

        formData.banners.forEach(file => {
            if (file) {
                data.append("banners[]", file);
            }
        });

        console.log([...data.entries()]);
    };

    if (isApproved === "no") {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="h-[70px] border-b bg-white flex items-center px-6">
                    <img src="/logosym.png" className="h-[42px]" />
                </div>

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="text-center">
                        {!formData.shop_name ? (
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
                                    Your shop "{formData.shop_name}" is currently under review by our admin team.
                                </p>
                                <p className="text-gray-500 mb-8">
                                    You'll receive an email notification once your shop is approved and goes live.
                                </p>
                            </>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return (

        <div className="min-h-screen bg-gray-50">

    
            <div className="h-[70px] border-b bg-white flex items-center px-6">
                <img src="/logosym.png" className="h-[42px]" />
            </div>

       
            <div className="flex justify-center items-center p-6">

                {!isRegistered ? (

                    <form onSubmit={handleSubmit} className="w-full max-w-xl bg-white rounded-2xl shadow-md p-8 flex flex-col gap-6">

                        <div className="text-center">
                            <h1 className="text-3xl font-semibold text-gray-800">
                                Register Your Shop
                            </h1>
                        </div>

                     
                        <div className="flex items-center border rounded-xl px-3 py-2 gap-2">
                            <Store size={18} />
                            <input
                                name="shop_name"
                                onChange={handleChange}
                                placeholder="Shop Name"
                                type="text"
                                className="w-full outline-none text-sm"
                            />
                        </div>

                        
                        <div className="flex items-center border rounded-xl px-3 py-2 gap-2">
                            <Tag size={18} />
                            <select
                            
                                className="w-full outline-none text-sm bg-transparent"
                                value={formData.shop_type}
                                name="shop_type"
                                onChange={handleChange}
                            >
                                <option value="">Select Shop Type</option>
                                {shopTypes.map((type, index) => (
                                    <option key={index}>{type}</option>
                                ))}
                            </select>
                        </div>

                        {formData.shop_type === "Other" && (
                            <div className="flex items-center border rounded-xl px-3 py-2 gap-2">
                                <Tag size={18} />
                                <input
                                    type="text"
                                    
                                    placeholder="Enter shop type"
                                    className="w-full outline-none text-sm"
                                    value={formData.custom_shop_type}
                                    onChange={(e) =>
                                        setFormData(prev => ({
                                            ...prev,
                                            custom_shop_type: e.target.value
                                        }))
                                    }
                                />
                            </div>
                        )}

                        {/* Email */}
                        <div className="flex items-center border rounded-xl px-3 py-2 gap-2">
                            <Mail size={18} />
                            <input
                            placeholder="Enter Your Email"
                                name="shop_email"
                                onChange={handleChange}
                                type="email"
                                className="w-full outline-none text-sm"
                            />
                        </div>

                        {/* Address */}
                        <div className="flex gap-2 border rounded-xl px-3 py-2">
                            <MapPin size={18} />
                            <textarea
                                placeholder="Enter Your Address"
                                name="shop_address"
                                onChange={handleChange}
                                rows={3}
                                className="w-full outline-none text-sm resize-none"
                            />
                        </div>

                   
                        <label className="border-2 border-dashed rounded-xl p-5 flex flex-col items-center justify-center gap-2 cursor-pointer">
                            <Upload size={28} />
                            <p className="text-sm text-gray-500">Upload</p>
                            <input
                                type="file"
                                accept=".jpg,.jpeg,.png"
                                name="profile"
                                onChange={handleProfile}
                                className="hidden"
                            />
                        </label>

                      
                        {formData.profile && (
                            <img
                                
                                
                                src={URL.createObjectURL(formData.profile)}
                                className="h-[150px] w-[150px] rounded-full object-cover mx-auto"
                            />
                        )}

                        
                        <div className="flex gap-2 w-full">
                            {formData.banners.map((file, index) =>
                                file ? (
                                    <div key={index} className="h-[90px] relative w-[160px]">
                                        <img
                                            className="h-full w-full object-cover"
                                            src={URL.createObjectURL(file)}
                                            alt={`banner${index + 1}`}
                                        />
                                        <div
                                            onClick={() => removeBanner(index)}
                                            className="absolute top-[-15px] right-[-10px] cursor-pointer p-1 rounded-full bg-white"
                                        >
                                            <X size={20} />
                                        </div>
                                    </div>
                                ) : (
                                    <label
                                        key={index}
                                        className="flex flex-col justify-center items-center h-[90px] grow border-2 border-dashed cursor-pointer"
                                    >
                                        <span>Banner {index + 1}</span>
                                        <input
                                            type="file"
                                            accept=".jpg,.jpeg,.png"
                                            className="hidden"
                                            onChange={(e) => handleBanner(e, index)}
                                        />
                                    </label>
                                )
                            )}
                        </div>

                       
                        <button className="h-[45px] bg-emerald-600 text-white rounded-xl">
                            Register Shop
                        </button>

                    </form>

                ) : (
                    <div>Shop Dashboard</div>
                )}

            </div>

        </div>
    )
}

export default RegisterShop