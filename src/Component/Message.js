import { useEffect, useRef, useState } from "react"
import Navbar from "./Navbar";
import { io } from 'socket.io-client'
import axios from 'axios'
import {format} from 'timeago.js'
function Message()
{  
      const scrollView=useRef();
      
      const currentMSG=useRef();
      const [currentText,setCurrentText]=useState("");
      const [notice,setNotice]=useState([{text:"Hello"}]);
      const [allMessages,setAllMSG]=useState(null);
      const [currentChatUser,setCurrentChatUser]=useState(null);
      const socket=useRef();
      const user=JSON.parse(localStorage.getItem("user"));
      const [allConversationId,setAllconversationId]=useState([]);
      // const user=[{_id:20}]
       const [allRegisterUsers,setAlRegisterUsers]=useState([])
      const [allLoginUsers,setAllLoginUsers]=useState([]);
      let currentCONID=useRef();
      const [arrivedMsg,setArrivedMsg]=useState(null);

      useEffect(()=>{
        
                arrivedMsg&&currentChatUser._id==arrivedMsg.senderId && setAllMSG((pre)=>[...pre,arrivedMsg]);
      },[arrivedMsg])
      //It will run only one time
      //It will make connection with socket
      //It will fetch all the register users
      //If user, it will raise an event to add the user and receive the getUsers event
      useEffect(()=>{

        //Connect with local host
           socket.current=io("ws://localhost:8000", {
            credentials: true,
            allowedHeaders: ["Content-Type", "Authorization"]
          })

          //Connect with deployed Node
          // socket.current = io("https://chat-app-node-gamma.vercel.app/", {
          //   withCredentials: true,
          //   allowedHeaders: ["Content-Type", "Authorization"]
          // });
           
            const getAllregis=async()=>{
               try {
                //Deployed link
                // const allRegister=await axios.get('https://chat-app-node-gamma.vercel.app/user/');

                //Local
                const allRegister=await axios.get('http://localhost:8000/user/');
                setAlRegisterUsers(allRegister.data)
               } catch (error) {
                console.log("Error in fetching all registerd users")
               }
            }

            getAllregis();

            
        socket.current.on("receiveMSG",(data)=>{
            
            console.log("Messagearrived ",data)
            setArrivedMsg(data);
        })

          
            if (user) {
              
                socket.current.emit("addUser", user._id,user.fullName);
                
                socket.current.on("getUsers", (users) => {
                    
                    setAllLoginUsers(users);
                });
   
                
               
   
               fetchallConversationId();
            }

           return () => {
            
            socket.current.disconnect();
            socket.current.off("getUsers");
            
        };
           
      },[])


      const fetchallConversationId=async()=>{
        try{
                    //Deployed
                    // const me=await axios.get(`https://chat-app-node-gamma.vercel.app/con/${user._id}`)
                    
                    //Local
                    const me=await axios.get(`http://localhost:8000/con/${user._id}`)
                    setAllconversationId(me.data)
                    
        }catch(error)
        {
            console.log("Error in fetching message ",error.message)
        }

    }
    


    //It will scroll to the view area
      useEffect(()=>{
        scrollView.current?.scrollIntoView({behavior:"smooth"});

      },[allMessages])

      useEffect(()=>{
                                                
                 if(allConversationId.some((item)=>item.members[0]===currentChatUser._id || item.members[1]===currentChatUser._id ))
                 {
                      
                      const conId=allConversationId.find((item)=>(item.members[0]===user._id && item.members[1]===currentChatUser._id)||(item.members[1]===user._id && item.members[0]===currentChatUser._id))
                      
                      try {
                                 const fetmessages=async()=>{
                                        //Deployed
                                        //  const d=await axios.get(`https://chat-app-node-gamma.vercel.app/message/${conId._id}`);

                                         //Local
                                         const d=await axios.get(`http://localhost:8000/message/${conId._id}`);
                                         setAllMSG(d.data)
                                        
                                         currentCONID.current=conId._id;
                                        
                                 }

                                 fetmessages();
                      } catch(error) {

                           console.log("Error in fetching all messages ",error.message)

                    }
                        
                    
                }else
                 {
                      
                      try{
                             const make=async()=>{

                                //Deployed
                                //  const m= await axios.post('https://chat-app-node-gamma.vercel.app/con/',{member1:user._id,member2:currentChatUser._id});

                                 //Local
                                 const m= await axios.post('http://localhost:8000/con/',{member1:user._id,member2:currentChatUser._id})
                                
                                 fetchallConversationId();

                             }
                           currentChatUser &&  make();
                      }catch(error)
                      {
                          console.log("Error in making conversation ",error.message)
                      }

                 }
      },[currentChatUser])

      const handleSubmit=async(e)=>{
        e.preventDefault();
        const data={conversationId:currentCONID.current,receiverId:currentChatUser._id,senderId:user._id,text:currentText};
        socket.current.emit("saveMSG",data);

        try {
            
          //Deployed
            // const d=await axios.post('https://chat-app-node-gamma.vercel.app/message/post',data);

            //Local
            const d=await axios.post('http://localhost:8000/message/post',data);
            
        } catch (error) {
          console.log("Error in saving message ",error.response.data.result)
        }
        setAllMSG((pre)=>[...pre,{text:currentMSG.current.value,senderId:user._id}])
       
        
        setCurrentText("");
      }
      const [show,setShow]=useState(false);


     async function deleteChats()
      {
              //  console.log(" To delete Chats ",currentCONID.current)
              //  console.log("Deletted conversations ",allMessages);

          try {
            // console.log("In try")
            const deleteData = await axios.post('http://localhost:8000/message/delete',{
               data:{conversationId:currentCONID.current}
            });
            // const d=await axios.post('http://localhost:8000/message/post',{helo:"Sohail"});
            setAllMSG(null);
                // console.log("Deletted conversations ",allMessages);
          } catch (error) {
            console.log("Error in deleting conversation",error)
          }
          //  console.log("Current chat data is ",currentChatUser._id,user._id,currentCONID)
      }
      return(
        <>
        <Navbar/>
          <div className="border outerBox">
          {!show&&<div className="showHide" onClick={()=>{setShow(!show)}}>Show</div>}
              
             <div  className={show?"border2 online textStyle onlineShow":"border2 textStyle online onlineHide"}>
              <div className="textStyle mm">All Register Users</div>
                <div className="onlineeee">
                {allRegisterUsers.map((item,index)=><p onClick={()=>{setCurrentChatUser(item);setShow(!show); }} key={index} className={currentChatUser?._id===item._id?"onlines current":"onlines"}>{item.fullName}</p>)}
                </div>

             </div>
             <div className="border3 messageDiv">
                {allMessages?<div className="wrapping"><div className="messageBox">
                      <div className="innerMessageDiv" >
                      {allMessages.map((item,index)=><div key={index} ref={scrollView}><EachMessage  item={item} user={user._id}/></div>)}
                      </div>
                </div>
                <div  className="textDiv">
                      <textarea ref={currentMSG} value={currentText} onChange={(e)=>{setCurrentText(e.target.value)}} className="textInput transparentt"></textarea>
                      <button className="btn  transparentt" onClick={(e)=>{handleSubmit(e)}}>Send</button>
                </div></div>:<p className="StartConver">Select a conversation</p>}
             </div>
             <div className="onlineDIV">
                {/* {notice.map((item,index)=><div><EachMessage key={index} item={item}/></div>)} */}
                {allMessages && <div>
                      <button onClick={deleteChats} className="p-2 m-2 border-2">Delete Chats</button >
                  </div>}
                <div className="onlineLogo">Online Members</div>
                <div className="onlineeee">
                  
                {allLoginUsers.map((user,index)=><p onClick={()=>{setCurrentChatUser(user);console.log("Current chat user is ",currentChatUser)}} className={currentChatUser?._id===user._id?"onlines current":"onlines"} key={index}>{user.fullName}</p>)}
                </div>
                
             </div>

             
          </div>
        </>
    )
}


function EachMessage({item,user})
{

  // console.log("Each message is ",user)
    return(
        <>
           <div className={item.senderId==user?"owner m-2":"notowner m-2"}>
           <p className={item.senderId==user?"innerTextMessage bg":"innerTextMessage bg2"} >{item.text}</p>
           <p className={item.senderId==user?" absolutee bg":"absolutee bg2"} >{format(item.createdAt)}</p>
           </div>
        </>
    )
}


export default Message;