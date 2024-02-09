import axios from 'axios';
import React, { useRef, useState } from 'react'
import {useNavigate,Link}  from 'react-router-dom'
function LoginPage() {

    const email=useRef();
    const password=useRef();
    const navigate=useNavigate();
    const [error,setError]=useState(false);
    const handle=async(e)=>{
        e.preventDefault();
        // console.log(email.current.value)
        // console.log(password.current.value)
        if(email.current.value=="" || password.current.value=="")
        {
           alert("All fields are mondatory");
           return;
        }

        const userData={
          email:email.current.value,
          password:password.current.value
        }
        
        try {
          const data=await axios.post('https://chat-app-node-gamma.vercel.app/user/get',userData);
          // console.log(data.data)
          localStorage.setItem("user",JSON.stringify(data.data));
          navigate('/') //Navigating to the home page
        } catch (error) {
          console.log("Error is ",error.response.data.result)
          setError(error.response.data.result);
        }

    }
  return (
    <div className='loginMainDiv'>
      <h1 className="center">Welcome to Online ChatApp</h1>
      <div className='formMainDiv'>
        <form onSubmit={(e)=>{handle(e)}}>
            <div className='formInput'>
                
                <input type='email' ref={email} placeholder='Enter username' />
            </div>
            <div  className='formInput'>
                
                <input type='password' ref={password} placeholder='Enter Password' />
            </div>
            {error&&<div>{error}</div>}
            <button type='submit' className='registerDiv' >Login</button>
            <Link to={'/register'} className='removeDec'>
              <div className='registerDiv'>Register</div>
            </Link>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
