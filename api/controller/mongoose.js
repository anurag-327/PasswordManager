const mongoose=require("mongoose");
const dotenv=require('dotenv').config();
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URL)
.then(()=> console.log("Database connected sucessfully"))
.catch(err => console.log(err.message));
