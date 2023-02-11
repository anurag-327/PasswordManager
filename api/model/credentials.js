const mongoose=require("mongoose");

const newcredentials= new mongoose.Schema({
    userId: {type:mongoose.Schema.Types.ObjectId,ref:"User",unique:true},
    credentials:{type:Array,default:[]}
},
{
    timestamps:true
})
module.exports= mongoose.model("Credentials",newcredentials);