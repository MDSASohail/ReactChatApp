import { useEffect, useRef, useState } from "react"
import Navbar from "./Navbar";

function Message()
{  
      const scrollView=useRef();
      const onlinFriends=["Sohail","Iklakh","Imamuddin","Danish","Farhan","Faisal","Sohail","Iklakh","Imamuddin","Danish","Farhan","Faisal"]
      const msg=[{text:"This is Sohail",isOwner:true},{text:"Hello Sohail",isOwner:false},{text:"Hello",isOwner:true},{text:"Where r u?",isOwner:true},{text:"Siwan",isOwner:false},{text:"And You",isOwner:false},{text:"This is Sohail",isOwner:true},{text:"Hello Sohail",isOwner:false},{text:"Hello",isOwner:true},{text:"Where r u?",isOwner:true},{text:"Siwan",isOwner:false},{text:"And You",isOwner:false},{text:"This is Sohail",isOwner:true},{text:"Hello Sohail",isOwner:false},{text:"Hello",isOwner:true},{text:"Where r u?",isOwner:true},{text:"Siwan",isOwner:false},{text:"And You",isOwner:false}]
      const currentMSG=useRef();
      const [currentText,setCurrentText]=useState("");
      const [notice,setNotice]=useState([{text:"Hello"}]);
      const [allMessages,setAllMSG]=useState(msg);
      useEffect(()=>{
        scrollView.current?.scrollIntoView({behavior:"smooth"});

      },[allMessages])

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
                
                {onlinFriends.map((item,index)=><p key={index} className="onlines">{item}</p>)}

             </div>
             <div className="border3 messageDiv">
                <div className="messageBox">
                      <div className="innerMessageDiv" >
                      {allMessages.map((item,index)=><div key={index} ref={scrollView}><EachMessage  item={item}/></div>)}
                      </div>
                </div>
                <div  className="textDiv">
                      <textarea ref={currentMSG} value={currentText} onChange={(e)=>{setCurrentText(e.target.value)}} className="textInput"></textarea>
                      <button className="btn" onClick={(e)=>{handleSubmit(e)}}>Send</button>
                </div>
             </div>
             <div>
                {/* {notice.map((item,index)=><div><EachMessage key={index} item={item}/></div>)} */}
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