import Layout from '../Layout/Layout.js'
import Link from 'next/link.js'
import mikro from '../public/UAS-Assets/mikro.png'
import Image from 'next/image.js'
import { getCookie, getCookies } from 'cookies-next'
import jwtDecode from 'jwt-decode'
import { useEffect, useState } from 'react'

const Profile = () => {
  let [decode, setDecode] = useState({})
  let [token, setToken] = useState()
  useEffect (() => { 
    setToken(localStorage.getItem('token'))
    setDecode(jwtDecode(localStorage.getItem('token')))
  }, [])


  return (
    <Layout>
      <div className='flex justify-between'>
        <div className='w-1/2 text-center my-20'>
            <h1 className='font-semibold text-5xl'>PROFILE</h1>
            <ul className='list w-full mx-auto text-left p-5'>
              <li className='border-b-2 text-xl my-10 py-2'><b>User ID</b> {decode.id}</li>
              <li className='border-b-2 text-xl my-10 py-2'><b>Username</b> {decode.username}</li>
              <li className='border-b-2 text-xl my-10 py-2'><b>Email</b> {decode.email}</li>
              <li className='border-b-2 text-xl my-10 py-2'><b>Nama Lengkap</b>{decode.fullname}</li>
            </ul>
        </div>
        <main className="bg-red-600 w-1/2 flex text-white">
          <div className="block mt-20">
              <h1 className="font-Girassol text-[100px] ml-60">ON P!NG</h1>
              <h2 className="text-4xl font-semibold ml-32">Platform Jual-Beli No.331 di Asia</h2>
              <div className="ml-80 mt-14 mb-12 w-[180px] font-semibold">
                  <p>Dipersembahkan oleh :</p>
                  <p className="text-center">anonymous</p>
                  <p>dari Mikroskil University</p>
              </div>
              <div className="ml-24 cursor-pointer">
                  <Link href="https://www.mikroskil.ac.id"><Image src={mikro} width={600} height={230} alt={"mikro"}/></Link>
              </div>    
          </div>
        </main>
      </div>
    </Layout>
  )
}

export default Profile