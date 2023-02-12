import React,{useContext} from 'react' 
import avatar from "../assets/avatar.png"
import {Keyhole, Vault,House,GearSix,Lock} from "phosphor-react"
import { UserContext } from '../Context/ContextApi.jsx'
import { removeToken } from '../helper/tokenHandler'
import { useNavigate,Link } from 'react-router-dom'
import toast  from 'react-hot-toast'
import { Toaster } from 'react-hot-toast'
function Sidebar()
{
  const navigate=useNavigate();
  const {user,currentPage,setCurrentPage}=useContext(UserContext)
  
  return(
  <div className='  sm:hidden w-[18%] min-w-[260px] flex flex-col    bg-gradient-to-t rounded-tl-[4rem] from-gray-50 to-gray-100 p-2  '>
     <Toaster position='top-center' reverseOrder />
      <div className='w-[100%] relative  flex flex-col text-white rounded-tl-[4rem] aspect-square bg-blue-800'>
        <div className=' flex gap-2 relative  m-auto items-center '>
               <Keyhole size={44} color="#f3eded" />
               <h2 className='inline-block font-bold'> MY Vault</h2>    
        </div>
        <div className=' m-auto flex flex-col justify-center items-center gap-2'>
          <img className='w-16 aspect-square rounded-full' src={user.data.profile || avatar} alt="profile"/>
          <div className='flex flex-col text-center'>
              <span>{user.data.username}</span>
              <span className='text-sm font-light overflow-hidden'>{user.data.email}</span>
          </div>
        </div>
      </div>
      <div className='relative flex gap-3 flex-col mt-10'>
        <button onClick={() => setCurrentPage("dashboard")} className='rounded-lg shadow-md hover:text-blue-800 font-semibold bg-gray-200 p-2 '> <House className="inline-block mr-2" size={20} color="#000000" />Dashboard</button>
        <button onClick={() => setCurrentPage("password")} className='rounded-lg shadow-md hover:text-blue-800 font-semibold bg-gray-200 p-2  '> <Vault className='inline-block mr-2' size={20} color="#000000" />Passwords</button>
        {/* <button onClick={() => setCurrentPage("dashboard")} className='rounded-lg shadow-md hover:text-blue-800 font-semibold bg-gray-200 p-2 '> <GearSix className="inline-block mr-2" size={20} color="#000000" />Settings</button> */}
      </div>
      <div className=' mt-28 flex flex-col'>
        <Link to="#" onClick={() => toast.error("Feature Coming Sonn")} className='rounded-lg shadow-2xl  font-semibold text-white bg-gray-800 p-2 '><Lock className="inline-block mr-2" size={20} color="#f3eded" />Generate Password</Link>
      </div>
      <div className='mt-5 flex mx-auto'>
        <button onClick={() => {removeToken(); navigate("/")}} className=' font-semibold text-blue-700 m-auto'>Log Out</button>
      </div>
  </div>
  )
}
export default Sidebar