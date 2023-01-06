import './chatonline.css'
import {useState, useEffect} from 'react'
import axios from 'axios';
const PF = process.env.REACT_APP_PUBLIC_FOLDER
export default function Chatonline({ onlineusers,currentId,setcurrentchat}) {
  const [friends,setfriends]=useState([]);
  const[onlinefriends,setonlinefriends]=useState([]);

  useEffect ( () =>{
     const getfriends= async ()=>{
      const res = await axios.get('http://localhost:8000/api/users/friends/'+currentId)
      setfriends(res.data)
     }
     getfriends();
  },[currentId])
  console.log(friends)
  useEffect ( () =>{
    setonlinefriends (friends.filter( f=>onlineusers.includes(f._id)))
  },[friends,onlineusers])
  console.log(onlinefriends)

 const handelclick = async (user) =>{
  try{
    const res= await axios.get(`http://localhost:8000/api/conversations/find/${currentId}/${user._id}`)
    setcurrentchat(res.data)
  } catch(err) {
    console.log(err)
  }
 }
  
  return (
    <div className='chatonline'>
      {onlinefriends.map ((o)=> (

   
      <div className='chatonlinefriend' onClick={()=> handelclick(o)}>
        <div className='chatonlineimgcontainer'>
            <img  className='chatonlineimg'src= {o?.profilepic ? PF+o.profilepic : PF+"person/noavatar.png"}></img>
            <div className='chatonlinebadge'></div>
        </div>
        <span className='chatonlinename'> {o.username}</span>
      </div>
         ))}
    </div>
  )
}
