const express = require("express")
const morgan = require("morgan")
const connectDb = require("./Connect DB/ConnectDB")


const app = express()

app.use(morgan("tiny"))
app.use(express.json())

app.use("/",require("./Routes/Route.js"))

app.listen(3010,async()=>{
    await connectDb();
    console.log("server up at port 3010");
})