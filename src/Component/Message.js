import { useEffect, useRef, useState } from "react"
import Navbar from "./Navbar";
import { io } from 'socket.io-client'
import axios from 'axios'
function Message()
{  
      const scrollView=useRef();
      const onlinFriends=["Sohail","Iklakh","Imamuddin","Danish","Farhan","Faisal","Sohail","Iklakh","Imamuddin","Danish","Farhan","Faisal"]
      const msg=[{text:"This is Sohail",isOwner:true},{text:"Hello Sohail",isOwner:false},{text:"Hello",isOwner:true},{text:"Where r u?",isOwner:true},{text:"Siwan",isOwner:false},{text:"And You",isOwner:false},{text:"This is Sohail",isOwner:true},{text:"Hello Sohail",isOwner:false},{text:"Hello",isOwner:true},{text:"Where r u?",isOwner:true},{text:"Siwan",isOwner:false},{text:"And You",isOwner:false},{text:"This is Sohail",isOwner:true},{text:"Hello Sohail",isOwner:false},{text:"Hello",isOwner:true},{text:"Where r u?",isOwner:true},{text:"Siwan",isOwner:false},{text:"And You",isOwner:false}]
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


      //It will run only one time
      //It will make connection with socket
      //It will fetch all the register users
      //If user, it will raise an event to add the user and receive the getUsers event
      useEffect(()=>{
           socket.current=io("ws://localhost:8001")
        //    console.log("Socket is ",socket.current)
            const getAllregis=async()=>{
                const allRegister=await axios.get('http://localhost:8000/user/');
                // console.log("Register users are ",allRegister.data)
                setAlRegisterUsers(allRegister.data)
            }

            getAllregis();


            if (user) {
                socket.current.emit("addUser", user._id,user.fullName);
                console.log("In mess user is ", user);
                socket.current.on("getUsers", (users) => {
                    console.log("All users are ", users);
                    
                    setAllLoginUsers(users);
                });
   
                
               
   
               fetchallConversationId();
            }

           return () => {
            console.log("Cleaning up socket connection...");
            socket.current.disconnect();
            socket.current.off("getUsers");
        };
           
      },[])

//It is a function which will fetch all the conversation of a particular user
      const fetchallConversationId=async()=>{
        try{
                    const me=await axios.get(`http://localhost:8000/con/${user._id}`)
                    // console.log("Conversation ids is ",me.data);
                    setAllconversationId(me.data)
        }catch(error)
        {
            console.log("Error in fetching message ",error.message)
        }

    }
    //   useEffect(() => {
    //      console.log("User change")
    //      if (user) {
    //          socket.current.emit("addUser", user._id,user.fullName);
    //          console.log("In mess user is ", user);
    //          socket.current.on("getUsers", (users) => {
    //              console.log("All users are ", users);
                 
    //              setAllLoginUsers(users);
    //          });

             
            

    //         fetchallConversationId();
    //      }
     
    //      return () => {
    //          // Clean up event listener when the component unmounts
    //          socket.current.off("getUsers");
    //      };
    //  }, []);


    //It will scroll to the view area
      useEffect(()=>{
        scrollView.current?.scrollIntoView({behavior:"smooth"});

      },[allMessages])

      useEffect(()=>{
                    //  console.log("All conversation id is ",allConversationId);
                    //  allConversationId.map((item)=>{console.log(item.members[0])})
                    //  console.log("In useEffect currentChat user is ",currentChatUser)
                 if(allConversationId.some((item)=>item.members[0]===currentChatUser._id || item.members[1]===currentChatUser._id || currentChatUser.userId===item.members[0] || currentChatUser.userId===item.members[1]))
                 {
                      console.log("Ype already conversation")
                      const conId=allConversationId.find((item)=>item.members[0]!==user._id || item.members[1]!==user._id)
                      try {
                                 const fetmessages=async()=>{
                                         const d=await axios.get(`http://localhost:8000/message/${conId._id}`)
                                         setAllMSG(d.data)
                                         console.log("All msg of a particura ",d.data)
                                 }

                                 fetmessages();
                      } catch(error) {

                           console.log("Error in fetching all messages ",error.message)

                    }
                        
                    //    console.log("Conversation id iss ",conId._id)
                    //    console.log("All conversation id is ",allConversationId)
                }else
                 {
                      console.log("Making new conversation")
                      try{
                             const make=async()=>{

                                
                                 const m= await axios.post('http://localhost:8000/con/',{member1:user._id,member2:currentChatUser._id})
                                 console.log("Conversation succes ",m.data)
                                 fetchallConversationId();

                             }
                           currentChatUser &&  make();
                      }catch(error)
                      {
                          console.log("Error in making conversation ",error.message)
                      }

                 }
      },[currentChatUser])

      const handleSubmit=(e)=>{
        e.preventDefault();
        setAllMSG((pre)=>[...pre,{text:currentMSG.current.value,isOwner:false}])
        console.log("Vlaue is ",currentMSG.current.value)
        setCurrentText("");
        
      }
      const [show,setShow]=useState(false)
      return(
        <>
        <Navbar/>
          <div className="border outerBox">
          {!show&&<div className="showHide" onClick={()=>{setShow(!show)}}>Show</div>}
             <div onClick={()=>{setShow(!show)}}  className={show?"border2 online onlineShow":"border2 online onlineHide"}>
                
                {allRegisterUsers.map((item,index)=><p onClick={()=>{setCurrentChatUser(item); console.log("Current Chat user is ",currentChatUser)}} key={index} className="onlines">{item.fullName}</p>)}

             </div>
             <div className="border3 messageDiv">
                {allMessages?<div className="wrapping"><div className="messageBox">
                      <div className="innerMessageDiv" >
                      {allMessages.map((item,index)=><div key={index} ref={scrollView}><EachMessage  item={item}/></div>)}
                      </div>
                </div>
                <div  className="textDiv">
                      <textarea ref={currentMSG} value={currentText} onChange={(e)=>{setCurrentText(e.target.value)}} className="textInput"></textarea>
                      <button className="btn" onClick={(e)=>{handleSubmit(e)}}>Send</button>
                </div></div>:<p className="StartConver">Select a conversation</p>}
             </div>
             <div className="onlineDIV">
                {/* {notice.map((item,index)=><div><EachMessage key={index} item={item}/></div>)} */}
                <div className="onlineLogo">Online Members</div>
                {allLoginUsers.map((user,index)=><p onClick={()=>{setCurrentChatUser(user);console.log("Current chat user is ",currentChatUser)}} className="eachOnlineMember" key={index}>{user.fullName}</p>)}
             </div>
          </div>
        </>
    )
}


function EachMessage({item})
{
    return(
        <>
           <div className={item.isOwner?"owner":"notowner"}>
           <p className={item.isOwner?"innerTextMessage bg":"innerTextMessage bg2"} >{item.text}</p>
           </div>
        </>
    )
}


export default Message;