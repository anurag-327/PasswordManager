import React from 'react' 
import { LockKeyOpen,Password,Vault } from 'phosphor-react'
import SinglePassword from './SinglePassword'
function PasswordPage()
{
    return(
    <div className='relative w-[100%] h-[95vh] flex justify-center items-center'>
    <div className=' flex flex-col  justify-center items-center  gap-10 border-2 rounded-[4rem] p-10'>
        <div className=''>
            <h2 className=' font-bold text-3xl'>Test Your Password</h2>
        </div>
        
        <div className='flex p-5 w-full flex-col  items-center  gap-10 scrollbar-default  overflow-auto  '>
             <input className='bg-gray-200 p-4 rounded-lg w-[60%] ' type="text" placeholder='Enter password to check its strength' />
             <button className='bg-blue-800 text-white p-2 w-[20%] rounded-lg'>Check</button>
             <div>
                <span className='text-red-700 font-semibold'>Weak Password !</span>
             </div>
        </div>
        <div className='mx-10'>
            <h1 className='text-2xl font-bold text-red-600 mb-2'>How is weak and strong password defined?</h1>
            <div>
                <h3 className='inline-block font-bold'> Strong Password : </h3>
                <span>A strong password is a long combination of unique characters that is difficult for other people to guess or technology to crack.</span>
            </div>
            <div>
                <h3 className='inline-block font-bold'> Weak Password : </h3>
                 <span>A weak password is a character combination that is easy for friends, bad actors or password-hacking software to guess.</span>
            </div>
                
        </div>
    </div>
    </div>
    )
}
export default PasswordPage