import React,{useContext,useState,useEffect} from 'react' 
import Sidebar from '../components/Sidebar.jsx'
import Dashboard from "../components/Dashboard.jsx"
import PasswordPage from '../components/Password.jsx'
import { UserContext } from '../Context/ContextApi.jsx'
import { getToken } from '../helper/tokenHandler.js'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import ClipLoader from "react-spinners/ClipLoader";

function Home()
{
  const navigate=useNavigate();
  const {user,currentPage,setCurrentPage}=useContext(UserContext)
  useEffect(() =>
  {
      if(!getToken())
      {
        navigate("/");
      }
    },[user])
    useEffect(()=>
    {

    },[user])
    return(
      <> 
      {
        user!=undefined ?(<div className='flex sm:flex-col relative gap-10 sm:p-0 p-10'>    
        <Sidebar />
        <Navbar />
        {
            currentPage!="password"?<Dashboard />:<PasswordPage />
        }
        </div>):(<div className='flex  flex-col justify-center items-center w-[100vw] h-[95vh]'><ClipLoader
        color="#000000"
        loading="true"
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      <span className='font-bold yext-center  text-3xl'>Please wait while we get things ready</span></div>)
      } 
    
    </>
    )
}
export default Home