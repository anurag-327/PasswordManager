import React,{useState,useEffect,useContext,createContext} from "react";
export const UserContext=createContext();
import {getToken} from "../helper/tokenHandler"
export default function ContextProvider({children})
{
    const [user,setUser]=useState();
    const [passwords,setPasswords]=useState([]);
    const [currentPage,setCurrentPage]=useState("dashboard");

    useEffect(() =>
    {
        const token=getToken();
        if(token)
        {
            ( async function()
            {
             let options={
                 method:"GET",
                 headers:{
                     "authorization":`Bearer ${token}`
                 },
             }
             const response=await fetch("http://localhost:5000/api/services/getuser",options);
             const data= await response.json();
             if(response.status===200 && data)
             {
                 setUser({data,token})
             }
             const response2= await fetch("http://localhost:5000/api/services/getcredentials",options);
             const pass= await response2.json();
             if(response2.status===200)
             {
                 setPasswords(pass);
             }
         }())
        }
       

    },[])
    useEffect(() =>{
        
    },[user])
    return(<UserContext.Provider value={{user,currentPage,setCurrentPage,passwords,setPasswords}}>{children}</UserContext.Provider>)
}
