import Link from "next/link";
import AppStore  from "../public/SVG/Appstore.svg";
import Playstore from "../public/SVG/Playstore.svg";
import Image from "next/image";
import { useState } from "react";
import { useRouter} from 'next/router'
import {setCookie} from 'cookies-next'

export default function Login() {

    const router = useRouter();
    const [user, setUser] = useState('')
    const [pass, setPass] = useState('')

    const handleSubmit = async (e) =>{
        e.preventDefault();

        try{
            const signIn = await fetch('http://localhost:8080/api/auth/signin', {
                method: "POST",
                headers:{
                    Accept: 'application/json',
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({
                    username: user,
                    password: pass
                })
            })
            const res = await signIn.json()
            if (signIn.status === 200){
                setCookie('x-access-token', res.accessToken)
                router.push('/')
            }else{
                alert('Login gagal! Mohon cek username dan password')
            }
        }catch(err){
            console.log(err);
        }
    }

  return (
    <div className="card mt-20 ml-20 border border-2 rounded-lg bg-white text-black block w-[530px] h-[440px]">
        <div className="p-10 px-12">
            <h1 className="text-[30px] font-semibold text-red-600">Log in</h1>
            <form className="grid grid-rows-2" onSubmit={handleSubmit}>
                <div className="py-4">
                    <input type="text" value={user} onInput={e => setUser(e.target.value)} placeholder="Email/Username" name="uname" className="border border-3 rounded-lg p-3 w-[450px]" required/>
                </div>
                <div className="py-4">
                    <input type="password" value={pass} onInput={e => setPass(e.target.value)} placeholder="Password" name="pass" className="border border-3 rounded-lg p-3 w-[450px]" required/>
                </div>
                <button className="bg-red-600 p-2 rounded-lg text-white font-bold mt-5" onClick={handleSubmit}>Login</button>
            </form>
            <p className="text-sm text-blue-700 text-center mt-12">Lupa Password?</p>
        </div>
        <div className="border bg-white rounded-lg text-center p-5 mt-10">
            <p>Belum Punya Akun? <span className="text-red-600 font-bold"><Link href='/register'>Daftar Sekarang</Link></span></p>
        </div>
        <div className="ml-14 mt-5 w-[450px]">
            <p className="text-white font-semibold text-center">Download Aplikasinya Sekarang!</p>
            <div className="flex justify-between">
                <Image src={AppStore} width={200}/>
                <Image src={Playstore} width={200}/>
            </div>
        </div>
    </div>
  )
}