import "./share.css";
import {PermMedia, Label,Room, EmojiEmotions} from "@material-ui/icons"
import{useEffect,useState, useContext} from 'react'
import {Authcontext} from '../../context/authcontext'
import axios from 'axios'
export default function Share({post}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  // const[user,setuser]= useState({})
  const {user}=useContext(Authcontext)
  useEffect ( ()=>{
  //   const fetchuser = async () =>{
  //  const res=  await axios.get(`http://localhost:8000/api/users?userId=${post.userId}`)
  //  setuser(res.data)
  //  console.log(res.data)
  //   }
  //   fetchuser()
  },[post.userId])

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img className="shareProfileImg" src={user.profilepic ? PF+user.profilepic : PF+'/person/noavatar.png'} alt="" />
          <input
            placeholder={`What's in your mind ${user.username}`}
            className="shareInput"
          />
        </div>
        <hr className="shareHr"/>
        <div className="shareBottom">
            <div className="shareOptions">
                <div className="shareOption">
                    <PermMedia htmlColor="tomato" className="shareIcon"/>
                    <span className="shareOptionText">Photo or Video</span>
                </div>
                <div className="shareOption">
                    <Label htmlColor="blue" className="shareIcon"/>
                    <span className="shareOptionText">Tag</span>
                </div>
                <div className="shareOption">
                    <Room htmlColor="green" className="shareIcon"/>
                    <span className="shareOptionText">Location</span>
                </div>
                <div className="shareOption">
                    <EmojiEmotions htmlColor="goldenrod" className="shareIcon"/>
                    <span className="shareOptionText">Feelings</span>
                </div>
            </div>
            <button className="shareButton">Share</button>
        </div>
      </div>
    </div>
  );
}
