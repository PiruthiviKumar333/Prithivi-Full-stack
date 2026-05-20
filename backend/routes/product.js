const express = require("express")
const { get } = require("node:http")
const Router = express.Router()
const {getProducts,getSingleProducts} = require("../controller/productController")

Router.get("/products",getProducts)
Router.route("/product/:id").get(getSingleProducts)

module.exports = Router