const express=require("express");
const app=express();
const mongoose=require("./controller/mongoose");
const dotenv=require('dotenv').config();
const PORT=process.env.PORT|| 5000;
var cors = require('cors')
app.use(cors())
app.use(express.json());

app.use("/api/auth",require("./routes/auth"))
app.use("/api/services",require("./routes/services"))
app.get("/",(req,res) =>
{
    return res.status(200).json("test successfull")
 })
app.listen(PORT,() =>
{
    console.log("server running on port",PORT)
})