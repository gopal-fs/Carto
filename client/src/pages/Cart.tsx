import { Calendar, Clock, CreditCard, Info, Minus, Package, Plus, ShoppingCart, Tag, Truck } from 'lucide-react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


const Cart = () => {
  const [orderType, setOrderType] = useState<string>('order');
  const [deliveryType, setDeliveryType] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<number | null>(null);
  const navigate=useNavigate();
  const [cart,setCart]=useState<[]>([])

  const today = new Date();

  const dates = Array.from({ length: 5 }, (_, i) => {
    const d = new Date();
    d.setDate(today.getDate() + i);
    return d;
  });

  const timeSlots = [
    { time: "9:00", period: "AM" },
    { time: "12:00", period: "PM" },
    { time: "4:00", period: "PM" },
    { time: "8:00", period: "PM" }
  ];
  return (
   cart.length!==0?(<div className='flex flex-col justify-center items-center h-[80vh] w-full'>
     <img src='/logosym.png' alt='logo' className='h-[90px] w-[270px]' />
    <h1 className='text-2xl sm:text-4xl md:text-6xl mt-5'>Your Cart Is Empty</h1>
   
      
      <button onClick={()=>navigate('/shops')} className='h-[40px] w-[160px] mt-5 rounded bg-black text-white cursor-pointer'>Shop Now</button>

   </div>):(
    <div className='w-full p-3 flex flex-col justify-center items-center'>
    <div className=' w-full max-w-[1200px] p-3  bg-white border-gray-200 rounded-xl border-1'>
      <div className='w-full flex flex-col items-center justify-center'>
        <h1 className='text-3xl font-bold text-gray-800'>My Cart</h1>
        <button onClick={()=>navigate('/shops')} className='rounded h-[36px] w-[120px] text-white bg-blue-600 cursor-pointer hover:bg-blue-500 border-blue-500 mt-3'>Shop More</button>
    
      </div>
      <div className="mb-8">
        <h1 className='text-lg font-[500] text-gray-900 mb-4'>Choose Order Type</h1>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => setOrderType('order')}
            className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${orderType === 'order'
              ? 'border-green-500 bg-green-50'
              : 'border-gray-200 hover:border-gray-300'
              }`}
          >
            <div className="flex flex-col sm:flex-row  items-center space-x-3">
              <div className={`p-2 rounded-xl ${orderType === 'order' ? 'bg-green-100' : 'bg-gray-100'}`}>
                <Truck className={`w-5 h-5 ${orderType === 'order' ? 'text-green-600' : 'text-gray-600'}`} />
              </div>
              <div className="text-center sm:text-left">
                <h4 className="font-semibold">Instant Order</h4>
                <p className="text-sm text-gray-600">Shop owner delivers</p>
              </div>
            </div>
          </button>
    
          <button
            onClick={() => setOrderType('pre-order')}
            className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${orderType === 'pre-order'
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 hover:border-gray-300'
              }`}
          >
            <div className="flex flex-col sm:flex-row items-center space-x-3">
              <div className={`p-2 rounded-xl ${orderType === 'pre-order' ? 'bg-blue-100' : 'bg-gray-100'}`}>
                <Package className={`w-5 h-5 ${orderType === 'pre-order' ? 'text-blue-600' : 'text-gray-600'}`} />
              </div>
              <div className="text-center sm:text-left">
                <h4 className="font-semibold">Pre-Order</h4>
                <p className="text-sm text-gray-600">Schedule for later</p>
              </div>
            </div>
          </button>
        </div>
      </div>
      {orderType === 'pre-order' && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Delivery Option</h3>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setDeliveryType('delivery')}
              className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${deliveryType === 'delivery'
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
                }`}
            >
              <div className="text-center">
                <h4 className="font-semibold">Home Delivery</h4>
                <p className="text-sm text-gray-600">We'll deliver to you</p>
              </div>
            </button>
    
            <button
              onClick={() => setDeliveryType('pickup')}
              className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${deliveryType === 'pickup'
                ? 'border-green-500 bg-green-50'
                : 'border-gray-200 hover:border-gray-300'
                }`}
            >
              <div className="text-center">
                <h4 className="font-semibold">Self Pickup</h4>
                <p className="text-sm text-gray-600">You'll pick up</p>
              </div>
            </button>
          </div>
        </div>
      )}
    
      <div className='flex flex-col lg:flex-row gap-4 lg:justify-between'>
        {/* Cart Info */}
        <div className='w-full max-w-[500px]'>
          <label className="block text-sm font-medium text-gray-700 mb-3">Your Cart Items</label>
          <div className='flex flex-col gap-2 border-gray-200 hover:border-gray-300 border-1 rounded-xl'>
            <div className='w-full flex items-center justify-between p-2'>
              <div className='flex flex-col'>
                <h1 className="text-sm font-medium text-gray-900">T-Shirt</h1>
                <p className="text-lg font-semibold text-blue-600">59.00</p>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  // onClick={() => updateCartQuantity(item.cart_id, item.quantity, -1)}
                  className="p-1 rounded-full cursor-pointer bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center font-medium">1</span>
                <button
                  // onClick={() => updateCartQuantity(item.cart_id, item.quantity, 1)}
                  className="p-1 rounded-full cursor-pointer bg-blue-100 hover:bg-blue-200 transition-colors"
                >
                  <Plus className="w-4 h-4 text-blue-600" />
                </button>
              </div>
            </div>
          </div>
    
          {/* Time And Date Container */}
          {orderType==='pre-order' && (<div>
            <label className="flex mt-5 items-center space-x-2 text-sm font-medium text-gray-700 mb-3">
              <Calendar className="w-4 h-4" />
              <span>Select Date *</span>
            </label>
            <div className='w-full flex mt-4 gap-2 flex-wrap'>
              {dates.map((date, index) => {
                const day = date.toLocaleDateString("en-US", { weekday: "short" });
                const month = date.toLocaleDateString("en-US", { month: "short" });
                const dayNum = date.getDate();
                return (
                  <button
                    key={index}
                    onClick={() => setSelectedDate(index)}
                    className={`flex flex-col items-center cursor-pointer justify-center w-[70px] h-[70px] rounded-lg border transition ${selectedDate === index
                      ? "bg-blue-50 text-black border-blue-500"
                      : "border-gray-200 hover:bg-green-100"
                      }`}
                  >
    
                    <span className="text-xs text-gray-500">
                      {day}
                    </span>
    
                    <span >
                      {month} {dayNum}
                    </span>
    
                  </button>
    
    
                )
              })}
            </div>
            <label className="flex items-center mt-3 space-x-2 text-sm font-medium text-gray-700 mb-3">
              <Clock className="w-4 h-4" />
              <span>Select Time *</span>
            </label>
            <div className='w-full flex gap-2 flex-wrap'>
              {timeSlots.map((time, index) => {
                return (
                  <button
                    key={index}
                    onClick={() => setSelectedTime(index)}
                    className={`flex flex-col items-center cursor-pointer justify-center w-[70px] h-[70px] rounded-lg border transition ${selectedTime === index
                      ? "bg-blue-50 text-black border-blue-500"
                      : "border-gray-200 hover:bg-green-100"
                      }`}
                  >
    
                    <span className="text-xs text-gray-500">
                      {time.time}
                    </span>
    
                    <span >
                      {time.period}
                    </span>
    
                  </button>
                )
              })}
            </div>
          </div>)}
        </div>
    
        {/* Order Summary */}
        <div className='bg-gray-50 w-full mt-5 rounded-2xl p-6'>
          <h1 className="text-sm sm:text-xl font-semibold text-gray-900 mb-6">{orderType === 'order' ? 'Order' : 'Pre-Order'} Summary</h1>
          <div className="flex justify-between mb-3">
            <span className="text-gray-600">Shop:</span>
            <span className="font-medium">Kumari Pickles</span>
          </div>
          <div className="flex justify-between mb-3">
            <span className="text-gray-600">Type:</span>
            <span className={`font-medium ${orderType === 'order' ? 'text-green-600' : 'text-blue-600'}`}>
              {orderType === 'order' ? 'Instant Order' : 'Pre-Order'}
            </span>
          </div>
          <div className="flex justify-between mb-3">
            <span className="text-gray-600">Delivery:</span>
            <span className="font-medium">Home Delivery</span>
          </div>
          <div className="flex justify-between mb-3">
            <span className="text-gray-600">Time:</span>
            <span className="font-medium">Immediate</span>
          </div>
          <div className="mb-6">
            <h4 className="font-medium text-gray-900 mb-3">Order Items:</h4>
            <div className="space-y-2">
    
              <div className="flex justify-between text-sm">
                <span>Mango Pickle x 29</span>
                <span>₹400</span>
              </div>
    
            </div>
            <div className="border-t border-gray-200 mt-3 pt-3 space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>₹40</span>
              </div>
    
              <div className="flex justify-between text-sm text-gray-600">
                <span>Delivery Charge:</span>
                <span>₹40</span>
              </div>
    
    
              <div className="flex justify-between font-semibold text-lg border-t border-gray-200 pt-2">
                <span>Total:</span>
                <span className="text-blue-600">₹30</span>
              </div>
            </div>
          </div>
    
          {/* Coupon Management */}
          <div className='w-full border-1 mb-3 border-gray-400/40 rounded-xl p-3'>
            <h4 className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-3">
              <Tag className="w-4 h-4" />
              <span>Apply Coupon</span>
            </h4>
            <div className="space-y-3">
              <div className="flex space-x-2">
                <input
                  type="text"
                  // value={couponCode}
                  // onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Enter coupon code"
                  className="flex-1 p-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
                <button
                  // onClick={applyCoupon}
                  // disabled={!couponCode.trim()}
                  className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                >
                  Apply
                </button>
              </div>
              {/* {couponError && (
                      <p className="text-red-600 text-sm">{couponError}</p>
                    )} */}
            </div>
          </div>
    
          {/* Delivery Charges Info */}
          {((orderType === 'order') || (orderType === 'pre-order' && deliveryType === 'delivery')) && (
            <div className="mb-6 p-4 bg-blue-50 rounded-xl">
              <div className="flex items-start space-x-2">
                <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium mb-1">Delivery Charges:</p>
                  <ul className="space-y-1 text-xs">
                    <li>Below ₹300: Free delivery</li>
                    <li>₹300-₹499: ₹10</li>
                    <li>₹500-₹999: ₹15</li>
                    <li>₹1000-₹1999: ₹20</li>
                    <li>Above ₹2000: ₹30</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
    
          {/* Payment Options */}
          <div className="border-t border-gray-200 pt-6">
            <h4 className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-4">
              <CreditCard className="w-4 h-4" />
              <span>Payment Method</span>
            </h4>
            <div className="bg-green-50 border mb-3 border-green-200 rounded-xl p-4">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  className="accent-green-600"
                />
                <span className="font-medium text-green-800">
                  Cash on Delivery (COD)
                </span>
              </label>
            </div>
    
            <div className="bg-blue-50 border mb-3 border-blue-200 rounded-xl p-4">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="upi"
                  className="accent-blue-600"
                />
                <span className="font-medium text-blue-800">
                  UPI PhonePe
                </span>
              </label>
            </div>
          </div>
    
          <button
            // onClick={handleBooking}
            // disabled={isSubmitting || cart.length === 0 || 
            //   (orderType === 'pre-order' && (!selectedDate || !selectedTime))}
            className={`w-full mt-8 py-4 rounded-2xl font-semibold cursor-pointer transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed ${orderType === 'order'
              ? 'bg-green-600 hover:bg-green-700 text-white'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
          >
            {orderType === 'order' ? <Truck className="w-5 h-5" /> : <ShoppingCart className="w-5 h-5" />}
            <span>
              {/* {isSubmitting 
                    ? `Creating ${orderType === 'order' ? 'Order' : 'Pre-Order'}...` 
                    : `Confirm ${orderType === 'order' ? 'Order' : 'Pre-Order'}`
                  } */} Confirm Order
            </span>
          </button>
    
        </div>
    
      </div>
    
    
    </div>
    
    </div>)
  )
}

export default Cart




