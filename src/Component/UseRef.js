import  {useRef, useState} from 'react'
function Ref()
{

    const data=useRef();
    console.log("Render");
    
    const d=[{item:1,name:"Sohail"},{item:5,name:"Eklakh"},{item:3,name:"Imamuddin"},{item:2,name:"Danish"},{item:4,name:"Farhan"}]
    const [students,setStudents]=useState([]);
    
    function handle()
    {
        console.log(data.current)
        data.current.focus();
        setStudents(d.sort((a,b)=>{
            
            return a.item-b.item;
        }))
        console.log(students)
        // navigate('/sohail/ansari')
        
    }
    return(
        <>
          <h1 onClick={()=>handle()}>This is Useref</h1>
          <input ref={data} type='text'/>
          {students.map((item)=><p key={item.roll}>{`Heloo ${item.name}`}</p>)}
        </>
    )
}


export default Ref;