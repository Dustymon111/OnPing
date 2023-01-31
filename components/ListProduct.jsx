// import Products from "../public/products";
import Product from "./Product";
import { useEffect, useState } from "react";

export default function ListProduct({cat}) {

    let [Products, setProducts] = useState([])

    useEffect(()=>{
        loadProducts()
    },[])

    const loadProducts = async () => {
        const item = await fetch('http://localhost:8080/Products')
        const res = await item.json()
        setProducts(res)
    }

    return (
        <div className='w-full'>
            <div className='my-10 mx-40'>
                <h1 className='text-[20px] my-5 font-semibold border-b pb-5'>{cat.name}</h1>
                <div className='grid grid-cols-5 gap-8'>
                    {Products.map(product=>product.category == cat._id ? <Product key={product._id} data={product}/> : '')}
                </div>
            </div>
        </div>
    )
}
