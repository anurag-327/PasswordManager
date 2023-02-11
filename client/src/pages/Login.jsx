import { useFormik } from 'formik';
import React,{useState} from 'react' 
import { Toaster } from 'react-hot-toast';
import avatar from "../assets/avatar.png"
import toast from 'react-hot-toast'
import { valiateLogin,validateSignup } from '../helper/validate';
function Home()
{
    const [login,setlogin]=useState(true);
    function handlelogin(e)
    {
        const data=new FormData(e.target);
        let {username,password}=Object.fromEntries(data.entries());
        valiateLogin(username,password)
    }

    function handlesignup(e)
    {
        const data=new FormData(e.target);
        const {username,email,password,confirmpassword}=Object.fromEntries(data.entries());
        validateSignup(username,email,password,confirmpassword);
    }
    return(
        <div className=" m-auto mt-24  w-[25%] font-poppins  border min-w-[350px]   bg-gray-200 rounded-2xl ">
            <Toaster position='top-center' reverseOrder />
        <div className="m-auto shadow-md  rounded-2xl flex flex-col p-4  gap-6">
            <div className="text-center font-bold text-4xl ">
                {
                    login?( <h2 className="loginheader"> Login</h2>):(<h2 className=" signupheader text-blue-600">REGISTER</h2> )
                }                      
                {
                    login?( <span className="m-auto text-sm text-gray-600">Welcome Back...</span>):(<span className=" m-auto text-sm text-gray-600">Secure by connecting with us</span> )
                }                      
            </div>
            
            {
            login?(<form  onSubmit={(e)=> {e.preventDefault();
             handlelogin(e)}} method="post">
            <div className="flex flex-col gap-3 w-full loginsection"> 
                <div>
                    <img className='w-[150px] border border-gray-800 rounded-full m-auto h-auto' src={avatar} alt="profile"/>
                </div>
                <div> 
                    <input type="text"  className="username border-2 w-full rounded-md p-1 border-gray-400 hover:border-orange-400 outline-none" name="username" placeholder="Username"/>
                </div>
                <div>
                    <input type="password"  className="passwordfield border-2 w-full rounded-md p-1 border-gray-400 hover:border-orange-400 hover:resize-none outline-none" name="password" placeholder="password"/>
                </div>
                <div className="checkboxfield">
                    <input type="checkbox" className="" />
                    <label className="">Remember Me</label>
                </div>
                <div className="text-center  rounded-lg text-white p-1">  
                    <button className="signupbutton w-full block  p-2 bg-blue-700 rounded-md">Login</button>
                </div>
                <div id="loginfooter" className=" text-center mt-4 ">
                    <span className="msg">Not a member? <button onClick={() => setlogin(false)}  className=" signupswitchlink gignupbutton text-blue-500 underline">Register here</button></span>
                </div>
            </div>
            </form>):(  <form onSubmit={(e)=>{e.preventDefault(); handlesignup(e)}} method="post">
            <div className="flex flex-col gap-3 w-full signupsection  ">
                <div>
                    <img className='w-[120px] border border-gray-800 rounded-full m-auto h-auto' src={avatar} alt="profile"/>
                </div>
                <div> 
                    <input type="text"  className="namefield  border-2 w-full rounded-md p-1 border-gray-400 hover:border-orange-400  outline-none" name="username" placeholder="Name"/>
                </div>
                <div> 
                    <input type="text"  className="emailfield border-2 w-full rounded-md p-1 border-gray-400 hover:border-orange-400 outline-none" name="email" placeholder="Email Address"/>
                </div>
                <div>
                    <input type="password"  className="passwordfield border-2 w-full rounded-md p-1 border-gray-400 hover:border-orange-400 hover:resize-none outline-none" name="password" placeholder="password"/>
                </div>
                <div>
                    <input type="password"  className="confirmpasswordfield border-2 w-full  rounded-md p-1 border-gray-400 hover:border-orange-400 hover:resize-none outline-none" name="confirmpassword" placeholder="confirm password"/>
                </div>
                <div className="checkboxfield">
                    <input type="checkbox" className="" />
                    <label className="text-blue-500 cursor-pointer">I accept Terms and Conditions</label>
                </div>
                <div className="text-center  rounded-lg text-white mt-2 p-1">  
                        <button className="signupbutton w-full block  p-2 bg-blue-700 rounded-md">REGISTER</button>
                </div>
                <div id="loginfooter" className=" text-center mt-4 ">
                    <span className="msg">Already a member ? <button onClick={() => setlogin(true)}  className=" signupswitchlink gignupbutton text-blue-500 underline">Login</button></span>
                </div>
            </div>
            </form>)
            }          
                
        </div>
        
    </div>
    )
}
export default Home