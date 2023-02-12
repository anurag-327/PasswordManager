import React,{useState,useContext} from 'react'
import { UserContext } from '../Context/ContextApi.jsx'
import { removeToken } from '../helper/tokenHandler'
import { useNavigate, Link } from 'react-router-dom' 
import avatar from "../assets/avatar.png"
import toast from "react-hot-toast"
import { Toaster } from 'react-hot-toast'
function Navbar()
{
    const navigate=useNavigate();
    const {user,currentPage,setCurrentPage}=useContext(UserContext)
    const [openDrawer,setOpenDrawer]=useState(false)
    return(
    <>
     <Toaster position='top-center' reverseOrder />
    <nav className="mx-auto hidden  sm:block justify-between   w-full max-w-screen-xl  border border-white/80 bg-white bg-opacity-80 py-2 px-6 text-black shadow-md backdrop-blur-2xl backdrop-saturate-200 lg:px-8 lg:py-4">
        <div className='flex justify-between'>
            <div className='  flex justify-start items- gap-2'>
                <img className='w-10 aspect-square rounded-full' src={user.data.profile || avatar} alt="profile"/>
                <div className='flex flex-col text-center'>
                   <span className='font-semibold'>{user.data.username}</span>
                   <span className='text-sm  font-light overflow-hidden'>{user.data.email}</span>
                </div>
            </div>
            <button onClick={() => setOpenDrawer(!openDrawer)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
                </svg>
            </button>

        </div>

        {
         openDrawer&&
        <ul className='flex font-semibold   rounded-md to-red-200  mt-3 flex-col text-center'>
                <button onClick={()=> setCurrentPage("dashboard")} className=' p-1 ' >Dashboard</button>
                <button onClick={()=> setCurrentPage("password")} className=' p-1 '>Passwords</button>
                <button onClick={()=> setCurrentPage("dashboard")} className=' p-1 '>Settings</button>
                <Link onClick={() => toast.error("Feature Coming Soon")} to="#" className=' p-1 '>Generate Password</Link>
                <button onClick={() => {removeToken(); navigate("/")}} className=' p-1 text-blue-600 underline '>LogOut</button>
        </ul>
        }
        <div>

        </div>

   </nav>

        
    </>
    )
}
export default Navbar