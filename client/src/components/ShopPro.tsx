import { Edit, PercentCircle, ToggleLeft, ToggleRight, Trash2 } from "lucide-react"

type Product = {
    product_id: number;
    image_url: string;
    name: string;
    description: string;
    available: boolean;
    price: number;
    is_food_item: boolean;
    quantity_unit: string;
}

const ShopPro = () => {
    const products: Product[] = [
        {
            product_id: 1,
            image_url: "https://www.allrecipes.com/thmb/p4F_knUDCrUNusNOTyjY_dCp8d4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/13338-quick-and-easy-vegetable-soup-DDMFS-4x3-402702f59e7a41519515cecccaba1b80.jpg",
            name: "Veg Soup",
            description: "A high quality garden vegetable soup",
            available: true,
            price: 299,
            is_food_item: true,
            quantity_unit: 'piece',
        },
        {
            product_id: 2,
            image_url: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400",
            name: "Basmati Rice",
            description: "Premium long-grain basmati rice, 1 kg pack",
            available: true,
            price: 149,
            is_food_item: true,
            quantity_unit: 'kg',
        },
        {
            product_id: 3,
            image_url: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=400",
            name: "Fresh Apples",
            description: "Crisp and fresh Shimla apples, handpicked",
            available: false,
            price: 120,
            is_food_item: true,
            quantity_unit: 'kg',
        },
    ]

    return (
        <div className="flex flex-wrap w-full justify-center items-start sm:justify-start gap-4 p-2">
            {products.map((product: Product, idx: number) => (
                <div
                    key={idx}
                    className={`w-full max-w-72 border rounded-2xl p-5 hover:shadow-lg transition-shadow flex flex-col gap-3 ${product.available ? 'border-gray-200 bg-white' : 'border-red-200 bg-red-50'
                        }`}
                >
                    {/* Image */}
                    {product.image_url && (
                        <img
                            src={product.image_url}
                            alt={product.name}
                            className="w-full h-32 object-cover rounded-xl"
                        />
                    )}

                    {/* Name + description */}
                    <div>
                        <h3 className={`font-semibold text-sm ${product.available ? 'text-gray-900' : 'text-red-600'}`}>
                            {product.name}
                        </h3>
                        <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{product.description}</p>
                    </div>

                    {/* Price + availability */}
                    <div className="flex items-center justify-between">
                        <div>
                            <span className="text-base font-bold text-emerald-600">₹{product.price}</span>
                            {product.is_food_item && (
                                <span className="text-xs text-gray-400 ml-1">/ {product.quantity_unit}</span>
                            )}
                        </div>
                        <button
                            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${product.available
                                    ? 'bg-green-100 text-green-800 hover:bg-green-200'
                                    : 'bg-red-100 text-red-800 hover:bg-red-200'
                                }`}
                        >
                            {product.available ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
                            {product.available ? 'Available' : 'Unavailable'}
                        </button>
                    </div>

                    {/* Actions row — Edit | Delete */}
                    <div className="flex items-center gap-2">
                        <button className="flex-1 flex items-center justify-center gap-1.5 py-1.5 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors text-xs font-medium border border-blue-100">
                            <Edit className="w-3.5 h-3.5" />
                            Edit
                        </button>
                        <button className="flex-1 flex items-center justify-center gap-1.5 py-1.5 text-red-500 hover:bg-red-50 rounded-xl transition-colors text-xs font-medium border border-red-100">
                            <Trash2 className="w-3.5 h-3.5" />
                            Delete
                        </button>
                    </div>

                    {/* Sale Range button */}
                    <button className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-orange-50 hover:bg-orange-100 border border-orange-200 text-orange-600 text-xs font-semibold transition-colors">
                        <PercentCircle className="w-4 h-4" />
                        Set Sale Range
                    </button>
                </div>
            ))}
        </div>
    )
}

export default ShopPro
