
import './App.css';

import Message from './Component/Message';
import {GoogleOAuthProvider} from '@react-oauth/google'
import LoginPage from './Component/LoginPage';
import Register from './Component/Register'
import ResetPassword from './Component/ResetPassword';
import { Routes,Route, useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
function App() {
  const navigate=useNavigate();
  const user=JSON.parse(localStorage.getItem("user"))||null;
  const path=useLocation();
  console.log(path.pathname.split('/')[1])
  const r=path.pathname.split('/')[1]
  console.log("User is ",user)
 useEffect(()=>{

                if(r=='reset')
                  navigate('/reset')
               else if(user==null)
                navigate('/login')
                else
                navigate('/')


                
                
 },[])
  return (
    <GoogleOAuthProvider clientId='44958785032-ad6vustje6mecuq7ra2i0p8009jgfn9v.apps.googleusercontent.com'>
    <div >
      <Routes>
        <Route exact path='/' element={<Message/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/reset' element={<ResetPassword/>}/>
      </Routes>
    </div>
    </GoogleOAuthProvider>
  );
}

export default App;
