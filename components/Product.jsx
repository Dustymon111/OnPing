import Image from 'next/image';
import Link from 'next/link';

export default function Product({data}){
    function discountPrice(item){
        return item.price - (item.price * item.discount_value / 100) 
    }
    return (
        <div className='cursor-pointer hover:shadow-2xl hover:scale-110 transition duration-300 text-center p-5 bg-red-600 rounded-lg'>
            <Link href={'/products/'+data._id}>
                <div className='flex-1 justify-between'>
                    <Image src={data.image_url} width={200} height={0} alt={data.name}/>
                    <div>
                        <p className='break-words truncate font-semibold text-white'>{data.name}</p>
                        {data.is_discount? 
                        <>
                            <h1 className='font-bold text-white'>Rp.{discountPrice(data)?.toLocaleString()},-</h1>
                            <div className='flex gap-3'>
                                <h1 className='bg-white font-bold text-red-600 p-1 rounded text-sm'>{data.discount_value}%</h1>
                                <h1 className='line-through text-white'>Rp.{data.price?.toLocaleString()},-</h1>
                            </div>
                        </>
                        : 
                        <h1 className='font-bold text-white'>Rp.{data.price?.toLocaleString()},-</h1>
                        }
                    </div>
                </div>
            </Link>
        </div>
    )
}