const mongoose = require("mongoose")

mongoose.set('strictQuery', true);

const connectDb = ()=>{
    return mongoose.connect("mongodb://127.0.0.1:27017/Class").then(()=>{
        console.log("DB CONNECTED");
    }).catch((e)=>{
        console.log(e);
    })
}

module.exports = connectDb;