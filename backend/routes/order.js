const express = require("express")
const Router = express.Router()
const {createOrder} = require("../controller/orderController")

Router.route("/order").post(createOrder)

module.exports = Router