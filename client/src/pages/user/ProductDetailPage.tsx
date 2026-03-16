import { Star } from "lucide-react";
import img from "../../assets/shop14.jpeg"

const ProductDetailPage = () => {
  return (
    <div className="min-h-[80vh] bg-gray-100 flex justify-center items-center p-6">

      <div className="bg-white shadow-lg rounded-xl max-w-5xl w-full flex flex-col lg:flex-row gap-8 p-6">

        {/* Product Image */}
        <div className="flex justify-center items-center">
          <img
            src={img}
            alt="product"
            className="w-full max-w-[350px] rounded-lg object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col gap-4 flex-1">

          <h1 className="text-2xl font-semibold">Fresh Organic Apples</h1>

          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold text-green-600">₹120</span>
            
          </div>

         

          <p className="text-gray-600">
            Fresh organic apples directly sourced from local farms.
            Rich in nutrients and perfect for a healthy diet.
          </p>

          {/* Features */}
          <div>
            <h3 className="font-semibold mb-1">Key Features</h3>
            <ul className="list-disc ml-5 text-gray-600 text-sm">
              <li>Farm fresh quality</li>
              <li>No chemicals</li>
              <li>Rich in fiber</li>
            </ul>
          </div>

          {/* Stock */}
          <p className="text-green-600 font-medium">In Stock</p>

          

          {/* Buttons */}
          <div className="flex gap-4 mt-2">
            <button className="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white px-6 py-2 rounded-md">
              Add to Cart
            </button>

            <button className="bg-black cursor-pointer hover:bg-black text-white px-6 py-2 rounded-md">
              Buy Now
            </button>
          </div>

          {/* Seller Section */}
          <div className="border-t pt-4 mt-4">

            <h2 className="font-semibold text-lg mb-2">Meet Your Seller</h2>

            <div className="flex items-center gap-3">

              <img
                src={img}
                alt="seller"
                className="h-[45px] w-[45px] rounded-full object-cover"
              />

              <div>
                <p className="font-medium">Krishna Grocery Store</p>
                <p className="text-sm text-gray-500">West Godavari, Andhra Pradesh</p>
                <p className="text-sm text-gray-500">Delivery Range: 240 KM</p>
                <p className="text-yellow-500 text-sm flex items-center gap-2"><Star size={18} className="text-yellow-400" /> 4.7 Seller Rating</p>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ProductDetailPage;