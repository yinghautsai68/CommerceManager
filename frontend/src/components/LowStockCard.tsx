import Sony from '../assets/sony_wh1000xm4.jpg'
import type { Product } from '../types/types'

interface LowStockCardProps {
    product: Product
}
const LowStockCard = ({ product }: LowStockCardProps) => {
    return (
        <div className='flex flex-row justify-between items-center px-2 py-2 border-b border-gray-300 '>
            <div className='flex-4 flex flex-row items-center gap-2'>
                <img src={Sony} className='w-10 aspect-square border border-gray-300' alt="" />
                <div className='flex flex-col justify-center items-start'>
                    <span className='text-xs '>{product.name}</span>
                    <span className='text-xs'>NT$ {product.price}</span>
                </div>
            </div>
            <span className='flex-1 text-xs text-end'>{product.stock}件</span>
        </div>
    )
}

export default LowStockCard