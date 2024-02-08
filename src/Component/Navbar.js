import React from 'react'
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate=useNavigate();
  const user=JSON.parse(localStorage.getItem("user"))|| null;
  // console.log("User in navbar is ",user)
  return (
    <div className='navHeight'>
      <div className='nav1'>
        Online Members
      </div>
      <div className='nav2'>
       Welcome {user?.fullName}
        
      </div>
      <div className='nav3' onClick={()=>{localStorage.removeItem("user"); window.location.reload();}}>
        Logout
      </div>
    </div>
  )
}

export default Navbar
