const mongoose=require("mongoose");
const dotenv=require('dotenv').config();
mongoose.set("strictQuery", false);

// mongoose.connect(process.env.MONGO_URL)
// .then(()=> console.log("Database connected sucessfully"))
// .catch(err => console.log(err.message));

// 
mongoose.connect(`mongodb+srv://anurag-327:${process.env.MONGO_ATLAS}@cluster0.wlfzhgd.mongodb.net/PasswordManager?retryWrites=true&w=majority`)
.then(()=> console.log("Database connected sucessfully"))
.catch(err => console.log(err.message))
