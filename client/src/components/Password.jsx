import React,{useContext, useState} from 'react' 
import { LockKeyOpen,Password,Vault,X } from 'phosphor-react'
import SinglePassword from './SinglePassword'
import { UserContext } from '../Context/ContextApi'
import  toast  from 'react-hot-toast'
import { Toaster } from 'react-hot-toast'
import {BASE_URL} from "../base"
function PasswordPage()
{
    const {user,currentPage,setCurrentPage,passwords,setPasswords}=useContext(UserContext);
    const [globalverification,setGlobalVerification]=useState(false)
    const [openVerification,setOpenVerification]=useState(true)
    async function handleverification(e)
    {
        
        const data= new FormData(e.target);
        const {password}=Object.fromEntries(data.entries());
        let options={
            method:"POST",
            headers:{
                "content-type":"application/json",
                authorization:`Bearer ${user.token}`
            },
            body:JSON.stringify({password})
        }
        const response=await fetch(`${BASE_URL}/api/auth/validate`,options)
        const status= await response.json();
        if(response.status===200)
        {
            toast.success("Verified....")
            // setVerificationStatus(true)
            setOpenVerification(false)
        } 
        else if(response.status===403)
        {
            toast.error("Verification Failed....")
        }
        else
        {
            toast.error("Server Error Retry")
        }
    }

    return(
    <>
   <Toaster position='top-center' reverseOrder />
    
    
        {
            openVerification ? (<div className='absolute top-0 left-0 w-[100%] sm:h-[100vh]  h-[100%] bg-[#333] opacity-95 z-10'>
            <div>
                <button className=' absolute right-[40px] top-[30px] font-bold' onClick={() => {setOpenVerification(false); setCurrentPage("dashboard")}}><X  size={44} color="#ffffff" /></button>
            </div>
                <form onSubmit={(e) => { e.preventDefault();handleverification(e)}} method="POST" className=' w-[300px]  rounded-md bg-white absolute sm:top-[50%] top-[40%] bottom-30%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col gap-3  p-3'>
                    <input autoComplete='off' autoCorrect='off' type="password" name="password" className='p-2 bg-gray-100 rounded-md border-2 outline-none  border-red-600' placeholder='password' />
                    <button className='bg-blue-600 text-white rounded-md p-2'>Verify</button>
                    <h2 className=' text-center text-red-600'>! Password Verification is required to access your passwords</h2>
                </form>
        </div>):(<div className='w-[75%] sm:w-[100%] sm:rounded-none sm:border-0  flex flex-col overflow-auto  gap-10 border-2 rounded-tr-[4rem] sm:p-6 p-4'>
        <button onClick={()=> setCurrentPage("dashboard")} className='hidden sm:block font-bold text-white'>👈Back</button>
            <div className=''>
                <h2 className=' font-bold text-3xl sm:text-white'>Passwords</h2>
            </div>
            <h1 className='font-semibold text-lg font-poppins sm:text-white'>My Passwords</h1>
            <div className='flex p-5 sm:p-0  flex-col  gap-2 scrollbar-default overflow-auto  sm:h-full   '>
                {    
                    passwords.length>0?( passwords.map( item => <SinglePassword item={item} key={item._id} /> )):(<h1 className='m-auto font-bold text-2xl'>You do not have any saved passwords</h1>)
                }
                 
            </div>
        </div>)
        }
    
    </>
    )
}
export default PasswordPage