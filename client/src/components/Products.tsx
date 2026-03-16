import { ArrowRight } from 'lucide-react'
import img from "../assets/shop13.jpeg"

const Products = () => {
    return (
        <div className='w-full max-w-[280px] flex flex-col gap-2 shadow-[var(--shadow-big)] rounded-[12px]'>
            <img src={img} alt="product" className='h-[200px] border-b-2 border-gray-50 bg-cover w-full rounded-tl-[12px] rounded-tr-[12px]' />
            <div className='w-full'>
                <div className='p-3'>
                    <h1 className='text-xl truncate text-black font-medium '>Phone Charger</h1>
                    <p className='truncate text-sm text-gray-800'>Kirana Stores</p>
                    <div className='w-full flex justify-between items-center'>
                        <p className='text-blue-500 font-medium text-[20px]'>499/-</p>
                        <button className='flex items-center h-[36px] rounded cursor-pointer px-3 bg-[#151316]  text-white '>View <ArrowRight className='text-white' size={18} /></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Products