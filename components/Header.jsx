import React, { Fragment, useState } from 'react';
import { FaShoppingCart, FaBell, FaHistory, FaEnvelope, FaUserCircle, FaArrowAltCircleDown } from 'react-icons/fa';
import {GoSearch} from 'react-icons/go'
import Head from 'next/head'
import Link from 'next/link';
import Image from 'next/image';
// import { useSelector } from 'react-redux';

export default function Header({title}){
    const [isHovering, setHovering] = useState(false);

    // const cart = useSelector((state) => state.cart);

    const handleMouseOver = () =>{
        setHovering(true)
    };

    const handleMouseOut = () => {
        setHovering(false)
    };

    return(
        <Fragment>
            <Head>
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
            <link href="https://fonts.googleapis.com/css2?family=Girassol&display=swap" rel="stylesheet" />
            <title>{title}</title>
            </Head>
                <header className='w-full text-white bg-red-600 py-2 px-24'>
                    <nav className='flex'>
                        <ul className='flex gap-[50px] text-[13px] grow'>
                            <li>Tentang OnPing</li>
                            <li>Menjadi Mitra</li>
                            <li>Buka OnShop</li>
                            <li>Bantuan</li>
                        </ul>
                        <p className='text-[13px] flex gap-[7px] '><span>{<FaArrowAltCircleDown size={20}/>}</span>Download Aplikasi</p>
                    </nav>
                    <div className='mt-3 flex justify-between gap-5'>
                        <h1 className='title text-[50px] font-Girassol'>
                            <Link href='/'>ONP!NG</Link>
                        </h1>
                        <form className='mt-4'>   
                            <input type="search"  className="p-3 bg-zinc-200 w-[500px] rounded-lg text-black focus:outline-0" placeholder="Cari..." required />
                            <span className='absolute ml-[-40px] mt-3 text-slate-500'>< GoSearch size={25} /></span>
                        </form>
                        <div className='flex mt-6 gap-[70px] ml-10'>
                            <Link href="/cart">
                                <span className='cursor-pointer relative'>
                                    <FaShoppingCart size={30} />
                                    {/* {
                                        cart.length ? <span class="absolute -top-1 -right-2 bg-green-500 text-white font-semibold text-xs px-2 py-0.5 rounded-full">{cart.length}</span> : ''
                                    } */}
                                </span>
                            </Link>  
                            <FaBell size={30} />
                            <Link href='/history'><span className='cursor-pointer'><FaHistory size={30} /></span></Link>
                            <FaEnvelope size={30} />
                            <span className='flex gap-[10px] cursor-pointer' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                                <FaUserCircle size={30} />
                                <p>User</p>
                                {/* Log Out */}
                                {isHovering? 
                                <div className='w-75 absolute mt-10 bg-white p-5 text-red-600 font-semibold drop-shadow-lg rounded-2xl border-2 border-red-600 z-40'>
                                    <Link href='/login'>Log Out</Link>
                                </div> : ''}   

                            </span>     
                        </div>
                    </div>
                </header>
          
            </Fragment>
    )
}
