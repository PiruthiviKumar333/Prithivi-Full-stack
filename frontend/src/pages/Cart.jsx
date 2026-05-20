import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

const Cart = ({cartItems , setCartItems}) => {
    function inc(item){
        if(item.product.stock==item.qty){
            return
        }
        const updateItems = cartItems.map((i)=>{
            if(i.product._id==item.product._id){
                i.qty++
            }
            return i
        })

        setCartItems(updateItems)
    }

    function dec(item){
        if(item.qty>1){
            const updateItems = cartItems.map((i)=>{
                if(i.product._id==item.product._id){
                    i.qty--
                }
                return i
            })

            setCartItems(updateItems)
        }
    }

    function handleremove(item){
        const updateItems = cartItems.filter((i)=>{
            if(i.product._id!==item.product._id){
                return true
            }
        })

        setCartItems(updateItems)
    }

    const [complete,setComplete] = useState(false)

    function placeOrderHandler(){
        fetch("https://full-stack-project-8zuy.onrender.com/api/v1/order",{
            method:"POST",
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(cartItems)
        })
        .then(()=>{
            setCartItems([])
            setComplete(true)
            toast.sucess("Order Placed!")
        })
    }

  return cartItems.length>0 ? <Fragment> <div className="container container-fluid">
                <h2 className="mt-5">Your Cart: <b>2 items</b></h2>
                
                <div className="row d-flex justify-content-between">
                    <div className="col-12 col-lg-8">
                        {
                            cartItems.map((item)=>
                            (<Fragment>
                                <hr />
                                <div className="cart-item">
                                    <div className="row">
                                        <div className="col-4 col-lg-3">
                                            <img src={item.product.images[0].image} alt="Laptop" height="90" width="115" />
                                        </div>
        
                                        <div className="col-5 col-lg-3">
                                            <Link to={"/product/"+item.product._id}>{item.product.description}</Link>
                                        </div>
        
        
                                        <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                            <p id="card_item_price">{item.product.price}</p>
                                        </div>
        
                                        <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                            <div className="stockCounter d-inline">
                                                <span className="btn btn-danger minus" onClick={()=> dec(item)}>-</span>
                                                <input type="number" className="form-control count d-inline" value={item.qty} readOnly />
        
                                                <span className="btn btn-primary plus" onClick={()=> inc(item)}>+</span>
                                            </div>
                                        </div>
        
                                        <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                                            <i onClick={()=>handleremove(item)} id="delete_cart_item" className="fa fa-trash btn btn-danger"></i>
                                        </div>
        
                                    </div>
                                </div>
                                <hr />
                            </Fragment>))
                        }
                    </div>

                    <div className="col-12 col-lg-3 my-4">
                        <div id="order_summary">
                            <h4>Order Summary</h4>
                            <hr />
                            <p>Subtotal:  <span className="order-summary-values">{cartItems.reduce((acc,item)=>(acc+item.qty),0)} (Units)</span></p>
                            <p>Est. total: <span className="order-summary-values">${Number(cartItems.reduce((acc,item)=>(acc+item.product.price* item.qty),0))}</span></p>

                            <hr />
                            <button onClick={placeOrderHandler} id="checkout_btn" className="btn btn-primary btn-block">Place Order</button>
                        </div>
                    </div>
                </div>
            </div>
            </Fragment> : (!complete ? <p>Your List is EMpty !</p> 
            : <Fragment>
                <h2 className='m1-5'>Order Completed!</h2>
                <p>Your order has been placed succesfully.</p>
            </Fragment>)
}

export default Cart