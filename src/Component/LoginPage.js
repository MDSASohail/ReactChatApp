import axios from 'axios';
import GoogleLoginPage from './GoogleLogin';
import React, { useRef, useState } from 'react'
import {useNavigate,Link}  from 'react-router-dom'
function LoginPage() {

    const email=useRef();
    const password=useRef();
    
    const passwordAgain=useRef();
    const navigate=useNavigate();
    const [error,setError]=useState(false);
    const [incorrectPass,setIncorrectPass]=useState(false);
    
      async function updatePassword()
       {
        
        

        
        if(password.current.value!==passwordAgain.current.value)
        {
            
            alert("Password must be same")
            return;
        }
        
        const data={
             fullName:JSON.parse(localStorage.getItem("user")),
             email:email.current.value,
             password:password.current.value
        }
        console.log("Daved data is ",data);
        return;


        try {

          //Deployed
            // const savedData=await axios.post('https://chat-app-node-gamma.vercel.app/user/',data);

            //Local
            const savedData=await axios.post('http://localhost:8000/user/',data);
            // console.log("Saved data is ",savedData.data)
            localStorage.setItem("user",JSON.stringify(savedData.data))
            navigate('/')
        } catch (error) {
            console.log(error.message)
        }
       }
   
    const handle=async(e)=>{
        e.preventDefault();
        
        if(incorrectPass)
        {
          return;
        }
        console.log("Handler")
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

          //Deploy
          // const data=await axios.post('https://chat-app-node-gamma.vercel.app/user/get',userData);

          //Local
          const data=await axios.post('http://localhost:8000/user/get',userData);
          console.log(data.data)
          localStorage.setItem("user",JSON.stringify(data.data));
          navigate('/') //Navigating to the home page
        } catch (error) {
          console.log("Error is ",error.response.data)
          setError(error.response.data.result);
          // if(error.response.data.result==="Please, set a password")
          //            localStorage.setItem('user',JSON.stringify(error.response.data.user))
          //   setIncorrectPass(true);
        }

    }
  return (
    <div className='loginMainDiv'>
      <Link to={'/reset'}>
      <button className='absolute p-2 rounded-md top-2 right-2 transition-colors hover:bg-slate-400'>
         Reset Password
      </button>
      </Link>
      <h1 className="center">Welcome to Online ChatApp</h1>
      <div className='formMainDiv'>
        <form onSubmit={(e)=>{handle(e)}}>
            <div className='formInput'>
                
                <input type='email' ref={email} placeholder='Enter username' disabled={incorrectPass?true:false} />
            </div>
            <div  className='formInput'>
                
                <input type='password' ref={password} placeholder='Enter Password' disabled={incorrectPass?true:false}/>
            </div>
            {error&&<div>{error}</div>}
           
             <button type='submit' className='registerDiv' >Login</button>
            <GoogleLoginPage/>

            

    
            <Link to={'/register'} className='removeDec'>
              <div className='registerDiv'>Register</div>
            </Link>
        </form>
      </div>
    </div>
  )
}


export default LoginPage
