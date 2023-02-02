import React, { Fragment, useState, useEffect } from 'react';
import { FaShoppingCart, FaBell, FaHistory, FaEnvelope, FaUserCircle, FaArrowAltCircleDown } from 'react-icons/fa';
import {GoSearch} from 'react-icons/go'
import Head from 'next/head'
import Link from 'next/link';
import {getCookie, deleteCookie} from 'cookies-next';
import jwtDecode from 'jwt-decode';

export default function Header({title}){
    const [isHovering, setHovering] = useState(false);

    
    const [token, setToken] = useState()
    useEffect(() => {
        if (getCookie('x-access-token') !== undefined){
            setToken(getCookie('x-access-token'))
        }
    })

    const getUsername = () => {
        return jwtDecode(token).username
    }

    const resetCookie = () => {
        deleteCookie('x-access-token')
    }

    const handleMouseOver = () =>{
        setHovering(true)
    };

    const handleMouseOut = () => {
        setHovering(false)
    };

    return(
        <Fragment>
            <Head>
                <title>{title}</title>
            </Head>
                <header className='w-full text-white bg-red-600 pt-2 px-24 sticky top-0 z-40'>
                    <nav className='flex'>
                        <ul className='flex gap-[50px] text-[13px] grow'>
                            <li>Tentang OnPing</li>
                            <li>Menjadi Mitra</li>
                            <li>Buka OnShop</li>
                            <li>Bantuan</li>
                        </ul>
                        <p className='text-[13px] flex gap-[7px] '><span>{<FaArrowAltCircleDown size={20}/>}</span>Download Aplikasi</p>
                    </nav>
                    <div className='mt-2 flex justify-between gap-5'>
                        <h1 className='title text-[50px] font-Girassol'>
                            <Link href='/'>ONP!NG</Link>
                        </h1>
                        <form className='mt-4'>   
                            <input type="search"  className="py-2 px-3 bg-zinc-200 w-[500px] rounded-lg text-black focus:outline-0" placeholder="Cari..." required />
                            <span className='absolute ml-[-40px] mt-2 text-slate-500'>< GoSearch size={24} /></span>
                        </form>
                        <div className='flex mt-5 gap-[70px] ml-10'>
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
                                <p className='font-semibold'>{token === undefined? "User": getUsername()}</p>
                                {/* Log Out */}
                                {isHovering? 
                                    token !== undefined?
                                <>
                                <div className='w-75 grid grid-rows-2 gap-5 absolute mt-10 bg-white p-5 text-red-600 font-semibold drop-shadow-lg rounded-xl border-2 border-red-600 z-40'>
                                    <div className='hover:scale-125 hover:bg-red-600 p-2 rounded hover:text-white'>
                                        <Link href='/login'><button onClick={resetCookie}>Sign Out</button></Link>
                                    </div>
                                    <div className='hover:scale-125 hover:bg-red-600 p-2 rounded hover:text-white'>
                                        <Link href='/profile'>Profile</Link>
                                    </div>
                                </div> 
                                </>
                                : 
                                <div className='w-75 absolute mt-10 bg-white p-5 text-red-600 font-semibold drop-shadow-lg rounded-xl border-2 border-red-600 z-40'>
                                    <div className='hover:scale-125 hover:bg-red-600 p-2 rounded hover:text-white'>
                                        <Link href='/login'>Sign in</Link>
                                    </div>
                                </div> 
                                : ''}   
                            </span>     
                        </div>
                    </div>
                </header>   
            </Fragment>
    )
}
