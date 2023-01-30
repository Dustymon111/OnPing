import { Fragment } from "react";
import Link from 'next/link'
import Head from 'next/head';
import Image from 'next/image'
import mikro from '../public/UAS-Assets/mikro.png'


export default function Log( {children, type }){
    return (
        <Fragment>
            <Head>
                <link href="https://fonts.googleapis.com/css2?family=Girassol&display=swap" rel="stylesheet" />
                <title>{type}</title>
            </Head>
            <header className="w-full flex text-red-600">
                <h1 className="font-Girassol text-[100px] ml-48">ON P!NG</h1>
                <h3 className="ml-10 mt-10 text-6xl font-semibold">{type}</h3>
            </header>  
            <main className="bg-red-600 w-full flex text-white">
                <div className="block mt-44 ">
                    <h1 className="font-Girassol text-[100px] ml-80">ON P!NG</h1>
                    <h2 className="text-5xl font-semibold ml-36">Platform Jual-Beli No.331 di Asia</h2>
                    <div className="ml-96 mt-14 mb-12 w-[180px] font-semibold">
                        <p>Dipersembahkan oleh :</p>
                        <p className="text-center">anonymous</p>
                        <p>dari Mikroskil University</p>
                    </div>
                    <div className="ml-48 cursor-pointer">
                        <Link href="https://www.mikroskil.ac.id"><Image src={mikro} width={600} height={230}/></Link>
                    </div>    
                </div>
                {children}
            </main>
        </Fragment>
    )
}