import React ,{useContext, useState} from 'react' 
import { LockKeyOpen,Password,Vault,X,Eye } from 'phosphor-react'
import { Link } from 'react-router-dom'
import { UserContext } from '../Context/ContextApi'
import { addcredential } from '../helper/addcredential'
import { Toaster } from 'react-hot-toast';
import  toast  from 'react-hot-toast'
function Dashboard()
{
    const {user,currentPage,setCurrentPage,passwords,setPasswords}=useContext(UserContext)
    const [addPasswordBox,setAddPasswordBox]=useState(false);
    const [openVerification,setOpenVerification]=useState(false);
    const [toggleEye,setToggleEye]=useState(false)
    async function handleadd(e)
    {
        e.preventDefault();
        const data= new FormData(e.target);
        let {title,username,password}= Object.fromEntries(data.entries())
        if(addcredential(title,username,password)==true)
        {
            let options={
                method:"POST",
                headers:{
                    "content-type":"application/json",
                    "authorization":`Bearer ${user.token}`
                },
                body:JSON.stringify({title,username,password})
            }
            const response=await fetch("http://localhost:5000/api/services/addcredential",options);
            const newpass= await response.json();
            
            if(response.status===200)
            {
                toast.success("Sucessfully added")
                setPasswords([...passwords,newpass])
                setAddPasswordBox(false)
            }
        } 
        
    }
    return(
    <>
        <div className='w-[75%] sm:w-full  flex flex-col  overflow-hidden overflow-x-hidden gap-10 border sm:border-none rounded-tr-[4rem] p-8'>
        <Toaster position='top-center' reverseOrder />
        <div className=''>
            <h2 className=' font-bold text-3xl text-center sm:text-white'>DashBoard</h2>
        </div>
        <div className='flex sm:flex-col mt-5 flex-wrap md:flex-row  2xl:flex-row xl:flex-row justify-center w-full items-center   gap-10 m-auto'>
            <button onClick={() => {setAddPasswordBox(!addPasswordBox);setOpenVerification(true)}} className='w-[180px] sm:w-[80%] sm:h-[80px] sm:min-w-[100px]  h-[190px] p-2 flex flex-col gap-2 justify-center items-center aspect-auto hover:scale-105 transform transition duration-500 bg-gradient-to-r from-gray-300 rounded-2xl to-green-300'>
                 <LockKeyOpen className='' size={44} color="#000000" />
                 <h2 className=' text-center font-semibold'>Add a New Password</h2>
            </button>
            {
            addPasswordBox &&(<div className='w-[400px] md:hidden lg:hidden xl:hidden sm:max-w-[400px] sm:w-[100%] sm:p-1 p-5 border-2 border-gray-300 rounded-lg m-auto'>
            <div>
            <button  onClick={() => setAddPasswordBox(false)} className='float-right '><X size={30} color="#ffffff" /></button>
            </div>
            <form onSubmit={(e) => { e.preventDefault();handleadd(e)}} method="POST" className='flex flex-col gap-2 sm:mt-5 w-full  p-3'>
                <input autoComplete='off' autoCorrect='off' type="text" name="title" className='p-2 bg-gray-100 rounded-md border-2 border-gray-400 outline-none' placeholder='Title' />
                <input autoComplete='off' autoCorrect='off' type="text" name="username" className='p-2 bg-gray-100 rounded-md border-2 outline-none border-gray-400' placeholder='username'/>
                <div className='flex justify-between gap-1  items-center rounded-md border-2 border-red-400 bg-gray-100 '>
                    <input autoComplete='off' autoCorrect='off' type={toggleEye?("text"):("password")} name="password" className='p-2 rounded-md bg-gray-100 w-full  outline-none  ' placeholder='password' />
                    <Eye  className="cursor-pointer " size={20} onClick={() => setToggleEye(!toggleEye)} color="#000000"/>
                </div>
                <button className='bg-blue-600 text-white rounded-md p-2'>Add Password</button>
            </form>
        </div>)
        }
            <button onClick={() => setCurrentPage("password")} className='w-[180px] sm:w-[80%] sm:min-w-[100px] sm:h-[80px] h-[190px] p-2 flex flex-col gap-2 justify-center items-center aspect-auto hover:scale-105 transform transition duration-500 bg-gradient-to-r from-blue-100 rounded-2xl to-blue-200'>
                 <Vault  size={44} color="#000000" />
                 <h2 className=' text-center font-semibold'>My Passwords</h2>
            </button>
            <Link to="/#" onClick={() => toast.error("Feature Coming Soon")} className='w-[180px] sm:w-[80%] sm:h-[80px] sm:min-w-[100px] h-[190px] p-2 flex flex-col  gap-2 justify-center items-center aspect-auto hover:scale-105 transform transition duration-500 bg-gradient-to-r from-blue-100 rounded-2xl to-blue-200'>
                 <Password size={44} color="#000000" />
                 <h2 className=' text-center font-semibold'>Test your password</h2>
            </Link>
        </div>
        {
            addPasswordBox &&(<div className='w-[400px] sm:hidden sm:max-w-[500px] sm:w-[100%] sm:p-1 p-3 border-2 border-gray-300 rounded-lg m-auto'>
            <div>
            <button  onClick={() => setAddPasswordBox(false)} className='float-right '><X size={30} color="#000000" /></button>
            </div>
            <form onSubmit={(e) => { e.preventDefault();handleadd(e)}} method="POST" className='flex flex-col gap-2 sm:mt-5 w-full  p-3'>
                <input autoComplete='off' autoCorrect='off' type="text" name="title" className='p-2 bg-gray-100 rounded-md border-2 border-gray-400 outline-none' placeholder='Title' />
                <input autoComplete='off' autoCorrect='off' type="text" name="username" className='p-2 bg-gray-100 rounded-md border-2 outline-none border-gray-400' placeholder='username'/>
                <div className='flex justify-between gap-1  items-center rounded-md border-2 border-red-400 '>
                    <input autoComplete='off' autoCorrect='off' type={toggleEye?("text"):("password")} name="password" className='p-2 rounded-md bg-gray-100 w-full  outline-none  ' placeholder='password' />
                    <Eye  className="cursor-pointer " size={20} onClick={() => setToggleEye(!toggleEye)} color="#000000"/>
                </div>
                <button className='bg-blue-600 text-white mt-2 rounded-md p-2'>Add Password</button>
            </form>
        </div>)
        }
         
       
    </div>
   
    
    </>
    )
}
export default Dashboard