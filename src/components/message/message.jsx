
import'./message.css'
import {format} from 'timeago.js'
import { useEffect,useState } from 'react'
import axios from 'axios'
const PF = process.env.REACT_APP_PUBLIC_FOLDER
export default function Message({message,own}) {
   const [user,setuser]=useState({})
  useEffect( ()=>{
    const fetchuser = async ()=>{
      try{
        const res = await axios.get('http://localhost:8000/api/users?userId='+message.sender)
        setuser(res.data)
        console.log(res.data)
      }catch(err){
        console.log(err)
      }
    
    }
    fetchuser()
  },[message])
  return (
    <div  className={own ? "message own" : "message"}>
        <div className="messagetop">
            <img className="messageimg"
            src={user.profilepic ? PF+user.profilepic : PF+'person/noavatar.png'}/>
            <p className="messagetext">{message.text}</p>
        </div>
        <div className="messagebottom"> {format(message.createdAt)}</div>
      
    </div>
  )
}
