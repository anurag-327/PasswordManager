const CryptoJS=require("crypto-js");
const User = require("../model/user");
const {v4 : uuidv4} = require('uuid')
const Credentials=require("../model/credentials");
module.exports.addCredential=async(req,res) =>
{
    try
    {
        const {title,username,password}=req.body;
        const encryptedpassword=CryptoJS.AES.encrypt(password,process.env.CRYPTOJS_SEC_KEY).toString();
        const encryptedusername=CryptoJS.AES.encrypt(username,process.env.CRYPTOJS_SEC_KEY).toString();
        const tempcredential={title:title,username:encryptedusername,password:encryptedpassword,_id:uuidv4()};
        const usercredential= await Credentials.findOne({userId:req.user._id});
        if(usercredential)
        {
            var credentialsarray=usercredential.credentials;
            credentialsarray=[...credentialsarray,tempcredential];
            const newcredential= await Credentials.findByIdAndUpdate(usercredential._id,
                {credentials:credentialsarray},{new:true});
            return res.status(200).json(newcredential);
        }
        else
        {
            const newcredential=new Credentials({userId:req.user._id,credentials:[tempcredential]});
            const result =await newcredential.save();
            return res.status(200).json(result);
        }
    }catch(err)
    {
        // console.log(err);
        return res.status(500).json({status:500,message:err.message})

    }
}

module.exports.getCredentials= async(req,res) =>
{
    try{
        const usercredentials= await Credentials.findOne({userId:req.user._id}).select("credentials -_id");
        var credentialsarray=[];
        for (let i of usercredentials.credentials)
        {
            const decryptedpassword=CryptoJS.AES.decrypt(i.password,process.env.CRYPTOJS_SEC_KEY).toString(CryptoJS.enc.Utf8);
            const decryptedusername=CryptoJS.AES.decrypt(i.username,process.env.CRYPTOJS_SEC_KEY).toString(CryptoJS.enc.Utf8); 
            const tempcredential={_id:i._id,title:i.title,username:decryptedusername,password:decryptedpassword};
            credentialsarray=[...credentialsarray,tempcredential];
        }
        if(usercredentials)
        return res.status(200).json(credentialsarray);
    }catch(err)
    {
        return res.status(500).json({status:500,message:err.message})
    }
}

module.exports.getSingleCredential=async (req,res) =>
{
    try{
        const _id=req.query.id;
        if(_id)
        {
            const usercredentials= await Credentials.findOne({userId:req.user._id});
            var credentialsarray=[];
            for (let i of usercredentials.credentials)
            {
                if(i._id===_id)
                {
                    // const decryptedusername=CryptoJS.AES.decrypt(i.username,process.env.CRYPTOJS_SEC_KEY).toString(CryptoJS.enc.Utf8); 
                    const decryptedpassword=CryptoJS.AES.decrypt(i.password,process.env.CRYPTOJS_SEC_KEY).toString(CryptoJS.enc.Utf8);
                    // const tempcredential={title:i.title,username:decryptedusername,password:decryptedpassword};
                    credentialsarray=[...credentialsarray,decryptedpassword];
                }
            }
            if(credentialsarray.length>0)
            return res.status(200).json(credentialsarray);
            else
            return res.status(404).json({status:400,message:"Not Found"});
        }
        else
        {
            return res.status(404).json({status:404,message:"Try checking your query parameter"});
        }   
    }catch(err)
    {
        return res.status(500).json({status:500,message:err.message})
    }
}