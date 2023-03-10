import Layout from '../../Layout/Layout'
import { Fragment, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { IoPencilSharp } from "react-icons/io5"
import Image from 'next/image'
import Link from 'next/link'
import { FaMinus, FaPlus } from 'react-icons/fa'
import {getCookie} from 'cookies-next'
import jwtDecode from 'jwt-decode'

export default function Detail() {
    const router = useRouter()
    const [product,setProduct] = useState(null)
    let [quantity,setQuantity] = useState(1)
    const [userId, setUserId] = useState()
    const { id } = router.query
    let token = getCookie('x-access-token')
    


    const getProduct = async () => {
        const prd = await fetch(`http://localhost:8080/Products/${id}`)
        const res = await prd.json()
        setProduct(res)
    }

    useEffect(()=>{
        getProduct()
        if (token !== undefined){
            setUserId(jwtDecode(token).id)
        }
    },[id])

    const checkToken = () => {
        if (getCookie('x-access-token') === undefined){
            return false
        }
        return true
    }

    const saveToCart = async (item) => {
        const req_method = {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                product: item._id,
                qty: quantity,
                user_id: userId
            })
        };
        try{
            const postData = await fetch('http://localhost:8080/cart', req_method);
            const res = await postData.json()
            return res;
        }catch(err){
            return err
        }
    }

    function discountPrice(item){
        return item.price - (item.price * item.discount_value / 100) 
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
                                <Image className='hover:scale-150' src={product.image_url} width={500} height={300} loading="lazy" alt={product.name}/>
                            </div>
                            <div className='col-span-5'>
                                <h2 className='text-xl'>{product.name}</h2>
                                {product.is_discount? 
                                <>
                                    <h1 className='text-3xl font-bold my-3'>Rp.{discountPrice(product)?.toLocaleString()},-</h1>
                                    <div className='flex gap-5'>
                                        <h1 className='my-3 bg-red-600 text-lg font-bold text-white px-1 rounded'>{product.discount_value}%</h1>
                                        <h1 className='text-xl my-3 line-through font-light'>Rp.{product.price?.toLocaleString()},-</h1>
                                    </div>
                                </>
                                : 
                                <h1 className='text-2xl font-bold my-3'>Rp.{product.price?.toLocaleString()},-</h1>
                                }
                                <div className='mt-10'>
                                    <h4 className='text-2xl mb-5 font-semibold border-b-2 pb-2'>Deskripsi</h4>
                                    <p>{product.description}</p>
                                </div>
                            </div>
                            <div className="col-span-4">
                                <div className='w-full bg-red-600 text-center p-3 rounded-lg'>
                                    <p className='text-white font-semibold'>Produk Terpopuler</p>
                                </div>
                                <div className='border-2 border-red-600 mt-5 p-5 rounded-xl'>
                                    <p className='font-bold'>Pilih Varian</p>
                                    <Image src={product.image_url} width={100} height={100} alt={product.name}/>
                                    <div className = 'border-t-2 border-t-slate-400 '>
                                        <p className='text-sm my-2'>Jumlah Barang & Catatan</p>
                                        <div className="flex items-center justify-center gap-4 my-3">
                                            <button className={"p-2 bg-red-600 text-white rounded-full disabled:bg-gray-200"} disabled={quantity==1} onClick={()=>setQuantity(quantity-=1)}><FaMinus size={20} /></button>
                                            <h4 className="text-lg font-bold">{quantity}</h4>
                                            <button className="p-2 bg-red-600 text-white rounded-full disabled:bg-gray-200" disabled={quantity==7}  onClick={()=>setQuantity(quantity+=1)}><FaPlus size={20} /></button>
                                        </div>
                                        <div className='flex mt-5 gap-2'>
                                            < IoPencilSharp size={20}/>
                                            <p className='text-red-600 font-semibold'>Tambah Catatan</p>
                                        </div>
                                        <div className='mt-5 flex items-center justify-between'>
                                            <p className='text-sm font-semibold text-gray-400'>Total Belanja :</p>
                                            <h1 className='text-lg font-bold'>Rp. {(discountPrice(product) * quantity).toLocaleString()},-</h1>
                                        </div>
                                        <div className='grid gap-2 m-auto font-bold my-5'>
                                            {checkToken()?
                                            <> 
                                            <button className='w-full text-white bg-red-600 p-3 rounded-xl' onClick={() => {
                                                let toCart = confirm('Apakah Anda Yakin?')
                                                if (toCart){
                                                    saveToCart(product)
                                                }
                                            }}>+ Masuk Troli</button>
                                            <button className='w-full border border-red-600 p-3 rounded-xl text-red-600'>Langsung Beli</button>
                                            </>
                                            :
                                            <>
                                                <Link href='/login'><button className='w-full text-white bg-red-600 px-2 py-3 rounded-xl'>+ Masuk Troli</button></Link>
                                                <Link href='/login'><button className='w-full border border-red-600 px-2 py-3 rounded-xl text-red-600'>Langsung Beli</button></Link>
                                            </>
                                            }
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
