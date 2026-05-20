const productModel = require("../models/productModel")


exports.getProducts = async(req,res)=>{

    const query = req.query.keyword ? {name:{
        $regex : req.query.keyword,
        $options :"i"
    }}:{}

    const products = await productModel.find({})

    res.json({
        status : true,
        products
    })
}

exports.getSingleProducts = async(req,res)=>{

    try{
        const product = await productModel.findById(req.params.id)
        res.json({
            status : true,
            product
        })
    }
    catch(err){
        res.json({
            status : false,
            err : "Unable to get the product ID"
        })
    }
}