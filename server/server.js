const express =  require("express");
const mongoose = require("mongoose");
const cors =require( "cors")
const morgan =require( "morgan");
require("dotenv").config()
const router = require('./routes/routing')
const app = express();

   


// bataBase connection establibment

mongoose.connect(process.env.dataBaseUrl)
.then(()=> console.log("DataBase connected"))
.catch((err) => console.log(err))


app.use(express.json({limit : '5mb'}));
app.use(express.urlencoded({extended: true}))
app.use(cors({
    origin: ['http://localhost:3000']
}))


app.use("/api",router)














app.listen(process.env.port,()=>{
    console.log(`Server is running on the port ${process.env.port}`);
})