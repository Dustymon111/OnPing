import Layout from '../../Layout/Layout'
import { Fragment, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
// import products from "../../public/products"
import { IoPencilSharp } from "react-icons/io5"
import Image from 'next/image'
import Link from 'next/link'
import { FaMinus, FaPlus } from 'react-icons/fa'

export default function Detail() {
    const router = useRouter()
    const [product,setProduct] = useState(null)
    let [quantity,setQuantity] = useState(1)
    const { id } = router.query
    
    const getProduct = async () => {
        const prd = await fetch(`http://localhost:8080/Products/${id}`)
        const res = await prd.json()
        setProduct(res)
    }

    useEffect(()=>{
        getProduct()
    },[id])


    const saveToCart = async (item) => {
        const req_method = {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: {
                product: item._id,
                qty: quantity
            }
        };
        try{
            const postData = await fetch('http://localhost:8080/cart', req_method);
            const res = await postData.json()
            return res;
        }catch(err){
            return err
        }
    }

    function handleCart(item){

        let conf = confirm("Apakah Anda Yakin ?")

        if(conf){
            saveToCart(item)
        }
    }

    return (
        product ? 
        <Fragment>
            <Layout key={product._id} title={product.name}>
                <div className='w-full'>
                    <div className='mt-10 mx-72'>
                        <div className='flex gap-4 my-5'>
                            <Link href={'/'}> 
                                <p className='text-red-600'>Home</p>
                            </Link>
                            <span>-</span>
                            <span>{product.name}</span>
                        </div>
                        <div className="grid grid-cols-12 gap-12">
                            <div className='col-span-3'>
                                <Image loader={()=> product.image_url} src={product.image_url} width={1000} height={1000} alt={product.name}/>
                            </div>
                            <div className='col-span-5'>
                                <h2 className='text-xl'>{product.name}</h2>
                                <h1 className='text-2xl font-bold my-3'>Rp.{product.price?.toLocaleString()},-</h1>
                                <div className='mt-10'>
                                    <h4 className='text-lg mb-5'>Deskripsi</h4>
                                    <p className='text-sm'>{product.description}</p>
                                </div>
                            </div>
                            <div className="col-span-4">
                                <div className='bg-red-600 text-center p-3 rounded-lg'>
                                    <p className='text-white font-semibold'>Produk Terpopuler</p>
                                </div>
                                <div className='border-2 border-red-600 mt-5 p-5 rounded-xl'>
                                    <p className='font-bold'>Pilih Varian</p>
                                    <Image loader={()=> product.image_url} src={product.image_url} width={100} height={100} alt={product.name}/>
                                    <div className = 'border-t-2 border-t-slate-400 '>
                                        <p className='text-sm my-2'>Jumlah Barang & Catatan</p>
                                        <div className="flex items-center justify-center gap-4 my-3">
                                            <button className={"p-2 bg-red-600 text-white rounded-full disabled:bg-gray-200"} disabled={quantity==1} onClick={()=>setQuantity(quantity-=1)}><FaMinus size={20} /></button>
                                            <h4 className="text-lg font-bold">{quantity}</h4>
                                            <button className="p-2 bg-red-600 text-white rounded-full" onClick={()=>setQuantity(quantity+=1)}><FaPlus size={20} /></button>
                                        </div>
                                        <div className='flex mt-5 gap-2'>
                                            < IoPencilSharp size={20}/>
                                            <p className='text-red-600 font-semibold'>Tambah Catatan</p>
                                        </div>
                                        <div className='mt-5 flex items-center justify-between'>
                                            <p className='text-sm font-semibold text-gray-400'>Total Belanja :</p>
                                            <h1 className='text-lg font-bold ml-6'>Rp. {product.price},-</h1>
                                        </div>
                                        <div className='grid gap-2 m-auto font-bold my-5'>
                                            <button className='text-white bg-red-600 p-3 rounded-xl' onClick={handleCart(product)}>+ Masuk Troli</button>
                                            <button className='border border-red-600 p-3 rounded-xl text-red-600'>Langsung Beli</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </Fragment> : ''
    )
}
