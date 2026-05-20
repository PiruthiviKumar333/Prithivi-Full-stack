import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const ProductDetail = ({cartItems , setCartItems}) => {
    const {id} = useParams()

    const [product , setProduct] = useState(null)
    const [qty , setQty] = useState(1)

    useEffect(()=>{
        fetch("https://prithivi-full-stack.onrender.com/api/v1/product/"+id).then((res)=>res.json()).then((msg)=>setProduct(msg["product"]))
    },[])
    function AddtoCart(){
        const existItems = cartItems.find((item)=> item.product._id===product._id)
        if(!existItems){
            const newItem = {product,qty}
            setCartItems((state)=>[...state,newItem])
            toast.success("Cart Item added SuccessFully")
        }
    }

    function increaseQty(){
        if(product.stock==qty){
            return
        }
        setQty((state)=>state+1)
    }
    function decreaseQty(){
        if(qty>1){
            setQty((state)=>state-1)
        }
    }
  return (
    product && <div className="container container-fluid">
    <div className="row f-flex justify-content-around">
        <div className="col-12 col-lg-5 img-fluid" id="product_image">
            <img src={product.images[0].image} alt="sdf" height="500" width="500" />
        </div>

        <div className="col-12 col-lg-5 mt-5">
            <h3>{product.name}</h3>
            <p id="product_id">Product # 387874kkfjkf</p>

            <hr></hr>

            <div className="rating-outer">
                <div className="rating-inner"></div>
            </div>
       

            <hr></hr>

            <p id="product_price">{product.price}</p>
            <div className="stockCounter d-inline">
                <span className="btn btn-danger minus" onClick={decreaseQty}>-</span>

                <input type="number" className="form-control count d-inline" value={qty} readOnly />

                <span className="btn btn-primary plus" onClick={increaseQty}>+</span>
            </div>
             <button type="button" id="cart_btn" className="btn btn-primary d-inline ml-4" disabled={product.stock==0 ?true : false} onClick={AddtoCart}>Add to Cart</button>

            <hr></hr>

            <p>Status: <span id="stock_status" className={product.stock>0?"text-sucess":"text-danger"}>{product.stock>0 ? "In Stock" : "Out of Stock"}</span></p>

            <hr></hr>

            <h4 className="mt-2">Description:</h4>
            <p>{product.description}</p>
            <hr></hr>
            <p id="product_seller mb-3">Sold by: <strong>{product.seller}</strong></p>
            
            <div className="rating w-50"></div>
                    
        </div>

    </div>

</div>
  )
}

export default ProductDetail