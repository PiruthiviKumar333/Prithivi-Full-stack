import React, { Fragment, useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import { useSearchParams } from 'react-router-dom'


const Home = () => {

    const [products,setProducts] = useState([])
    const [searchParams,setSearchParams] = useSearchParams()
    useEffect(()=>{
        fetch("https://full-stack-project-8zuy.onrender.com/api/v1/products?"+searchParams).then((res)=>res.json()).then((msg)=>setProducts(msg.products))
    },[searchParams])
    // console.log(searchParams)
  return (
    <Fragment>
         <h1 id="products_heading">Latest Products</h1>

            <section id="products" className="container mt-5">
            <div className="row">
                {
                    products.map((product)=> <ProductCard key={product.id} product={product}/>)
                }
            </div>
            </section>
    </Fragment>
  )
}

export default Home