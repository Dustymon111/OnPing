import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import Google from '../public/SVG/Google.svg'
import Fb from "../public/SVG/Fb.svg"

export default function Daftar() {

    let [username, setUsername] = useState("")
    let [email, setEmail] = useState("")
    let [fullname, setFullname] = useState("")
    let [password, setPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
     
        try{
            const reqMethod = {
                method: "POST",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username : username,
                    email: email,
                    fullname: fullname,
                    password: password
                })
            }   

            const postData = await fetch('http://localhost:8080/api/auth/signup', reqMethod)
            const res = await postData.json()
            if (postData.status == 200){
                setUsername("")
                setEmail("")
                setFullname("")
                setPassword("")
                alert("Registrasi Berhasil!")
            }else{
                alert ('Registrasi gagal, mohon coba registrasi kembali')
            }
        }catch(err){
            console.log(err);
        }
    }

  return (
    <div className="card mt-14 ml-20 border border-2 rounded-lg bg-white text-black block h-[680px] w-[530px]">
        <div className="p-10 px-7">
            <p className="font-semibold text-center text-red-600">Sign Up dan dapatkan barang bintang 5 dengan harga kaki 5</p>
            <h1 className="text-[50px] font-semibold text-red-600 text-center">Sign Up</h1>
            <div className="grid grid-row-2 gap-[10px] justify-items-center">
                <div className="flex">
                    <span className="absolute mt-3 ml-7"><Image src={Google} width={20}/></span>
                    <button className="p-2 border w-80 rounded-lg font-semibold">Log in with Google</button>
                </div>
                <div className="flex">
                    <span className="absolute mt-1 ml-4"><Image src={Fb} width={35}/></span>
                    <button className="p-2 border w-80 rounded-lg bg-red-600 text-white font-semibold">Log in with Facebook</button>
                </div>
            </div>
            <div className="p-5">
                <hr/>
                <div className="abosolute text-center w-[150px] ml-36 mt-[-14px] bg-white">
                    <p className="font-semibold">OR</p>
                </div>
            </div>
            <form className="grid" onSubmit={handleSubmit}>
                <div className="py-2">
                    <input type="text" required={true} placeholder="Username" className="border border-3 rounded-lg p-3 w-[470px]" value={username} onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div className="py-2">
                    <input type="email" required={true} placeholder="Email" className="border border-3 rounded-lg p-3 w-[470px]" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="py-2">
                    <input type="text" required={true} placeholder="Nama Lengkap" className="border border-3 rounded-lg p-3 w-[470px]" value={fullname} onChange={(e) => setFullname(e.target.value)}/>
                </div>
                <div className="py-2">
                    <input type="password" required={true} placeholder="Kata Sandi" className="border border-3 rounded-lg p-3 w-[470px]" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <button type="submit" className="bg-red-600 p-2 rounded-lg text-white font-bold mt-5 w-[470px]">Sign Up</button>
            </form>
            <p className="text-center mt-8">Sudah Punya Akun? <span className="font-bold text-red-600"><Link href="/login">Log In</Link></span></p>
        </div>
    </div>
  )
}