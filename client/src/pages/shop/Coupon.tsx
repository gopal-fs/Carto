import { SquarePen, Tag, Trash2 } from 'lucide-react'
import React, { useState } from 'react'

type Coupon={
    coupon_id:string,
    name:string,
    discount:number,
    isActive:boolean,
    date:string
}

const Coupon = () => {

    const [coupons,setCoupons]=useState<Coupon []>([{
        coupon_id:"c1",
        name:"SAVE20",
        discount:30,
        isActive:true,
        date:new Date().toLocaleDateString()
    }])
    

    const [showCouponCard,setShowCouponCard]=useState<boolean>(false);
    const [coupon,setCoupon]=useState<string>("");
    const [discount,setDiscount]=useState<number | null>(null);

    const createCoupon=(e:React.ChangeEvent<HTMLFormElement>):void=>{
        e.preventDefault();

        const newCoupon={
            coupon_id:'c'+coupons.length+1,
            name:coupon,
            discount:discount || 0,
            isActive:true,
            date:new Date().toLocaleDateString()
        }

        setCoupons(prev=>[...prev,newCoupon])
        setShowCouponCard(false);

    }
  return (
    <div className='flex flex-col  justify-center items-center w-full'>
        <div className='flex justify-end w-full'>
            <button onClick={()=>setShowCouponCard(true)} className='bg-[var(--primary)] h-[36px] w-[160px] rounded font-medium text-white cursor-pointer'>Add Coupon</button>

        </div>
        {showCouponCard && <form onSubmit={(e)=>createCoupon(e)} className='bg-white p-4 mt-3 rounded-[18px] w-full max-w-[800px] shadow-[var(--shadow-big)] flex flex-col gap-3'>
            <h1>Create Coupon</h1>
            <div className='flex gap-2 w-full flex-col sm:flex-row'>
                <div className='flex flex-col gap-2 flex-1'>
                    <label className='text-gray-600'>Coupon Code*</label>
                    <input value={coupon} onChange={(e)=>setCoupon(e.target.value)} type="text" className='border-2 border-gray-200 rounded placeholder:text-gray-500 p-2 outline-0' placeholder='SAVE20' />
                </div>
                <div className='flex flex-col gap-2 flex-1'>
                    <label className='text-gray-600'>Discount Percentage*</label>
                    <input value={discount!==null? discount:""} onChange={(e)=>setDiscount(Number(e.target.value))} type="number" pattern='[0-9]*' inputMode='numeric' min={10} max={100} className='border-2 border-gray-200 rounded placeholder:text-gray-500 p-2 outline-0' placeholder='20' />
                </div>
            </div>
            <div className='flex flex-col sm:flex-row gap-2'>
                <button type='submit' className='bg-emerald-800 p-2 text-white font-medium cursor-pointer flex-1 rounded'>Create Coupon</button>
                <button onClick={()=>setShowCouponCard(false)} className='bg-gray-400 p-2 border-0 rounded cursor-pointer flex-1 text-black'>Cancel</button>
            </div>
        </form>}

        {coupons?.map(coupon=>(
            <div className='w-full max-w-[1200px] p-3 mt-5 flex flex-col sm:flex-row justify-between sm:items-center bg-white rounded shadow-[var(--shadow-soft)] gap-3'>
  
            <div className='flex items-center gap-2 min-w-0'>
              <Tag size={40} className='text-white p-2 bg-green-600 rounded-full' />
              <div className='flex flex-col gap-1'>
                <h1>{coupon.name}</h1>
                <p>{coupon.discount}% Discount</p>
                <p>Created:{coupon.date}</p>
              </div>
            </div>
          
            
            <div className='flex gap-3 items-center flex-shrink-0'>
              <p className='bg-green-200 rounded-full py-1 px-2 text-xs'>Active</p>
              <SquarePen size={18} className='text-blue-600 cursor-pointer' />
              <Trash2 size={18} className='text-red-600 cursor-pointer' />
            </div>
          </div>
        ))}


    </div>
  )
}

export default Coupon