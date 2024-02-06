import React from 'react'
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate=useNavigate();
  return (
    <div className='navHeight'>
      <div className='nav1'>
        Online Members
      </div>
      <div className='nav2'>
        Messages
      </div>
      <div className='nav3' onClick={()=>{localStorage.removeItem("user"); navigate('/')}}>
        Logout
      </div>
    </div>
  )
}

export default Navbar
