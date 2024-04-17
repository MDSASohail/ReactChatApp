import {GoogleLogin} from '@react-oauth/google'
import axios from 'axios'
import {jwtDecode} from 'jwt-decode'
import { useNavigate } from 'react-router-dom'

function GoogleLoginPage() {
              const  navigate=useNavigate();
 async function saveData(data)
  {
      const user={fullName:data.given_name,email:data.email}
      console.log("In savvaData",user)

      try {
            const saved=await axios.post('http://localhost:8000/user/withG',user);
            localStorage.setItem("user",JSON.stringify(saved.data))
            navigate('/')
            console.log("Data saved successfully ",saved.data)
      } catch (error) {
          console.log("Error in saving data ",error.message)
      }
  }
  return (
    <div><GoogleLogin onSuccess={(data)=>{
        let d=jwtDecode(data.credential)
         saveData(d);
      }} onError={(er)=>{
         console.log(er)
      }}/></div>
  )
}

export default GoogleLoginPage