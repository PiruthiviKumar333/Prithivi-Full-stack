import { Route, Routes } from 'react-router-dom'
import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import Cart from './pages/Cart'


function App() {
  const [cartItems, setCartItems] = useState([])

  return (
    <div className="App">
      <ToastContainer />
      <Header cartItems={cartItems}/>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/search' element={<Home/>}/>
        <Route path='/product/:id' element={<ProductDetail cartItems={cartItems} setCartItems={setCartItems}/>}/>
        <Route path='/cart' element={<Cart cartItems={cartItems} setCartItems={setCartItems} ToastContainer={toast}/>}/>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
