import React from 'react'
import'./conversation.css'
import{useState,useEffect}from 'react'
import axios from 'axios'
const PF = process.env.REACT_APP_PUBLIC_FOLDER
export default function Conversation({conversation, currentuser}) {
  const [user,setuser]=useState({})

  useEffect(() =>{
   const friendId= conversation.members.find((m)=> m!== currentuser._id)
   console.log(friendId)

   const getuser = async () =>{
    try{
      const res = await axios.get('http://localhost:8000/api/users?userId='+ friendId)
    setuser(res.data)
    console.log(user)
 
    }catch(err){
    console.log(err)}
   }
   getuser()
  },[currentuser,conversation])
  return (
    <div className="conversation">
      <img className="conversationimg"
      src={user.profilepic ?PF+user.profilepic : PF+"person/noavatar.png"}
      />
      <span className='conversationname'>{user.username}</span>
    </div>
  )
}
