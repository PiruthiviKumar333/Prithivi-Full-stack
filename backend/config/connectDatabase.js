const mongoose = require("mongoose")
const { error } = require("node:console")

const connectDatabase = ()=>{
    mongoose.connect(process.env.DBURL).then(()=>{
        console.log("Mongo-DB Connected")
    }).catch((error)=>{
        console.log("Mongo-DB Connection Error" , error.message)
    })
}

module.exports = connectDatabase