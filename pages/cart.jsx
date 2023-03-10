import { Fragment, useState, useEffect } from "react";
import Layout from '../Layout/Layout'
import Link from "next/link";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import jwtDecode from "jwt-decode";
import { getCookie } from "cookies-next";

export default function Cart(){ 
    let [cart, setCart] = useState([])
    const [total, setTotal] = useState(0)
    const [loading, setLoading] = useState(false)


    let arr = []
    useEffect(() => {
        loadCart()
    }, [])

    const loadCart = () => {   
        fetch("http://localhost:8080/cart")
            .then((response) => response.json())
            .then((data) => {
                setTotal(data.total)
                data.cart.map(item => {
                        let shop = {_id: "",name: "", is_selected: item.product.shop.is_selected, product: []}
    
                        let i = arr.findIndex(x => x._id === item.product.shop._id)
                        if (i !== -1){
                            let j = arr[i].product.findIndex(y => y._id === item.product._id)
                            if (j === -1){
                                arr[i].product.push(item.product)
                            }else{
                                arr[i].product[j].qty = item.product.qty
                            }
                        }else{
                            shop._id = item.product.shop._id
                            shop.name = item.product.shop.name
                            shop.product.push(item.product) 
                            arr.push(shop)
                        }
                        setCart(arr)                     
                })
            }) 
        }

    const handleChecked = (type, item) => {
        fetch(`http://localhost:8080/${type}/${item._id}/update-selected`, {
            method: 'POST',
            headers: {
              Accept: 'application.json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                is_selected: !item.is_selected
            }),   
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok.')
            }else{
                loadCart()
            }
          }).catch(console.error)
    }

    const discountPrice = (item) => { // untuk mendapatkan harga setelah di diskon
        let discount = item.price - (item.price * (item.discount_value / 100))
        return discount
    }

    const checkChecked = () => { // jika ada 1 saja item yang ter-cek, maka tombol hapus dan beli akan enabled
        let flag = false
        cart.map(shop => {
            if (shop.is_selected){
                flag = true
            }
            shop.product.map(item => {
                if (item.is_selected){
                    flag = true
                }
            })
        })
        if (!flag){
            return false
        }else{
            return true
        }
    }


    const checkCheckedAll = () => { // jika ada 1 saja item yang tidak ter-cek, maka checkbox pilih semua akan uncheck
        let allChecked = true
        for (let i = 0; i < cart.length; i++){
            if (!cart[i].is_selected){
                allChecked = false
                break
            }
        }
        if(!allChecked){
            return false
        }else{
            return true
        }
    }

    const deleteItem = () => {
        fetch(`http://localhost:8080/cart`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok.')
            }else{
                loadCart()
                window.location.reload(false)
            }
          }).catch(console.error)       
    }



    const updateStock = (type, item) => {
        fetch(`http://localhost:8080/Products/update-stock/${item._id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                qty: type === 'increment' ? item.qty+1 : item.qty-1
            }),   
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok.')
            }else{
                let newTotal = total
                let newCart = cart.map(shop=>{
                if(shop._id === item.shop._id) {
                    shop.product.map(product=>{
                        if(product._id === item._id) {
                            if (type !== 'increment'){
                                product.qty -= 1    
                                if (product.is_selected){
                                    newTotal -= discountPrice(product)
                                }
                            }
                            else{
                                product.qty += 1 

                                if (product.is_selected){
                                    newTotal += discountPrice(product)
                                }
                            }
                        }
                        return product
                    })
                }
                return shop
            })
                setCart(newCart)
                setTotal(newTotal)
            }
          }).catch(console.error)       
    }
    

    const checkAll = () => {
        fetch(`http://localhost:8080/cart/check-all`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok.')
            }else{
                let flag = checkCheckedAll()
                let newTotal = total
                let newcart = cart.map(shop=>{
                    shop.product.map(item => {
                        if(!flag){
                            shop.is_selected = true
                            item.is_selected = true
                            newTotal += discountPrice(item) * item.qty
                        }else{
                            shop.is_selected = false
                            item.is_selected = false
                            newTotal -= discountPrice(item) * item.qty
                        }
                        return item
                    })
                    return shop
                })
                setTotal(newTotal)
                setCart(newcart)
            }
          }).catch(console.error)
    }

    

    return (
        <Fragment>
            <Layout title={"Keranjang"}>
                <div className='bg-white sticky top-[111px] w-full z-30 border-b-4 px-5 flex justify-between'>
                    <h1 className="text-2xl font-semibold py-5 sticky">Keranjang</h1>
                    <button className='disabled:opacity-60' disabled={!checkChecked()} onClick={() => {
                        if (window.confirm(`Hapus barang?`)){
                            deleteItem()
                        } 
                        }}><FaTrash size={30}/></button>
                </div>
                <div className="px-6">
                    <div className={"py-10"}>
                        {loading? <h1>Loading....</h1> : 
                        cart.length === 0 ? (
                        <div className='text-center'>
                            <h1>Keranjang kosong!</h1>
                            <Link href='/'><button className='mt-5 py-2 px-4 bg-red-600 text-white rounded-full'>Mari Belanja</button></Link>
                        </div>
                        ) : (
                        <>
                        <h1 className='font-semibold text-red-600 text-xl'><input className='mx-3' checked={checkCheckedAll()} type={"checkbox"} onChange={checkAll}></input>Pilih Semua</h1>
                        {cart.map(shop => (         
                            <div key={shop._id}>
                                <h2 className='font-semibold py-5 text-xl'>
                                    <input className='h-4 w-4 mx-3 cursor-pointer' type={"checkbox"} checked={shop.is_selected} onChange={() => handleChecked("cart", shop)}/>
                                    {shop.name}
                                </h2>
                                <table className="w-full">
                                    <tbody>
                                    {shop.product.map(item => (
                                        <tr className="w-full" key={item._id}>
                                            <td> <input className='cursor-pointer' type={"checkbox"} checked={item.is_selected} onChange={() => handleChecked("Products", item)}/></td>
                                            <td className="px-6 py-3 text-left"><img alt={item.name} src={item.image_url} width={100} height={200}/></td>
                                            <td className="px-6 py-3">
                                                {item.is_discount? (
                                                    <>
                                                    <span className='grid'>{item.name} 
                                                        <b>
                                                            <span className='bg-red-600 px-2 py-1 rounded-md color text-white'> {item.discount_value}%</span>
                                                            <span className='line-through mx-4 font-light'> Rp.{item.price?.toLocaleString()},-</span>
                                                        </b>
                                                    </span>
                                                    <span><b>Rp.{discountPrice(item)?.toLocaleString()},-</b></span>
                                                    </>
                                                    ) : <span>{item.name} (<b>Rp.{item.price?.toLocaleString()},-</b>)</span>}
                                            </td>
                                            <td className="px-6 py-3">
                                                <div className="flex items-center justify-center gap-4">
                                                    <button className="p-2 bg-red-600 text-white rounded-full disabled:opacity-75" disabled={item.qty === 1} onClick={()=>updateStock("decrement", item)}><FaMinus size={20} /></button>
                                                    <h4 className="text-lg font-bold">{item.qty}</h4>
                                                    <button className="p-2 bg-red-600 text-white rounded-full disabled:opacity-75" disabled={item.qty === 7} onClick={()=>updateStock("increment", item)}><FaPlus size={20} /></button>
                                                </div>
                                            </td>
                                            <td className="px-6 py-3 text-center text-right">
                                                {item.is_discount ? (
                                                    <b>Rp.{(item.qty * discountPrice(item))?.toLocaleString()},-</b>) : <b>Rp.{(item.qty * item.price)?.toLocaleString()},-</b>   
                                                }
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        ))}
                        </>
                        )}
                    </div>
                </div>
                <h2 className="w-full text-xl font-semibold p-5 flex justify-between items-center sticky bottom-0 bg-white border-t-4">
                    <span>Total</span>
                    <span>Rp.{total?.toLocaleString()},-</span>
                    <button className='bg-red-600 rounded px-10 py-2 font-semibold text-white disabled:opacity-75' disabled={!checkChecked()} onClick={() => {
                        if(window.confirm("Apakah anda yakin ingin membeli?")){
                            alert('Terimakasih sudah melakukan pembelian melalui OnP!ng')
                            deleteItem()
                        } 
                        else{
                            alert('Pembelian dibatalkan')
                        }
                        
                    }}>Beli</button>
                </h2>
            </Layout>
        </Fragment>
    );
}