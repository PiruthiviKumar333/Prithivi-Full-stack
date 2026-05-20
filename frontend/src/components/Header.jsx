import React from 'react'
import Search from './Search'
import { Link } from 'react-router-dom'

const Header = ({cartItems}) => {
    return (
        <nav className="navbar row">
            <div className="col-12 col-md-3">
                <div className="navbar-brand">
                    <img className='rounded-pill' width="90px" height="90px" src="/images/products/logo.png" />
                </div>
            </div>

            <Search/>

            <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
                <Link to={"/cart"} id="cart" className="ml-3" className={"text-dark"}>Cart</Link>
                <span className="ml-1" id="cart_count">{cartItems.length}</span>
            </div>
        </nav>
    )
}

export default Header