const orderModel = require("../models/orderModel")
const productModel = require("../models/productModel")

exports.createOrder = async(req,res)=>{

    const cartItems = req.body
    const amount = cartItems.reduce((pre,cur)=>(pre + cur.product.price * cur.qty),0)
    const status = "ACTIVE"
    const order = await orderModel.create({cartItems,amount,status})


    cartItems.forEach( async(item)=>{
        const product = await productModel.findById(item.product._id)
        product.stock = product.stock - item.qty
        await product.save()
    })

    res.json({
        status :true,
        order
    })
}