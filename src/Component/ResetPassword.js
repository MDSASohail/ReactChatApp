import axios from 'axios';
import React, { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import { useNavigate } from 'react-router-dom';
function ResetPassword() {
    const [error,setEror]=useState(true);
    const [passwordGen,setPasswordGen]=useState(false);
    const [errerInverify,setErrorInvafy]=useState(false)
    const [newPassword,setNewPassword]=useState(false);
    const newEnterPass=useRef();
    const inputOTP=useRef();
    const email=useRef();
     const OTPGEN=sessionStorage.getItem("otp") || "";
    //  console.log("OTPGEN is ",OTPGEN);
     const navigate=useNavigate();
   async function varify()
    {
             if(inputOTP.current.value==OTPGEN)
             {
                //    console.log("Password is correct")
                 setNewPassword(true);
                 setPasswordGen(false)
                  
             }
             else
             {
                setErrorInvafy("Invalid OTP");
                // console.log("Password Wrong",inputOTP.current.value)
                // console.log(" Gen password",OTPGEN)
             }
    }

    const updatePassword=async()=>{
          try {
            const data=await axios.put('http://localhost:8000/user',{email:sessionStorage.getItem("toSaveEmail"),password:newEnterPass.current.value});
                navigate('/login')
            // console.log("Updated data is ",data.data)
          } catch (error) {
             console.log("Error in saving password");
          }
              
        // console.log(sessionStorage.getItem("toSaveEmail"),newEnterPass.current.value)
    }

    const sendEmail =async (e) => {
        e.preventDefault();
         
        const OTP=Math.floor(Math.random()*(100000-999999)+999999);
        sessionStorage.setItem("otp",OTP)
        sessionStorage.setItem("toSaveEmail",email.current.value);
        
        // console.log("Otp is ",OTP)
        setPasswordGen(true);
        
        const data ={user_email:email.current.value,otp:OTP}
        
         try {
            
            await emailjs.send('service_n5j0czb','template_9jimlor',data,'z8jzVnjki55AD-aTh')
                setPasswordGen(true);
             console.log("Successfully send message");
         } catch (error) {
             console.log("Error in sending message",error);
         }
      };
  return (
    <div className='loginMainDiv'>
              {!passwordGen && !newPassword&& <form className='bg-red-400 p-4 rounded-lg'  onSubmit={sendEmail}>
                 
                 <div className='border-2 p-1 rounded-lg'>
                        <label><strong>Email</strong></label>
                        <input ref={email} type="email" className='bg p-2 m-2' />
                 </div>
      
                  <input type="submit" value="Send" className='p-2 bg m-3' />
    </form>}
   {passwordGen && <div className="">
          <div>
             <p>Password generated successfully. Check your email.</p>
              <input ref={inputOTP} type="text" placeholder='Enter OTP' />
              {errerInverify && <p>Invalid OTP. Try again</p>}
          </div>

          <button onClick={varify} className='p-2 bg m-3'>Varify</button>
    </div>}

     {newPassword && <div>
           <input type="text" ref={newEnterPass} placeholder='Enter new password'/>
           <button onClick={updatePassword}>Update</button>
     </div>}
    </div>
  )
}

export default ResetPassword