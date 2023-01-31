import Layout from '../Layout/Layout'
import { Fragment, useState, useEffect } from 'react'
// import Categories from '../public/categories'
import Image from 'next/image'
import ListProduct from '../components/ListProduct'
import 'react-slideshow-image/dist/styles.css';
import { Slide } from 'react-slideshow-image';

export default function Home() {

  let [Categories, setCategories] = useState([])

  const loadCategories = async () => {
    const category = await fetch('http://localhost:8080/Products/category')
    const res = await category.json()
    setCategories(res)
  }
  // console.log(Categories);

  useEffect(() => {
    loadCategories()
  },[])


  const allCat = Categories?.map(category=><ListProduct  key={category._id} cat={category}/>)
  const slides = [ '/../public/UAS-Assets/mikro.png', '/../public/banner.jpg']
  return (
    <Fragment>
      <Layout title={'Home'}>
        <Slide>
          {slides.map((slideImage, index) => (
            <div className='each-slide mt-20 mx-96' key={index}>
              <Image src={slideImage} width={800} height={400} alt={"Banner"}/>
            </div>
          ))}
        </Slide>
        {allCat}
      </Layout>
    </Fragment>
  )
}
