import React,{useContext, useEffect, useState} from 'react' 
import { UserContext } from '../Context/ContextApi'
import { Eye,X,EyeSlash } from 'phosphor-react'
import {toast} from 'react-hot-toast'
import { Toaster } from 'react-hot-toast';
import {BASE_URL} from "../base"
function SinglePassword({item})
{
    const {user,passwords,setPasswords}=useContext(UserContext)
    const [openVerification,setOpenVerification]=useState(false);
    const [currentPassword,setCurrentPassword]=useState(item.password)
    const [verificationStatus,setVerificationStatus]=useState(false)
    async function removecredential(_id)
    {
        
        let options={
            method:"DELETE",
            headers:{
                "authorization":`Bearer ${user.token}`
            }
        }
        const response=await fetch(`${BASE_URL}/api/services/deletecredential/${_id}`,options);
        const newcred= await response.json();
        if(response.status===200)
        {
            setPasswords(passwords)
            setPasswords(passwords.filter(item => item._id!== _id));
            toast.success("Deleted Successfully")
        }
        else
        {
            toast.error("could not delete the credetials")
        }
    }
    async function decryptpassword(e)
    {
            let options2={
                method:"POSt",
                headers:{
                    "content-type":"application/json",
                    authorization:`Bearer ${user.token}`
                },body:JSON.stringify({password:currentPassword})
            }
            const decrypt=await fetch(`${BASE_URL}/api/services/decrypt`,options2);
            const decryptedpassword= await decrypt.json();
            if(decrypt.status===200)
            {
                toast.success("decrypted...");
                setCurrentPassword(decryptedpassword)
                setVerificationStatus(true)
            }
    }

    function encryptpassoword()
    {
        toast.success("encrypted")
        setVerificationStatus(false)
        setCurrentPassword(item.password)
    }
    return(
        <>
      
     <div className='flex flex-col sm:flex-col p-2 sm:bg-gradient-to-r sm:from-blue-200 sm:to-pink-200 re justify-between w-full border shadow-md rounded-lg'>
        <Toaster position='top-center' reverseOrder />
        
         <span className='p-2 sm:rounded-none rounded-md font-bold bg-gray-50 w-[20%] sm:w-[100%] '>{item.title}</span>
         <span className='p-2 sm:rounded-none rounded-md bg-gray-50 w-[30%] sm:w-[100%]'>{item.username}</span>
         <div className='p-2 sm:rounded-none rounded-md bg-gray-50 w-[50%] sm:w-[100%] flex item-center justify-between '>
             <input type={verificationStatus?"text":"password"}  className='outline-none ' readOnly value={currentPassword} />
             {
                verificationStatus?(<button onClick={() => encryptpassoword()}  ><Eye  size={30} color="#000000" /></button>):(<button onClick={() => decryptpassword()}  ><EyeSlash size={30} color="#000000" /></button>)
             }
             <div>
                 <button onClick={() => removecredential(item._id)} title="remove credential.." className='transition duration-150 ease-in-out' data-bs-toggle="tooltip" data-bs-placement="top"><X className='mt-2' size={20} color="#000000" /></button>
             </div>       
         </div>     
    </div>  
    </>

    )
}
export default SinglePassword