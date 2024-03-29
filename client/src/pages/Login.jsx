import { useFormik } from 'formik';
import React,{useEffect, useState} from 'react' 
import { Toaster } from 'react-hot-toast';
import avatar from "../assets/avatar.png"
import { useNavigate,useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast'
import { valiateLogin,validateSignup } from '../helper/validate';
import { setToBase64 } from '../helper/profileImageHandler';
import { getToken ,setToken} from '../helper/tokenHandler';
import { Eye } from 'phosphor-react';
import {BASE_URL,clientId,clientSecret,QUICKSIGN_API_URL,QUICKSIGN_URL} from "../base.js"
import Loader from "../components/Loader"
function Home()
{
    const navigate=useNavigate();
    const [profile,setProfile]=useState()
    const [login,setlogin]=useState(true);
    const [toggleEye,setToggleEye]=useState(false)
    const [loading,setLoading]=useState(false)
    const [searchParams]=useSearchParams();
    let status,token;
    for (const entry of searchParams.entries()) {
      const [param, value] = entry;
      if(param==="status")
      status=value;
      if(param==="token")
      token=value
    }
    const url=window.location.href;
    useEffect(() =>
    {
         if(status==="true" && token!=undefined)
         {
            (async function()
            {
                setLoading(true);
                let options={
                    method:"GET",
                    headers:{
                        "content-type":"application/json",
                        "authorization":`Bearer ${token}`
                    },
                }
                const response=await fetch(`${QUICKSIGN_API_URL}/api/data/getuser`,options);
                const data= await response.json();
                if(response.status===200 && data)
                {
                    console.log(data)
                    
                    let options={
                      method:"POST",
                      headers:{
                        "content-type":"application/json"
                      },
                      body:JSON.stringify({username:data.data.name,email:data.data.email,profile:data.data.profile})
                    }
                    const response=await fetch(`${BASE_URL}/api/auth/oauth`,options);
                    const result= await response.json();
                    if(response.status===200 && result)
                    {
                      setLoading(false);
                      setToken(result.token)
                      toast.success("Login successfull"); 
                      navigate("/home")
                    }
                    else
                    {
                        setLoading(false);
                        toast("failed to verify!")
                    }
                }
             }())
            }
            
    },[])

    
   
    async function handlelogin(e)
    {
        const data=new FormData(e.target);
        let {username,password}=Object.fromEntries(data.entries());
        if(valiateLogin(username,password)===true)
        {
            setLoading(true);
            let options={
                method:"POST",
                headers:{
                    "content-type":"application/json"
                },
                body:JSON.stringify({username:username,password:password})
            }
            const response=await fetch(`${BASE_URL}/api/auth/login`,options);
            const data= await response.json();
            if(response.status===200 && data)
            {
                setLoading(false);
                setToken(data.token)
                toast.success("Login successfull"); 
                navigate("/home")
            }
            else
            {
                setLoading(false)
                toast.error(`${data.message}`)
                navigate("/")
            }
        }
    }

    async function handlesignup(e)
    {
        
        const data=new FormData(e.target);
        const {username,email,password,confirmpassword}=Object.fromEntries(data.entries());
        if(validateSignup(username,email,password,confirmpassword,profile)===true)
        {
            setLoading(true);
            let options={
                method:"POST",
                headers:{
                    "content-type":"application/json"
                },
                body:JSON.stringify({username:username,email:email,password:password,profile:profile})
            }
            const response=await fetch(`${BASE_URL}/api/auth/register`,options);
            const data= await response.json();
            if(response.status===201 && data)
            {
                setLoading(false)
                setToken(data.token)
                toast.success("Registration successfull");
                navigate("/home");
            }
            else
            {
                toast.error(`${data.message}`)
                navigate("/")
            }
        }
    }
    async function uploadprofile(e)
    {
        const base64=await setToBase64(e.target.files[0])
        setProfile(base64)    
    }

    useEffect(()=>
    {
        if(getToken())
        {
            navigate("/home");
        }

    },[])
    return(
        <div className={`   ${login?"w-full mt-0":"w-full mt-0"} h-screen flex flex-col justify-center items-center  font-poppins  border  sm:bg-white sm:w-full     rounded-2xl `}>
        <Toaster position='top-center' reverseOrder />
        <div className="m-auto  sm:w-[100%] w-[30%] min-w-[350px] bg-white sm:border-none  border-gray-400 border sm:bg-white  rounded-2xl  flex flex-col p-4  gap-6">
            <div className="text-center font-bold text-4xl ">
                {
                    login?( <h2 className="loginheader"> Login</h2>):(<h2 className=" signupheader text-blue-600">REGISTER</h2> )
                }                      
                {
                    login?( <span className="m-auto text-sm text-gray-600">Welcome Back...</span>):(<span className=" m-auto text-sm text-gray-600">Secure by connecting with us</span> )
                }   
                {
                    
                }                   
            </div>
            
            {
            login?(<form  onSubmit={(e)=> {e.preventDefault();
             handlelogin(e)}} method="post">
            <div className="flex flex-col gap-5 w-full loginsection"> 
                <div>
                    <img className='w-[100px] border border-gray-800 rounded-full m-auto h-auto' src={avatar} alt="profile"/>
                    <div className='text-lg text-center mt-3 font-light'>
                        A vault to store all your credentials
                    </div>
                </div>
                <div> 
                    <input type="text" autoComplete='off' autoCorrect='off'  className="username border-2 w-full rounded-md p-2  outline-none" name="username" placeholder="Username"/>
                </div>
                <div className='flex items-center bg-white rounded-md border-2'>
                    <input type={toggleEye?("text"):("password")} autoComplete='off' autoCorrect='off'  className="passwordfield  w-[93%] rounded-md p-2  hover:resize-none outline-none " name="password" placeholder="password"/>
                    <Eye  className="cursor-pointer " size={20} onClick={() => setToggleEye(!toggleEye)} color="#000000"/>
                </div>
                <div className="checkboxfield">
                    <input type="checkbox" className="" checked/>
                    <label className=" ml-1">Remember Me</label>
                </div>
                <div className="text-center  rounded-lg text-white p-1">  
                    {
                        loading?( <Loader />):(<button className="signupbutton w-full block  px-2 py-3 text-lg bg-blue-700 rounded-md">Login</button>)
                    }    
                </div>
                <div id="loginfooter" className=" text-center mt-2 ">
                    <span className="msg">Not a member? <button onClick={() => setlogin(false)}  className=" signupswitchlink gignupbutton text-blue-500 underline">Register here</button></span>
                </div>
                <div className='text-center m-auto w-full mb-4'>
                    <h2 className='font-semibold text-lg'>OR</h2>
                    <a className='w-full  text-white py-2 flex gap-2 justify-center items-center bg-green-600 px-8 rounded-md' href={`${QUICKSIGN_URL}/auth?clientId=${clientId}&clientSecret=${clientSecret}&redirect_url=${url}`} target=""><img src="https://github.com/anurag-327/QuickSign/assets/98267696/41b1ac46-5372-40c1-b9ce-7beb15ba4659" alt="logo"/>Sign In with QuickSign</a> 
                </div>
            </div>
            </form>):(  <form onSubmit={(e)=>{e.preventDefault(); handlesignup(e)}} method="post">
            <div className="flex flex-col gap-3 w-full signupsection  ">
                <div>
                    <label htmlFor='profile'>
                         <img  src={profile || avatar }  className='w-[100px] object-cover border cursor-pointer border-gray-800 rounded-full m-auto h-auto' alt="profile"/>
                    </label>
                    <input onChange={uploadprofile} className='hidden' id="profile" name="profile" type="file"></input>
                    <div className='text-lg text-center mt-3 font-light'>
                        A vault to store all your credentials
                    </div>
                </div>
                <div> 
                    <input type="text" autoCorrect='off'  className="namefield  border-2 w-full rounded-md p-2 outline-none" name="username" placeholder="Name"/>
                </div>
                <div> 
                    <input type="text" autoCorrect='off'   className="emailfield border-2 w-full rounded-md p-2  outline-none" name="email" placeholder="Email Address"/>
                </div>
                <div className='flex items-center bg-white rounded-md border-2'>
                    <input type={toggleEye?("text"):("password")} autoComplete='off' autoCorrect='off'  className="passwordfield  w-[93%] rounded-md p-2  hover:resize-none outline-none " name="password" placeholder="password"/>
                    <Eye  className="cursor-pointer " size={20} onClick={() => setToggleEye(!toggleEye)} color="#000000"/>
                </div>
                <div>
                    <input type="password" autoCorrect='off'  className="confirmpasswordfield border-2 w-full  rounded-md p-2  hover:resize-none outline-none" name="confirmpassword" placeholder="confirm password"/>
                </div>
                <div className="checkboxfield">
                    <input type="checkbox" className="" />
                    <label className="text-blue-500 cursor-pointer">I accept Terms and Conditions</label>
                </div>
                <div className="text-center  rounded-lg text-white mt-2 p-1">  
                {
                    loading?(<Loader />):(<button className="signupbutton w-full block  px-2 py-3 text-lg bg-blue-700 rounded-md">REGISTER</button>)
                }         
                </div>
                <div id="loginfooter" className=" text-center mt-2 ">
                    <span className="msg">Already a member ? <button onClick={() => setlogin(true)}  className=" signupswitchlink gignupbutton text-blue-500 underline">Login</button></span>
                </div>
                <div className='text-center w-full m-auto mb-4'>
                    <h2 className='font-semibold text-lg'>OR</h2>
                    <a className='w-full  text-white py-2 flex gap-2 justify-center items-center bg-green-600 px-8 rounded-md' href={`${QUICKSIGN_URL}/auth?clientId=${clientId}&clientSecret=${clientSecret}&redirect_url=${url}`} target=""><img src="https://github.com/anurag-327/QuickSign/assets/98267696/41b1ac46-5372-40c1-b9ce-7beb15ba4659" alt="logo"/>Sign In with QuickSign</a> 
                </div>
            </div>
            </form>)
            }          
                
        </div>
        
    </div>
    )
}
export default Home