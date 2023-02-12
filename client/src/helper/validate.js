import  toast  from "react-hot-toast";
import { verifyUsername,verifyPassword,verifyconfirmPassword ,verifyEmail,checkPasswordStrength } from "./verify";
import { setToken } from "./tokenHandler";
import { setToBase64 } from "./profileImageHandler";
// import { useNavigate } from "react-router-dom";
export  function valiateLogin(username,password)
{
    // const navigate=useNavigate();
    if(verifyUsername(username)===true && verifyPassword(password)===true)
    {
        return true;
    }
}

export  function validateSignup(username,email,password,confirmpassword,profile)
{
    if(verifyUsername(username)===true && verifyEmail(email) && verifyPassword(password)===true && verifyPassword(confirmpassword) && verifyconfirmPassword(password,confirmpassword) && checkPasswordStrength(password) )
    {
        return true; 
    }
}