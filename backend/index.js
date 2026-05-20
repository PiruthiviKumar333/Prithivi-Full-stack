const express = require("express")
const app = express()
const productRouter = require("./routes/product")
const orderRouter = require("./routes/order")
const connectDatabase = require("./config/connectDatabase")
const dotenv = require("dotenv")
const cors = require("cors")
const path = require("path")
dotenv.config({path: path.join(__dirname, "config" , "config.env")})

connectDatabase()
app.use(cors())
app.use(express.json())
app.use("/api/v1", productRouter)
app.use("/api/v1",orderRouter)
app.use("/",(req,res)=>{
    res.send("Your Api Keys Running")
})

const PORT = process.env.PORT || 5000

app.listen(5000,()=>{
    console.log(`Sever Running at http://localhost:${PORT}/ in${process.env.SERVER}`)
})