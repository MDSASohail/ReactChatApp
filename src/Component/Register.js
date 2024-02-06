import React, { useRef } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
 function Register() {

    const email=useRef();
    const password=useRef();
    const passwordAgain=useRef();
    const navigate=useNavigate();
    const fullName=useRef();
    const handle=async(e)=>{
        e.preventDefault();
        // console.log(password.current.value)
        //     console.log(passwordAgain.current.value)

        
        if(password.current.value!==passwordAgain.current.value)
        {
            // console.log("Password Not same")
            alert("Password must be same")
            return;
        }
        
        const data={
             fullName:fullName.current.value,
             email:email.current.value,
             password:password.current.value
        }


        try {
            const savedData=await axios.post('http://localhost:8000/user/',data);
            // console.log("Saved data is ",savedData.data)
            localStorage.setItem("user",JSON.stringify(savedData.data))
            navigate('/')
        } catch (error) {
            console.log(error.message)
        }
    }
  return (
    <div className='loginMainDiv'>
      <h1 className="center">Welcome to Online ChatApp</h1>
      <div className='formMainDiv'>
        <form onSubmit={(e)=>{handle(e)}}>
        <div className='formInput'>
                
                <input type='text' ref={fullName} placeholder='Enter Full Name' />
            </div>
            <div className='formInput'>
                
                <input type='email' ref={email} placeholder='Enter username' />
            </div>
            <div  className='formInput'>
                
                <input type='password' ref={password} placeholder='Enter Password' />
            </div>
            <div  className='formInput'>
                
                <input type='password' ref={passwordAgain} placeholder='Conform Password' />
            </div>
            <button type='submit' className='registerDiv'>Register</button>
            <Link to={'/login'} className='removeDec'>
              <div className='registerDiv'>Sing In</div>
            </Link>
        </form>
      </div>
    </div>
  )
}

export default Register

