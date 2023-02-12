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
        const _id=uuidv4();
        const tempcredential={title:title,username:encryptedusername,password:encryptedpassword,_id:_id};
        const originalcredential={title:title,username:username,password:encryptedpassword,_id:_id};
        const usercredential= await Credentials.findOne({userId:req.user._id});
        if(usercredential)
        {
            var credentialsarray=usercredential.credentials;
            credentialsarray=[...credentialsarray,tempcredential];
            const newcredential= await Credentials.findByIdAndUpdate(usercredential._id,
                {credentials:credentialsarray},{new:true});
            return res.status(200).json(originalcredential);
        }
        else
        {
            const newcredential=new Credentials({userId:req.user._id,credentials:[tempcredential]});
            const result =await newcredential.save();
            return res.status(200).json(originalcredential);
        }
    }catch(err)
    {
        // console.log(err);
        return res.status(500).json({status:500,message:err.message})

    }
}
module.exports.getUser=async(req,res) =>
{
    try{
        const user=await User.findById(req.user._id).select("username email profile -_id")
        if(user)
        {
            return res.status(200).json(user)
        }
        else
        {
            return res.status(404).json("User not found");
        }
    }catch(err)
    {
        
        return res.status(500).json(err.message);
    }
}
module.exports.getCredentials= async(req,res) =>
{
    try{
        const usercredentials= await Credentials.findOne({userId:req.user._id}).select("credentials -_id");
        if(usercredentials && usercredentials.credentials.length>0)
        {
            var credentialsarray=[];
            for (let i of usercredentials.credentials)
            {
                const decryptedpassword=CryptoJS.AES.decrypt(i.password,process.env.CRYPTOJS_SEC_KEY).toString(CryptoJS.enc.Utf8);
                const decryptedusername=CryptoJS.AES.decrypt(i.username,process.env.CRYPTOJS_SEC_KEY).toString(CryptoJS.enc.Utf8); 
                const tempcredential={_id:i._id,title:i.title,username:decryptedusername,password:i.password};
                credentialsarray=[...credentialsarray,tempcredential];
            }
            
            return res.status(200).json(credentialsarray);
        }
        else
        return res.status(404).json({status:400,message:"password do not exist"})
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

module.exports.deleteCredential=async(req,res) =>
{
    try
    {
        // console.log(req.params.id)
        // console.log(req.user._id)
        const data=await Credentials.findOne({userId:req.user._id}).select("credentials -_id");
        // console.log(data);
        const x=data.credentials.filter(item => item._id!==req.params.id)
        // console.log(x);
        const newcred=await Credentials.findOneAndUpdate({userId:req.user._id},{credentials:x},{new:true})
        return res.status(200).json("sucessfull");
    }catch(err)
    {
        return res.status(500).json({status:500,message:err.mesage});
    }
}
module.exports.decrypt= async (req,res) =>
{
    try{
        // console.log(req.body.password)
        const decryptedpassword=CryptoJS.AES.decrypt(req.body.password,process.env.CRYPTOJS_SEC_KEY).toString(CryptoJS.enc.Utf8);
        // console.log(decryptedpassword)
        return res.status(200).json(decryptedpassword);
    }catch(err)
    {
        return res.status(500).json({status:500,message:err.mesage});
    }
}
module.exports.encrypt= async (req,res) =>
{
    try{
        console.log(req.params.password)
        const decryptedpassword=CryptoJS.AES.encrypt(req.params.password,process.env.CRYPTOJS_SEC_KEY).toString(CryptoJS.enc.Utf8);
    }catch(err)
    {
        return res.status(500).json({status:500,message:err.mesage});
    }
}