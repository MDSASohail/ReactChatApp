import logo from './logo.svg';
import './App.css';
import Ref from './Component/UseRef'
import Message from './Component/Message';
import Navbar from './Component/Navbar';
import LoginPage from './Component/LoginPage';
import Register from './Component/Register'
import { Routes,Route, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
function App() {
  const navigate=useNavigate();
  const user=JSON.parse(localStorage.getItem("user"))||null;
  console.log("User is ",user)
 useEffect(()=>{
                if(user==null)
                navigate('/login')
                
 },[user])
  return (
    <div >
      <Routes>
        <Route exact path='/' element={<Message/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>
    </div>
  );
}

export default App;
