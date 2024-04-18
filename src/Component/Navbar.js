import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate=useNavigate();
  const user=JSON.parse(localStorage.getItem("user"))|| null;
  // console.log("User in navbar is ",user)
  const [deletion, setDeletion]=useState(false)
  
    const deleteHandle=async ()=>
    {
        const id=user._id;
        console.log("to delete the user", id)
         try {
            const deltedUser=await axios.delete('http://localhost:8000/user/',{data:{userId:id}});
            
            console.log("Result is ",deltedUser.data);
            localStorage.removeItem("user");
            window.location.reload()
         } catch (error) {
            console.log("Error in deleitn user ");
         } 
    }
  return (
    <div>
          {deletion && <div className="absolute flex justify-center items-center border-2 bg-slate-300 h-screen w-screen">
           <div className=' w-96 h-96 border-2 flex justify-center items-center flex-col'>
              <p>Confirm Deletion</p>
                <div>
                <button onClick={deleteHandle} className='p-2 m-4 border-2 bg-blue-300'>Yes</button>
                <button onClick={()=>{setDeletion(false)}} className='p-2 m-4 border-2 bg-blue-300'>No</button>
                </div>
           </div>
       </div>}
    <div className='navHeight '>
       
      <div className='nav1'>
        MDSA
      </div>
      <div className='nav2'>
       Welcome {user?.fullName}
        
      </div>
      <div>
         <button onClick={()=>{setDeletion(true)}}>Delete</button>
      </div>
      <button className='nav3' onClick={()=>{localStorage.removeItem("user"); window.location.reload();}}>
        Logout
      </button>
    </div>
    </div>
  )
}

export default Navbar
