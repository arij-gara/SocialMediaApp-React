import'./messanger.css'
import Topbar from '../../components/topbar/Topbar'
import Conversation from '../../components/conversation/conversation'
import Message from '../../components/message/message'
import Chatonline from '../../components/chatonline/chatonline'
import { useContext ,useState,useEffect,useRef} from 'react'
import axios from 'axios'
import io from "socket.io-client"
import {Authcontext} from '../../context/authcontext'

export default function Messanger() {
    

    const [conversations,setconversations]=useState([])
    const [currentchat,setcurrentchat]=useState(null)
    const [messages,setmessages]=useState([])
    const [arrivalmessage,setarrivalmessage]=useState(null)
    const [newmessage,setnewmessage]=useState('') 
    const [onlineusers,setonlineusers]=useState([])
     const  socket = useRef()
   

    const {user}=useContext(Authcontext)
    const scrollref=useRef()
    useEffect ( ()=>{
        socket.current= io("ws://localhost:8900")
        socket.current.on("getMessage",(data) =>{
         setarrivalmessage({
            sender:data.userId,
            text:data.text,
            createdAt: Date.now()
         })
        })
    },[])
    useEffect ( ()=>{
        arrivalmessage && 
        currentchat?.members.includes(arrivalmessage.sender) &&
        setmessages((prev) => [...prev,arrivalmessage])
    },[arrivalmessage,currentchat])
    useEffect ( ()=>{
        socket.current.emit("addUser", user._id)
        socket.current.on("getUsers", users =>{
           setonlineusers(
            user.following.filter( (f)=> users.some( (u) => u.userId === f))
           )
        })
        },[socket,user])
   
    // useEffect ( ()=>{
    //    socket.current.emit("addUser" )
    //    socket.current.on("getusers", users =>{
    //     console.log(users)
    //    })
    // },[user])
    useEffect ( ()=>{
        const getconversations = async () =>{
            try{    
                const res =  await axios.get('http://localhost:8000/api/conversations/'+user._id)
                setconversations(res.data)
            }catch(err){
                console.log(err)
            }
          
        
        }
        getconversations()
    },[user._id])
   
    useEffect ( () =>{
        const getmessages = async () =>{
            try{
                const res =  await axios.get('http://localhost:8000/api/messages/'+currentchat._id)
                setmessages(res.data)
            }catch(err){
                console.log(err)
            }
       
        }
        getmessages()
    },[currentchat])
    console.log(messages)
    useEffect ( ()=>{
        scrollref.current?.scrollIntoView({behavior :"smooth"})
    })
    const handelsubmit = async(e)=>{
    e.preventDefault()
    const message= {
        sender: user._id,
        text: newmessage,
        conversationId : currentchat._id
    }
    const recieverId =currentchat.members.find(member=> member !== user._id)
    socket.current.emit("sendMessage", {
        userId: user._id,
        recieverId,
        text:newmessage
    })
    try{
     const res = await axios.post('http://localhost:8000/api/messages',message)
     setmessages([...messages,res.data])
     setnewmessage('')
    }catch(err){
        console.log(err)
    }
    }
  return ( 
    <>
    <Topbar/>
    <div  className="messanger">
        <div className="chatMenu">
            <div className="chatmenuwrapper">
                <input placeholder="search for friends" className="chatmenuinput"/>
                
                {conversations.map( (conversation) =>(
                    <div onClick={ ()=> setcurrentchat(conversation)}>
                    <Conversation key={conversation._id} conversation={conversation} currentuser={user}/>
                    </div>
                ))}
                
            
               
                
            </div>
        </div>
        <div className="chatbox">
            <div className="chatboxwrapper">
                {
                  currentchat ?  
                <>
                <div className="chatboxtop">
                    { messages.map( (message)=>(
                        <div ref={scrollref}>
                    <Message message={message} own={message.sender == user._id}/>
                    </div>
                ))}
                </div>

                <div className="chatboxbottom">
                    <textarea className='chatmessage' placeholder='write something ..' onChange={ (e)=> setnewmessage(e.target.value)} value={newmessage}></textarea>
                    <button className='chatsubmitbutton' onClick={handelsubmit}>Send</button>
                </div>  </>: <span className='noconversationtext'>Open a conversation to start a chat .</span>}
            </div>
        </div>
        <div className="chatOnline">
            <div className="chatonlinewrapper">
                <Chatonline 
                onlineusers={onlineusers}
                currentId={user._id}
                setcurrentchat={setcurrentchat}
                
                />
                
            </div>
        </div>
      
    </div>

  </>
  )
}
