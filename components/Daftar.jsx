import Link from "next/link";
import Image from "next/image";
import Google from '../public/SVG/Google.svg'
import Fb from "../public/SVG/Fb.svg"

export default function Daftar() {
  return (
    <div className="card mt-14 ml-20 border border-2 rounded-lg bg-white text-black block h-[700px] w-[550px]">
        <div className="p-10 px-7">
            <p className="font-semibold text-center text-red-600">Sign Up dan dapatkan barang bintang 5 dengan harga kaki 5</p>
            <h1 className="text-[50px] font-semibold text-red-600 text-center">Sign Up</h1>
            <div className="grid grid-row-2 gap-[10px] justify-items-center">
                <div className="flex">
                    <span className="absolute mt-3 ml-7"><Image src={Google} width={20} height={20}/></span>
                    <button className="p-2 border w-80 rounded-lg font-semibold">Log in with Google</button>
                </div>
                <div className="flex">
                    <span className="absolute mt-1 ml-4"><Image src={Fb} width={50} height={36}/></span>
                    <button className="p-2 border w-80 rounded-lg bg-red-600 text-white font-semibold">Log in with Facebook</button>
                </div>
            </div>
            <div className="p-5">
                <hr/>
                <div className="abosolute text-center w-[150px] ml-36 mt-[-14px] bg-white">
                    <p className="font-semibold">OR</p>
                </div>
            </div>
            <form className="grid">
                <div className="py-2">
                    <input type="text" placeholder="Email/Username" className="border border-3 rounded-lg p-3 w-[480px]"/>
                </div>
                <div className="py-2">
                    <input type="text" placeholder="Nama Lengkap" className="border border-3 rounded-lg p-3 w-[480px]"/>
                </div>
                <div className="py-2">
                    <input type="text" placeholder="Nama Pengguna" className="border border-3 rounded-lg p-3 w-[480px]"/>
                </div>
                <div className="py-2">
                    <input type="text" placeholder="Kata Sandi" className="border border-3 rounded-lg p-3 w-[480px]"/>
                </div>
                <Link href='/login'><button className="bg-red-600 p-2 rounded-lg text-white font-bold mt-5 w-[480px]">Sign Up</button></Link>
            </form>
            <p className="text-center mt-8">Sudah Punya Akun? <span className="font-bold text-red-600"><Link href="/login">Log In</Link></span></p>
        </div>
    </div>
  )
}