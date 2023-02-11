
import  toast  from "react-hot-toast";

import { verifyUsername,verifyPassword,verifyconfirmPassword ,verifyEmail,checkPasswordStrength } from "./verify";

export async function valiateLogin(username,password)
{
    if(verifyUsername(username)===true && verifyPassword(password)===true)
    {
        let options={
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify({username:username,password:password})
        }
        const response=await fetch("http://localhost:5000/api/auth/login",options);
        const data= await response.json();
        if(response.status===200 && data)
        {
            toast.success("Login successfull");
        }
        else
        {
            toast.error(`${data.message}`)
        }
    }
}

export async function validateSignup(username,email,password,confirmpassword)
{
    if(verifyUsername(username)===true && verifyEmail(email) && verifyPassword(password)===true && verifyPassword(confirmpassword) && verifyconfirmPassword(password,confirmpassword) && checkPasswordStrength(password) )
    {
        console.log(username)
        let options={
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify({username:username,email:email,password:password})
        }
        const response=await fetch("http://localhost:5000/api/auth/register",options);
        const data= await response.json();
        if(response.status===201 && data)
        {
            toast.success("Registration successfull");
        }
        else
        {
            toast.error(`${data.message}`)
        }
        
    }
}