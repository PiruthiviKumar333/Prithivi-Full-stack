const mongoose = require("mongoose")

const orderSchema = mongoose.Schema({
    cartItems: Array,
    amount:String,
    status:String,
    createdAt:Date
})

const orderModel = mongoose.model("order", orderSchema)

module.exports = orderModel