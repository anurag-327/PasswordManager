import React,{useContext, useState} from 'react' 
import { LockKeyOpen,Password,Vault,X } from 'phosphor-react'
import SinglePassword from './SinglePassword'
import { UserContext } from '../Context/ContextApi'
import  toast  from 'react-hot-toast'
import { Toaster } from 'react-hot-toast'
import {BASE_URL} from "../base"
import Loader from './Loader'
function PasswordPage()
{
    const {user,currentPage,setCurrentPage,passwords,setPasswords}=useContext(UserContext);
    const [globalverification,setGlobalVerification]=useState(false)
    const [openVerification,setOpenVerification]=useState(true)
    const [loading,setLoading]=useState(false);
    async function handleverification(e)
    {
        
        const data= new FormData(e.target);
        const {password}=Object.fromEntries(data.entries());
        setLoading(true);
        let options={
            method:"POST",
            headers:{
                "content-type":"application/json",
                authorization:`Bearer ${user.token}`
            },
            body:JSON.stringify({password:password})
        }
        const response=await fetch(`${BASE_URL}/api/auth/validate`,options)
        const status= await response.json();
        if(response.status===200)
        {
            setLoading(false)
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
            setLoading(false)
            toast.error("Server Error Retry")
        }
    }

    return(
    <>
   <Toaster position='top-center' reverseOrder />
    
    
    
            <div className='w-[75%] sm:w-[100%] sm:rounded-none sm:border-0  flex flex-col overflow-auto  sm:gap-2 border-2 rounded-tr-[4rem] sm:p-2 p-4'>
        <button onClick={()=> setCurrentPage("dashboard")} className='hidden sm:block font-bold text-black'>Back</button>
            <div className=''>
                <h2 className=' font-bold text-3xl sm:text-white'>Passwords</h2>
            </div>
            <h1 className='font-semibold text-lg font-poppins sm:text-white'>My Passwords</h1>
            <div className='flex p-5 sm:p-0  flex-col  gap-2 scrollbar-default overflow-auto  sm:h-full   '>
                {    
                    passwords.length>0?( passwords.map( item => <SinglePassword item={item} key={item._id} /> )):(<h1 className='m-auto font-bold text-2xl'>You do not have any saved passwords</h1>)
                }
                 
            </div>
        </div>
    
    </>
    )
}
export default PasswordPage