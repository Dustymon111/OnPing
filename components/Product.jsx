import Image from 'next/image';
import Link from 'next/link';

export default function Product({data}){
    return (
        <div className='cursor-pointer hover:shadow-2xl hover:scale-110 transition duration-300 text-center p-5 bg-red-600 rounded-lg'>
            <Link href={'/products/'+data._id}>
                <div className='flex-1 justify-between'>
                    <Image src={data.image_url} width={200} height={150} alt={data.name}/>
                    <div>
                        <p className='break-words truncate font-semibold'>{data.name}</p>
                        <p className='text-sm text-white font-semibold'>Rp.{data.price.toLocaleString('en-US')},-</p>
                    </div>
                </div>
            </Link>
        </div>
    )
}